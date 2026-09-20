import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import sharp from "sharp";
import { getAdminSession } from "@/lib/auth";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(request) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: Admin session required" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const customName = formData.get("customName");
    const suffix = formData.get("suffix") || "";

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "No valid file uploaded" },
        { status: 400 }
      );
    }

    if (!fsSync.existsSync(UPLOAD_DIR)) {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate sanitized base filename
    let baseName = "image";
    if (customName && typeof customName === "string") {
      baseName = customName;
    } else if (file.name) {
      const parsed = path.parse(file.name);
      baseName = parsed.name;
    }

    const sanitizedBase = baseName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const fileSuffix = suffix
      ? `-${suffix
          .toString()
          .toLowerCase()
          .replace(/[^\w-]/g, "")}`
      : "";

    let finalFilename = `${sanitizedBase}${fileSuffix}.webp`;
    let counter = 1;

    // Deduplicate file collisions
    while (fsSync.existsSync(path.join(UPLOAD_DIR, finalFilename))) {
      finalFilename = `${sanitizedBase}${fileSuffix}-${counter++}.webp`;
    }

    const outputPath = path.join(UPLOAD_DIR, finalFilename);

    // Convert to lossless/high-quality WebP using Sharp
    const processedBuffer = await sharp(buffer)
      .webp({ quality: 90, effort: 4 })
      .toBuffer();

    await fs.writeFile(outputPath, processedBuffer);

    const publicUrl = `/uploads/${finalFilename}`;

    return NextResponse.json(
      {
        success: true,
        url: publicUrl,
        filename: finalFilename,
        size: processedBuffer.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process and upload image" },
      { status: 500 }
    );
  }
}

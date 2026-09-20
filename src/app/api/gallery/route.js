import { NextResponse } from "next/server";
import { getGalleryImages, createGalleryImage } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const images = getGalleryImages(category);

    return NextResponse.json({
      success: true,
      count: images.length,
      data: images,
    });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin session required" },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body.image || typeof body.image !== "string") {
      return NextResponse.json(
        { success: false, error: "Image URL or path is required" },
        { status: 400 }
      );
    }

    if (!body.category || typeof body.category !== "string") {
      return NextResponse.json(
        { success: false, error: "Category is required" },
        { status: 400 }
      );
    }

    const newImage = createGalleryImage({
      id: body.id,
      title: body.title || "",
      alt: body.alt || body.title || "",
      category: body.category,
      image: body.image,
      orderIndex: body.orderIndex || 0,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Gallery image added successfully",
        data: newImage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding gallery image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add gallery image" },
      { status: 500 }
    );
  }
}

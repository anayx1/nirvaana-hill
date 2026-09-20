import { NextResponse } from "next/server";
import {
  getGalleryImageById,
  updateGalleryImage,
  deleteGalleryImage,
} from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const image = getGalleryImageById(id);

    if (!image) {
      return NextResponse.json(
        { success: false, error: "Gallery image not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: image,
    });
  } catch (error) {
    console.error("Error fetching gallery image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery image" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin session required" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const existing = getGalleryImageById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Gallery image not found" },
        { status: 404 }
      );
    }

    const updatedImage = updateGalleryImage(id, body);

    return NextResponse.json({
      success: true,
      message: "Gallery image updated successfully",
      data: updatedImage,
    });
  } catch (error) {
    console.error("Error updating gallery image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update gallery image" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin session required" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const existing = getGalleryImageById(id);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Gallery image not found" },
        { status: 404 }
      );
    }

    const deleted = deleteGalleryImage(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Could not delete gallery image" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete gallery image" },
      { status: 500 }
    );
  }
}

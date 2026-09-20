import { NextResponse } from "next/server";
import {
  getBlogByIdOrSlug,
  getAdjacentBlogs,
  updateBlog,
  deleteBlog,
} from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const blog = getBlogByIdOrSlug(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    // Fetch adjacent blogs for navigation if published
    let adjacent = { prev: null, next: null };
    if (blog.status === "PUBLISHED" && blog.publishedAt) {
      adjacent = getAdjacentBlogs(blog.publishedAt, blog.id);
    }

    return NextResponse.json({
      success: true,
      data: blog,
      navigation: adjacent,
    });
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog details" },
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

    const existing = getBlogByIdOrSlug(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    const updatedBlog = updateBlog(id, body);

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update blog post" },
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
    const existing = getBlogByIdOrSlug(id);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    const deleted = deleteBlog(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Could not delete blog post" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}

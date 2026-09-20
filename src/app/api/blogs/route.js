import { NextResponse } from "next/server";
import { getAllBlogs, createBlog } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status") || "PUBLISHED";
    const search = searchParams.get("search");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset") || 0;
    const orderBy = searchParams.get("orderBy");

    const blogs = getAllBlogs({
      category,
      status,
      search,
      limit,
      offset,
      orderBy,
    });

    return NextResponse.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
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

    if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
      return NextResponse.json(
        { success: false, error: "Blog title is required" },
        { status: 400 }
      );
    }

    if (!body.category || typeof body.category !== "string" || !body.category.trim()) {
      return NextResponse.json(
        { success: false, error: "Blog category is required" },
        { status: 400 }
      );
    }

    if (!body.content || typeof body.content !== "string") {
      return NextResponse.json(
        { success: false, error: "Blog content is required" },
        { status: 400 }
      );
    }

    const newBlog = createBlog({
      title: body.title.trim(),
      slug: body.slug,
      category: body.category.trim(),
      content: body.content,
      excerpt: body.excerpt,
      featuredImage: body.featuredImage,
      readDuration: body.readDuration,
      author: body.author || "Nirvaana Hills Team",
      status: body.status || "PUBLISHED",
      publishedAt: body.publishedAt,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      metaKeywords: body.metaKeywords,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog post created successfully",
        data: newBlog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

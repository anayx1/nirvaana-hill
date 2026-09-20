import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getAllContacts } from "@/lib/db";

export async function GET(request) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset") || 0;

    const contacts = getAllContacts({
      status,
      search,
      limit,
      offset,
    });

    return NextResponse.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("Admin fetch contacts error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contact inquiries" },
      { status: 500 }
    );
  }
}

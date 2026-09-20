import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { updateContactStatus, deleteContact, getContactById } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const contact = getContactById(id);

    if (!contact) {
      return NextResponse.json(
        { success: false, error: "Contact inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Admin fetch single contact error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contact details" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const updated = updateContactStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Contact inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Lead status updated to ${status}`,
      data: updated,
    });
  } catch (error) {
    console.error("Admin update contact status error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update contact status" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const deleted = deleteContact(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Contact inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact inquiry deleted successfully",
    });
  } catch (error) {
    console.error("Admin delete contact error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete contact inquiry" },
      { status: 500 }
    );
  }
}

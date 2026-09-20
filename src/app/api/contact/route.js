import { NextResponse } from "next/server";
import { createContact } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`contact:${ip}`, 10, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many inquiries submitted. Please try again shortly.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, requirement, message, source } = body;

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    const lead = createContact({
      name: name?.trim() || "Website Visitor",
      email: email?.trim() || "",
      phone: phone.trim(),
      requirement: requirement || "Farmland Ownership Inquiry",
      message: message || "",
      source: source || "website",
      status: "NEW",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received. Our team will contact you shortly.",
        data: lead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact inquiry submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}

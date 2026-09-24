import { NextResponse } from "next/server";
import { createContact } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/security";
import { sendContactNotification } from "@/lib/email";
import { verifyRecaptcha } from "@/lib/recaptcha";

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`contact:${ip}`, 20, 60000);
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
    const {
      name,
      email,
      phone,
      requirement,
      message,
      source,
      city,
      budget,
      purpose,
      companyName,
      recaptchaToken,
    } = body;

    // Verify Google reCAPTCHA v3 token if configured
    if (recaptchaToken) {
      const captchaResult = await verifyRecaptcha(recaptchaToken);
      if (!captchaResult.valid) {
        return NextResponse.json(
          {
            success: false,
            error: "Security verification failed. Please refresh and try again.",
          },
          { status: 400 }
        );
      }
    }

    const trimmedPhone = phone ? String(phone).trim() : "";
    const trimmedEmail = email ? String(email).trim() : "";

    // Require at least phone or email
    if (!trimmedPhone && !trimmedEmail) {
      return NextResponse.json(
        { success: false, error: "Please provide your phone number or email address." },
        { status: 400 }
      );
    }

    // Build structured message if extra metadata was passed
    const messageParts = [];
    if (city) messageParts.push(`City: ${city}`);
    if (budget && budget !== "Select budget range") messageParts.push(`Budget: ${budget}`);
    if (purpose && purpose !== "Select purpose") messageParts.push(`Purpose: ${purpose}`);
    if (companyName) messageParts.push(`Company: ${companyName}`);
    if (message) messageParts.push(`Message: ${message}`);

    const combinedMessage = messageParts.length > 0 ? messageParts.join(" | ") : (message || "");

    // Save lead to local SQLite Database
    const lead = createContact({
      name: name?.trim() || (trimmedEmail ? trimmedEmail.split("@")[0] : "Website Visitor"),
      email: trimmedEmail,
      phone: trimmedPhone || "N/A",
      requirement: requirement || "Farmland Ownership Inquiry",
      message: combinedMessage,
      source: source || "website",
      status: "NEW",
    });

    // Trigger SMTP Email Notification asynchronously
    try {
      await sendContactNotification({
        name: name?.trim() || (trimmedEmail ? trimmedEmail.split("@")[0] : "Website Visitor"),
        email: trimmedEmail,
        phone: trimmedPhone,
        requirement: requirement || "Farmland Ownership Inquiry",
        message: message || combinedMessage,
        source: source || "website",
        city,
        budget,
        purpose,
        companyName,
      });
    } catch (emailErr) {
      console.error("Email notification dispatch error:", emailErr);
      // Lead is still saved in SQLite DB
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your submission has been received. Our team will contact you shortly.",
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

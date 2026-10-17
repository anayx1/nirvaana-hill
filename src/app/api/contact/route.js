import { NextResponse } from "next/server";
import { createContact } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/security";
import { sendContactNotification } from "@/lib/email";
import crypto from "node:crypto";
import { CONTACT_FIELDS, NEWSLETTER_SOURCES, isValidPhone, normalizePhone } from "@/lib/contact-fields";
import { buildCrmPayload } from "@/lib/crm";
import { deliverCrmContact } from "@/lib/crm-delivery";

export const runtime = "nodejs";

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

    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > 32 * 1024) {
      return NextResponse.json({ success: false, error: "Please shorten your submission." }, { status: 413 });
    }
    let input;
    try {
      input = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON submission." }, { status: 400 });
    }
    if (!input || typeof input !== "object" || Array.isArray(input)) {
      return NextResponse.json({ success: false, error: "Invalid submission." }, { status: 400 });
    }
    const body = {};
    for (const key of CONTACT_FIELDS) {
      if (input[key] != null && typeof input[key] !== "string") {
        return NextResponse.json({ success: false, error: `Invalid ${key}.` }, { status: 400 });
      }
      body[key] = (input[key] || "").trim();
    }
    if (body.website) {
      // Quietly discard bot submissions, including local saves and notifications.
      return NextResponse.json({ success: true, message: "Your submission has been received." }, { status: 201 });
    }
    const isNewsletter = NEWSLETTER_SOURCES.includes(body.source);
    if (!isNewsletter && (!body.name || !isValidPhone(body.phone))) {
      return NextResponse.json({ success: false, error: "Please enter your full name and a valid 10-digit mobile number (optionally with +91)." }, { status: 400 });
    }
    if ((isNewsletter || body.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
    }
    body.phone = normalizePhone(body.phone);
    for (const key of ["city", "budget", "purpose"]) {
      if (["Select your city", "Select budget range", "Select purpose"].includes(body[key])) body[key] = "";
    }
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
    } = body;

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
    const contactId = crypto.randomUUID();
    const crmPayload = isNewsletter ? null : buildCrmPayload(body, contactId);
    const lead = createContact({
      id: contactId,
      name: name?.trim() || (trimmedEmail ? trimmedEmail.split("@")[0] : "Website Visitor"),
      email: trimmedEmail,
      phone: trimmedPhone || "N/A",
      requirement: requirement || "Farmland Ownership Inquiry",
      message: combinedMessage,
      source: source || "website",
      status: "NEW",
    }, crmPayload);

    // Await delivery inside the request so serverless runtimes cannot terminate
    // an untracked background promise. Database saves remain independent of CRM.
    const crmTask = crmPayload ? deliverCrmContact(lead.id).catch(() => {
      console.error("CRM delivery tracking failed", { contactId: lead.id });
    }) : Promise.resolve();

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
    await crmTask;

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

import { NextResponse } from "next/server";
import {
  getAdminByEmail,
  createPasswordReset,
  verifyAndConsumePasswordReset,
  updateAdminPassword,
} from "@/lib/db";
import { sendPasswordResetOtpEmail } from "@/lib/email";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`forgot-password:${ip}`, 10, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many reset requests. Please try again in 1 minute.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { action, email, otp, newPassword } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // =========================================================================
    // ACTION 1: REQUEST OTP CODE
    // =========================================================================
    if (action === "request_otp") {
      const admin = getAdminByEmail(cleanEmail);
      if (!admin) {
        return NextResponse.json(
          {
            success: false,
            error: "No admin account found with this email address.",
          },
          { status: 404 }
        );
      }

      // Generate 6-digit numeric OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

      // Store in database with 15-minute expiry
      createPasswordReset(cleanEmail, generatedOtp, 15);

      // Send email via Nodemailer
      const emailResult = await sendPasswordResetOtpEmail({
        to: cleanEmail,
        otp: generatedOtp,
      });

      console.log(`[Admin Password Reset OTP] Generated for ${cleanEmail}: ${generatedOtp}`);

      return NextResponse.json({
        success: true,
        message: "A 6-digit verification code has been sent to your email.",
        emailSent: emailResult?.success ?? false,
      });
    }

    // =========================================================================
    // ACTION 2: VERIFY CODE & SET NEW PASSWORD
    // =========================================================================
    if (action === "verify_and_reset") {
      if (!otp || otp.trim().length !== 6) {
        return NextResponse.json(
          { success: false, error: "Please provide a valid 6-digit verification code." },
          { status: 400 }
        );
      }

      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json(
          { success: false, error: "Password must be at least 6 characters long." },
          { status: 400 }
        );
      }

      const isValidOtp = verifyAndConsumePasswordReset(cleanEmail, otp.trim());
      if (!isValidOtp) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid or expired verification code. Please request a new code.",
          },
          { status: 400 }
        );
      }

      // Update password in database
      const updated = updateAdminPassword(cleanEmail, newPassword);
      if (!updated) {
        return NextResponse.json(
          {
            success: false,
            error: "Failed to update password. Please try again.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Password updated successfully. You can now sign in.",
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action specified." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Forgot password route error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

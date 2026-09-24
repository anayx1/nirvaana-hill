import { NextResponse } from "next/server";
import { getAdminByEmailOrUsername } from "@/lib/db";
import {
  verifyPassword,
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`login:${ip}`, 10, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many login attempts. Please try again in 1 minute.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const identifier = body.email || body.username;
    const { password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: "Email/username and password are required" },
        { status: 400 }
      );
    }

    const admin = getAdminByEmailOrUsername(identifier.trim().toLowerCase());
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Invalid email/username or password" },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, admin.passwordHash, admin.salt);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const token = createSessionToken({
      id: admin.id,
      username: admin.username,
      email: admin.email,
    });

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });

    const isProd = process.env.NODE_ENV === "production";
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}

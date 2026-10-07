import { NextResponse } from "next/server";
import { syncInstagramPostsFromApify, getOrFetchInstagramPosts } from "@/lib/instagram";
import { getInstagramMeta, getStoredInstagramPosts } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const force = searchParams.get("force") === "true";

  try {
    if (force) {
      const syncResult = await syncInstagramPostsFromApify();
      return NextResponse.json({
        action: "force_sync",
        ...syncResult,
      });
    }

    const posts = await getOrFetchInstagramPosts();
    const lastSync = getInstagramMeta("last_sync");
    const storedCount = getStoredInstagramPosts().length;

    return NextResponse.json({
      success: true,
      totalStored: storedCount,
      lastSyncAt: lastSync?.value || null,
      posts,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const result = await syncInstagramPostsFromApify();
    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

import React from "react";
import { getAdminSession } from "@/lib/auth";
import { getDashboardStats } from "@/lib/db";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Dashboard | Nirvaana Hills",
  description: "Control panel for Nirvaana Hills farmland community",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }) {
  const session = await getAdminSession();
  let stats = { newLeads: 0 };

  if (session) {
    try {
      stats = getDashboardStats();
    } catch (e) {
      console.error("Error loading admin stats:", e);
    }
  }

  // If no session, render children directly (allows /admin/login to render cleanly)
  if (!session) {
    return <div className="min-h-screen bg-[#FAF9F5] text-[#1F2922]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1F2922] flex flex-col md:flex-row antialiased">
      <AdminSidebar user={session} newLeadsCount={stats?.newLeads || 0} />
      <main className="flex-1 min-w-0 min-h-screen bg-[#FAF9F5] overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

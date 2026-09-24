"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Image as ImageIcon,
  Tags,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

export const ADMIN_NAV_LINKS = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Leads & Inquiries",
    href: "/admin/contacts",
    icon: Users,
    badgeKey: "newLeads",
  },
  {
    label: "Blog Articles",
    href: "/admin/blogs",
    icon: FileText,
  },
  {
    label: "Gallery Visuals",
    href: "/admin/gallery",
    icon: ImageIcon,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: Tags,
  },
];

export default function AdminSidebar({ user, newLeadsCount = 0 }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
      setIsLoggingOut(false);
    }
  };

  const navContent = (
    <div className="flex flex-col h-full bg-white text-[#1F2922] border-r border-[#E5E8D8] select-none">
      
      {/* Brand Header */}
      <div className="p-6 border-b border-[#E5E8D8] flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#AFEB63] text-[#1F2922] flex items-center justify-center font-bold font-serif text-xl shadow-xs">
            N
          </div>
          <div>
            <span className="text-[17px] font-semibold text-[#1F2922] block leading-tight tracking-tight">
              Nirvaana Hills
            </span>
            <span className="text-[10.5px] text-[#B3482B] font-semibold uppercase tracking-[0.14em] block mt-0.5">
              Control Panel
            </span>
          </div>
        </Link>

        {/* Mobile close */}
        <button
          type="button"
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden text-[#5C6051] hover:text-[#1F2922] p-1"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 !text-[11px] font-semibold text-[#5C6051]/70 uppercase tracking-[0.14em]">
          Management
        </div>

        {ADMIN_NAV_LINKS.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl !text-[13.5px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#AFEB63] text-[#1F2922] font-semibold shadow-xs"
                  : "text-[#5C6051] hover:text-[#1F2922] hover:bg-[#FAF9F5]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4.5 h-4.5 ${isActive ? "text-[#1F2922]" : "text-[#5C6051]"}`} />
                <span className="!text-[13.5px]">{item.label}</span>
              </div>

              {item.badgeKey === "newLeads" && newLeadsCount > 0 && (
                <span
                  className={`px-2 py-0.5 rounded-full !text-[11px] font-bold ${
                    isActive
                      ? "bg-[#1F2922] text-[#AFEB63]"
                      : "bg-[#AFEB63] text-[#1F2922]"
                  }`}
                >
                  {newLeadsCount}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-6 px-3 pb-2 !text-[11px] font-semibold text-[#5C6051]/70 uppercase tracking-[0.14em]">
          External
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl !text-[13.5px] text-[#5C6051] hover:text-[#1F2922] hover:bg-[#FAF9F5] transition-colors"
        >
          <div className="flex items-center gap-3">
            <ExternalLink className="w-4.5 h-4.5 text-[#5C6051]" />
            <span className="!text-[13.5px]">Live Website</span>
          </div>
          <span className="!text-[12px] text-[#5C6051]/60">↗</span>
        </a>
      </div>

      {/* User Info & Logout Footer */}
      <div className="p-4 border-t border-[#E5E8D8] bg-[#FAF9F5]">
        <div className="flex items-center justify-between gap-3 mb-3 px-1">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#AFEB63]/30 border border-[#AFEB63] text-[#1F2922] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <div className="truncate">
              <div className="!text-[13px] font-semibold text-[#1F2922] truncate">
                {user?.username || "Admin"}
              </div>
              <div className="!text-[11px] text-[#5C6051] truncate">
                {user?.email || "nirvaanahills@gmail.com"}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 border border-rose-200 !text-[12.5px] font-semibold transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span className="!text-[12.5px]">{isLoggingOut ? "Signing out..." : "Sign Out"}</span>
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-[#E5E8D8] px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#AFEB63] text-[#1F2922] flex items-center justify-center font-bold text-sm">
            N
          </div>
          <span className="font-serif text-[17px] text-[#1F2922]">Nirvaana Hills</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-lg bg-[#FAF9F5] border border-[#E5E8D8] text-[#1F2922] hover:bg-white"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-64 lg:w-72 shrink-0 h-screen sticky top-0">
        {navContent}
      </aside>

      {/* Mobile Slide-in Drawer */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs h-full z-10 shadow-2xl">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}

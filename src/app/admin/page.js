import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getAdminSession } from "@/lib/auth";
import { getDashboardStats } from "@/lib/db";
import {
  Users,
  FileText,
  Image as ImageIcon,
  Tags,
  ArrowUpRight,
  PlusCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Dashboard Overview | Nirvaana Hills Admin",
};

export default async function AdminOverviewPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const stats = getDashboardStats();

  const statusColors = {
    NEW: "bg-emerald-50 text-emerald-700 border-emerald-200",
    CONTACTED: "bg-blue-50 text-blue-700 border-blue-200",
    QUALIFIED: "bg-purple-50 text-purple-700 border-purple-200",
    CLOSED: "bg-zinc-100 text-zinc-600 border-zinc-200",
  };

  return (
    <div className="space-y-8 select-none">
      
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E8D8]">
        <div>
          <div className="inline-flex items-center gap-2 text-[#B3482B] text-[12px] font-semibold tracking-[0.14em] uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#B3482B]" />
            <span>Nirvaana Community Dashboard</span>
          </div>
          <h1 className="font-serif text-[28px] sm:text-[34px] font-normal text-[#1F2922] tracking-tight">
            Welcome back, {session.username}
          </h1>
          <p className="text-[14px] text-[#5C6051] font-sans mt-0.5">
            Monitor incoming leads, manage editorial articles, and update gallery visuals
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-2 bg-[#AFEB63] hover:bg-[#9de04e] text-[#1F2922] font-semibold text-[14px] px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Write New Blog</span>
          </Link>
          <Link
            href="/admin/gallery"
            className="inline-flex items-center gap-2 bg-white hover:bg-[#FAF9F5] text-[#1F2922] font-medium text-[14px] px-4 py-2.5 rounded-xl transition-all border border-[#E5E8D8] shadow-xs cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 text-[#5C6051]" />
            <span>Add Visual</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Total Inquiries */}
        <Link
          href="/admin/contacts"
          className="bg-white border border-[#E5E8D8] hover:border-[#AFEB63] rounded-2xl p-5.5 transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-[#5C6051]">Form Leads</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-semibold text-[#1F2922] tracking-tight font-serif">
              {stats.totalLeads}
            </span>
            {stats.newLeads > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                {stats.newLeads} New
              </span>
            )}
          </div>
          <p className="text-[12.5px] text-[#5C6051] mt-2 group-hover:text-[#1F2922] transition-colors flex items-center gap-1">
            <span>Manage customer leads</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </p>
        </Link>

        {/* Total Blogs */}
        <Link
          href="/admin/blogs"
          className="bg-white border border-[#E5E8D8] hover:border-[#AFEB63] rounded-2xl p-5.5 transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-[#5C6051]">Blog Articles</span>
            <div className="w-9 h-9 rounded-xl bg-[#AFEB63]/30 text-[#1F2922] flex items-center justify-center font-semibold">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-semibold text-[#1F2922] tracking-tight font-serif">
              {stats.totalBlogs}
            </span>
            <span className="text-[12px] text-[#5C6051]">
              {stats.publishedBlogs} Published
            </span>
          </div>
          <p className="text-[12.5px] text-[#5C6051] mt-2 group-hover:text-[#1F2922] transition-colors flex items-center gap-1">
            <span>Manage publications</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </p>
        </Link>

        {/* Gallery Visuals */}
        <Link
          href="/admin/gallery"
          className="bg-white border border-[#E5E8D8] hover:border-[#AFEB63] rounded-2xl p-5.5 transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-[#5C6051]">Gallery Visuals</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-semibold text-[#1F2922] tracking-tight font-serif">
              {stats.totalGalleryImages}
            </span>
            <span className="text-[12px] text-[#5C6051]">Active Media</span>
          </div>
          <p className="text-[12.5px] text-[#5C6051] mt-2 group-hover:text-[#1F2922] transition-colors flex items-center gap-1">
            <span>Organize photos &amp; views</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </p>
        </Link>

        {/* Categories */}
        <Link
          href="/admin/categories"
          className="bg-white border border-[#E5E8D8] hover:border-[#AFEB63] rounded-2xl p-5.5 transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-[#5C6051]">Categories</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Tags className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-semibold text-[#1F2922] tracking-tight font-serif">
              {stats.totalCategories}
            </span>
            <span className="text-[12px] text-[#5C6051]">Taxonomies</span>
          </div>
          <p className="text-[12.5px] text-[#5C6051] mt-2 group-hover:text-[#1F2922] transition-colors flex items-center gap-1">
            <span>Manage categories</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </p>
        </Link>

      </div>

      {/* 2-Column Split: Recent Leads & Recent Blogs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Inquiries Card */}
        <div className="bg-white border border-[#E5E8D8] rounded-3xl p-6 flex flex-col shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-[18px] sm:text-[20px] font-medium text-[#1F2922] font-serif">
                Recent Inquiries
              </h2>
              <p className="text-[13px] text-[#5C6051]">
                Latest customer form submissions
              </p>
            </div>
            <Link
              href="/admin/contacts"
              className="text-[13px] text-[#B3482B] hover:underline font-semibold flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 space-y-3">
            {stats.recentLeads && stats.recentLeads.length > 0 ? (
              stats.recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E5E8D8] flex items-center justify-between gap-3 hover:border-[#AFEB63] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-[#1F2922] text-[14.5px] truncate">
                        {lead.name}
                      </span>
                      <span
                        className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full border ${
                          statusColors[lead.status] || "bg-zinc-100 text-zinc-700"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <div className="text-[12.5px] text-[#5C6051] flex items-center gap-3">
                      <span>{lead.phone}</span>
                      {lead.requirement && (
                        <>
                          <span>•</span>
                          <span className="truncate">{lead.requirement}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-[11.5px] text-[#5C6051]/80 shrink-0 font-mono">
                    {new Date(lead.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-[#5C6051] text-[13.5px]">
                No inquiries received yet.
              </div>
            )}
          </div>
        </div>

        {/* Recent Blogs Card */}
        <div className="bg-white border border-[#E5E8D8] rounded-3xl p-6 flex flex-col shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-[18px] sm:text-[20px] font-medium text-[#1F2922] font-serif">
                Recent Blog Articles
              </h2>
              <p className="text-[13px] text-[#5C6051]">
                Published articles and drafts
              </p>
            </div>
            <Link
              href="/admin/blogs"
              className="text-[13px] text-[#B3482B] hover:underline font-semibold flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 space-y-3">
            {stats.recentBlogs && stats.recentBlogs.length > 0 ? (
              stats.recentBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E5E8D8] flex items-center justify-between gap-4 hover:border-[#AFEB63] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {blog.featuredImage ? (
                      <div className="w-12 h-12 rounded-lg relative overflow-hidden shrink-0 border border-[#E5E8D8] bg-[#E5E8D8]">
                        <Image
                          src={blog.featuredImage}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-white border border-[#E5E8D8] flex items-center justify-center text-[#5C6051] shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[#1F2922] text-[14.5px] truncate">
                        {blog.title}
                      </h3>
                      <div className="text-[12px] text-[#5C6051] flex items-center gap-2 mt-0.5">
                        <span className="text-[#B3482B] font-medium">{blog.category}</span>
                        <span>•</span>
                        <span className="text-[11px]">
                          {blog.status === "PUBLISHED" ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/admin/blogs/${blog.id}`}
                    className="shrink-0 text-[12.5px] font-semibold px-3 py-1.5 rounded-lg bg-white hover:bg-[#FAF9F5] text-[#1F2922] border border-[#E5E8D8] transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-[#5C6051] text-[13.5px]">
                No blog posts created yet.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

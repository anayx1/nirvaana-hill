"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  PlusCircle,
  Search,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blogs?status=ALL");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data || []);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete the blog post "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        showToast("Blog article deleted successfully");
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesStatus =
      activeFilter === "ALL" || b.status === activeFilter;
    const matchesSearch =
      !searchQuery ||
      b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 select-none">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F2922] text-[#AFEB63] font-semibold px-4 py-3 rounded-2xl shadow-xl border border-white/20 flex items-center gap-2 text-[13.5px] animate-bounce">
          <CheckCircle className="w-4 h-4 text-[#AFEB63]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E8D8]">
        <div>
          <h1 className="font-serif text-[28px] sm:text-[32px] font-normal text-[#1F2922] tracking-tight">
            Blog Articles &amp; Insights
          </h1>
          <p className="text-[14px] text-[#5C6051] font-sans mt-0.5">
            Create, edit, and publish rich editorial articles for Nirvaana Hills
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 bg-[#AFEB63] hover:bg-[#9de04e] text-[#1F2922] font-semibold text-[14px] px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4.5 h-4.5" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2">
          {["ALL", "PUBLISHED", "DRAFT"].map((status) => {
            const isActive = activeFilter === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setActiveFilter(status)}
                className={`px-3.5 py-1.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#AFEB63] text-[#1F2922] shadow-xs"
                    : "bg-white text-[#5C6051] hover:text-[#1F2922] hover:bg-[#FAF9F5] border border-[#E5E8D8]"
                }`}
              >
                {status === "ALL" ? "All Articles" : status}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C6051]/60" />
          <input
            type="text"
            placeholder="Search by title, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E5E8D8] focus:border-[#AFEB63] focus:ring-1 focus:ring-[#AFEB63] rounded-xl text-[#1F2922] placeholder-[#5C6051]/50 text-[13.5px] outline-none transition-colors shadow-xs"
          />
        </div>

      </div>

      {/* Blogs List */}
      <div className="bg-white border border-[#E5E8D8] rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13.5px]">
            <thead>
              <tr className="border-b border-[#E5E8D8] bg-[#F3F5ED] text-[#5C6051] uppercase text-[11.5px] tracking-wider font-semibold">
                <th className="py-3.5 px-5">Article</th>
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Read Time</th>
                <th className="py-3.5 px-5">Date</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8D8]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#5C6051]">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#1F2922] border-t-transparent rounded-full animate-spin" />
                      <span>Loading articles...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-[#FAF9F5] transition-colors"
                  >
                    {/* Thumbnail & Title */}
                    <td className="py-4 px-5 max-w-sm">
                      <div className="flex items-center gap-3.5">
                        {blog.featuredImage ? (
                          <div className="w-14 h-14 rounded-xl relative overflow-hidden shrink-0 border border-[#E5E8D8] bg-[#E5E8D8]">
                            <Image
                              src={blog.featuredImage}
                              alt={blog.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-[#FAF9F5] border border-[#E5E8D8] flex items-center justify-center text-[#5C6051] shrink-0">
                            <FileText className="w-6 h-6" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <Link
                            href={`/admin/blogs/${blog.id}`}
                            className="font-semibold text-[#1F2922] text-[14.5px] hover:text-[#B3482B] transition-colors truncate block"
                          >
                            {blog.title}
                          </Link>
                          {blog.excerpt && (
                            <p className="text-[12.5px] text-[#5C6051] truncate max-w-xs mt-0.5">
                              {blog.excerpt}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-5">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[11.5px] font-semibold bg-[#AFEB63]/30 text-[#1F2922] border border-[#AFEB63]">
                        {blog.category}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          blog.status === "PUBLISHED"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : "bg-amber-50 text-amber-800 border-amber-300"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>

                    {/* Read Duration */}
                    <td className="py-4 px-5 text-[#5C6051] text-[12.5px]">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#5C6051]/70" />
                        <span>{blog.readDuration || "4 min read"}</span>
                      </div>
                    </td>

                    {/* Published Date */}
                    <td className="py-4 px-5 text-[#5C6051] text-[12.5px] font-mono">
                      {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Edit Button */}
                        <Link
                          href={`/admin/blogs/${blog.id}`}
                          className="p-2 rounded-xl bg-[#FAF9F5] hover:bg-[#F3F5ED] text-[#1F2922] border border-[#E5E8D8] transition-colors"
                          title="Edit Article"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDelete(blog.id, blog.title)}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#5C6051]">
                    No blog articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

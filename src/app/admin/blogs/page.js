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
  Tags,
  X,
  Plus,
  AlertCircle,
} from "lucide-react";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Category modal & creation state
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [creatingCat, setCreatingCat] = useState(false);
  const [catModalError, setCatModalError] = useState("");

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

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories?type=blog");
      const data = await res.json();
      if (data.success) {
        setCategories(data.data || []);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleCreateCategory = async (e) => {
    if (e) e.preventDefault();
    if (!newCatName.trim()) return;

    setCreatingCat(true);
    setCatModalError("");

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCatName.trim(),
          type: "blog",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNewCatName("");
        showToast(`Category "${data.data?.name || "New"}" created successfully!`);
        fetchCategories();
      } else {
        setCatModalError(data.error || "Failed to create category");
      }
    } catch (err) {
      console.error("Error creating category:", err);
      setCatModalError("A network error occurred.");
    } finally {
      setCreatingCat(false);
    }
  };

  const handleDeleteCategory = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete category "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/categories?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        showToast(`Category "${name}" deleted`);
      } else {
        setCatModalError(data.error || "Failed to delete category");
      }
    } catch (err) {
      console.error("Error deleting category:", err);
    }
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
    const matchesCategory =
      categoryFilter === "ALL" || b.category?.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
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

      {/* Categories Management Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-[#E5E8D8] rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E8D8]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#AFEB63]/20 text-[#1F2922]">
                  <Tags className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-[19px] font-semibold text-[#1F2922] tracking-tight">
                    Manage Blog Categories
                  </h2>
                  <p className="text-[12.5px] text-[#5C6051]">
                    Add, view, and manage categories for articles
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowCategoryModal(false);
                  setCatModalError("");
                  setNewCatName("");
                }}
                className="p-1.5 rounded-xl hover:bg-[#FAF9F5] text-[#5C6051] hover:text-[#1F2922] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Create Category Form */}
            <form onSubmit={handleCreateCategory} className="space-y-2">
              <label className="block !text-[11.5px] font-bold text-[#5C6051] uppercase tracking-wider">
                Create New Category
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. Wildlife & Flora"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] !text-[13px] outline-none transition-colors shadow-xs"
                />
                <button
                  type="submit"
                  disabled={creatingCat || !newCatName.trim()}
                  className="px-4 py-2.5 bg-[#AFEB63] hover:bg-[#9de04e] text-[#1F2922] font-semibold !text-[12.5px] rounded-xl transition-all disabled:opacity-50 cursor-pointer shrink-0 shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span className="!text-[12.5px]">{creatingCat ? "Creating..." : "Create"}</span>
                </button>
              </div>
              {catModalError && (
                <p className="!text-[12px] text-rose-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{catModalError}</span>
                </p>
              )}
            </form>

            {/* Categories List */}
            <div className="space-y-2 pt-2">
              <span className="block text-[12px] font-bold text-[#5C6051] uppercase tracking-wider">
                Existing Categories ({categories.length})
              </span>
              <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1 divide-y divide-[#F3F5ED]">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-[#FAF9F5] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#AFEB63]" />
                        <span className="font-semibold text-[#1F2922] text-[13.5px]">
                          {cat.name}
                        </span>
                        <span className="text-[11px] text-[#5C6051] font-mono">
                          ({cat.slug})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(cat.id, cat.name)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-[13px] text-[#5C6051] py-4 text-center">
                    No categories found.
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E8D8] flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowCategoryModal(false);
                  setCatModalError("");
                  setNewCatName("");
                }}
                className="px-4 py-2 bg-[#FAF9F5] hover:bg-[#F3F5ED] text-[#1F2922] font-semibold text-[13px] rounded-xl border border-[#E5E8D8] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E8D8]">
        <div>
          <h1 className="text-[26px] sm:text-[30px] font-semibold text-[#1F2922] tracking-tight">
            Blog Articles &amp; Insights
          </h1>
          <p className="text-[14px] text-[#5C6051] font-sans mt-0.5">
            Create, edit, and publish rich editorial articles for Nirvaana Hills
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            onClick={() => setShowCategoryModal(true)}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#FAF9F5] text-[#1F2922] font-semibold text-[13.5px] px-4 py-2.5 rounded-xl border border-[#E5E8D8] transition-all shadow-xs cursor-pointer"
          >
            <Tags className="w-4 h-4 text-[#5C6051]" />
            <span>Categories</span>
          </button>

          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-2 bg-[#AFEB63] hover:bg-[#9de04e] text-[#1F2922] font-semibold text-[14px] px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-4.5 h-4.5" />
            <span>Write New Article</span>
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Status Filter & Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
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
                {status === "ALL" ? "All Status" : status}
              </button>
            );
          })}

          {/* Category Filter Selector */}
          {categories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-[13px] font-semibold bg-white text-[#5C6051] hover:text-[#1F2922] border border-[#E5E8D8] outline-none cursor-pointer shadow-xs"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
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

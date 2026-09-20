"use client";

import React, { useState, useEffect } from "react";
import {
  Tags,
  PlusCircle,
  Trash2,
  CheckCircle,
  AlertCircle,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCatName, setNewCatName] = useState("");
  const [newCatType, setNewCatType] = useState("blog");
  const [creating, setCreating] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.data || []);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setCreating(true);
    setError("");

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCatName.trim(),
          type: newCatType,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNewCatName("");
        showToast("Category created successfully");
        fetchCategories();
      } else {
        setError(data.error || "Failed to create category");
      }
    } catch (err) {
      console.error("Create category error:", err);
      setError("A connection error occurred.");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id, name) => {
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
        showToast("Category deleted successfully");
      }
    } catch (err) {
      console.error("Delete category error:", err);
    }
  };

  const blogCategories = categories.filter((c) => c.type === "blog");
  const galleryCategories = categories.filter((c) => c.type === "gallery");

  return (
    <div className="space-y-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F2922] text-white font-semibold px-5 py-3.5 rounded-2xl shadow-2xl border border-[#E5E8D8] flex items-center gap-2.5 text-sm">
          <CheckCircle className="w-4.5 h-4.5 text-[#AFEB63]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-4 border-b border-[#E5E8D8]">
        <h1 className="font-serif text-[28px] sm:text-[32px] font-normal text-[#1F2922] tracking-tight">
          Categories &amp; Taxonomies
        </h1>
        <p className="text-[13.5px] text-[#5C6051] font-sans mt-0.5">
          Organize classification terms for blog articles and gallery collections
        </p>
      </div>

      {/* Create Category Card */}
      <div className="bg-white border border-[#E5E8D8] rounded-3xl p-6 sm:p-7 shadow-xs">
        <h2 className="font-serif text-[18px] text-[#1F2922] font-normal mb-4">
          Add New Category
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[13px] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleCreateCategory} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="e.g. Wildlife & Ecology, Forest Walkways..."
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] placeholder-[#8C9280] text-[14px] outline-none transition-all"
            />
          </div>

          <div className="sm:w-48">
            <select
              value={newCatType}
              onChange={(e) => setNewCatType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] text-[13.5px] outline-none cursor-pointer"
            >
              <option value="blog">Blog Category</option>
              <option value="gallery">Gallery Category</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={creating}
            className="px-6 py-2.5 rounded-xl bg-[#AFEB63] hover:bg-[#9de04e] text-[#1F2922] text-[13.5px] font-semibold flex items-center justify-center gap-2 transition-all shadow-sm shadow-[#AFEB63]/20 disabled:opacity-60 cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{creating ? "Adding..." : "Add Category"}</span>
          </button>
        </form>
      </div>

      {/* 2-Column Split: Blog vs Gallery Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Blog Categories Card */}
        <div className="bg-white border border-[#E5E8D8] rounded-3xl p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-[#E5E8D8]">
            <div className="w-9 h-9 rounded-xl bg-[#FAF9F5] border border-[#E5E8D8] text-[#1F2922] flex items-center justify-center">
              <FileText className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-semibold text-[#1F2922] text-[16px]">
                Blog Categories
              </h3>
              <span className="text-[12px] text-[#5C6051]">
                {blogCategories.length} Active categories
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            {loading ? (
              <div className="py-8 text-center text-[#5C6051] text-[13px]">
                Loading...
              </div>
            ) : blogCategories.length > 0 ? (
              blogCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E5E8D8] flex items-center justify-between gap-3 hover:bg-white hover:border-[#1F2922]/30 transition-all"
                >
                  <div>
                    <span className="font-semibold text-[#1F2922] text-[14px]">
                      {cat.name}
                    </span>
                    <span className="text-[11.5px] text-[#5C6051] font-mono block mt-0.5">
                      slug: {cat.slug}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-2 rounded-lg text-[#5C6051] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-[#5C6051] text-[13px]">
                No blog categories configured.
              </div>
            )}
          </div>
        </div>

        {/* Gallery Categories Card */}
        <div className="bg-white border border-[#E5E8D8] rounded-3xl p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-[#E5E8D8]">
            <div className="w-9 h-9 rounded-xl bg-[#FAF9F5] border border-[#E5E8D8] text-[#B3482B] flex items-center justify-center">
              <ImageIcon className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-semibold text-[#1F2922] text-[16px]">
                Gallery Categories
              </h3>
              <span className="text-[12px] text-[#5C6051]">
                {galleryCategories.length} Active categories
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            {loading ? (
              <div className="py-8 text-center text-[#5C6051] text-[13px]">
                Loading...
              </div>
            ) : galleryCategories.length > 0 ? (
              galleryCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E5E8D8] flex items-center justify-between gap-3 hover:bg-white hover:border-[#1F2922]/30 transition-all"
                >
                  <div>
                    <span className="font-semibold text-[#1F2922] text-[14px]">
                      {cat.name}
                    </span>
                    <span className="text-[11.5px] text-[#5C6051] font-mono block mt-0.5">
                      slug: {cat.slug}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-2 rounded-lg text-[#5C6051] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-[#5C6051] text-[13px]">
                No gallery categories configured.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

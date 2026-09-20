"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  PlusCircle,
  Trash2,
  Edit,
  Upload,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";

export default function AdminGalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  // Modal State for Add / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modalError, setModalError] = useState("");

  // Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formAlt, setFormAlt] = useState("");
  const [formCategory, setFormCategory] = useState("raw-site");
  const [formImage, setFormImage] = useState("");
  const [formOrder, setFormOrder] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [galRes, catRes] = await Promise.all([
        fetch("/api/gallery"),
        fetch("/api/categories?type=gallery"),
      ]);

      const galData = await galRes.json();
      const catData = await catRes.json();

      if (galData.success) {
        setGalleryItems(galData.data || []);
      }
      if (catData.success) {
        setCategories(catData.data || []);
        if (catData.data.length > 0 && !formCategory) {
          setFormCategory(catData.data[0].slug || catData.data[0].name);
        }
      }
    } catch (err) {
      console.error("Error loading gallery data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormTitle("");
    setFormAlt("");
    setFormCategory(categories[0]?.slug || "raw-site");
    setFormImage("");
    setFormOrder(galleryItems.length + 1);
    setModalError("");
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormTitle(item.title || "");
    setFormAlt(item.alt || "");
    setFormCategory(item.category || "raw-site");
    setFormImage(item.image || "");
    setFormOrder(item.orderIndex || 0);
    setModalError("");
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setModalError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (formTitle) {
        formData.append("customName", `gallery-${formTitle.toLowerCase().replace(/\s+/g, "-")}`);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setFormImage(data.url);
      } else {
        setModalError(data.error || "Failed to upload image.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setModalError("Failed to process image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveModal = async (e) => {
    e.preventDefault();
    setModalError("");

    if (!formImage) {
      setModalError("Please upload or provide an image URL.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        title: formTitle.trim(),
        alt: formAlt.trim() || formTitle.trim(),
        category: formCategory,
        image: formImage,
        orderIndex: Number(formOrder) || 0,
      };

      const url = editingItem ? `/api/gallery/${editingItem.id}` : "/api/gallery";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setModalError(data.error || "Failed to save gallery visual.");
        setSaving(false);
        return;
      }

      setModalOpen(false);
      showToast(editingItem ? "Visual updated successfully" : "Visual added to gallery");
      fetchData();
    } catch (err) {
      console.error("Save gallery item error:", err);
      setModalError("A network error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to remove "${title || "this visual"}" from the gallery?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setGalleryItems((prev) => prev.filter((item) => item.id !== id));
        showToast("Visual removed from gallery");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Filter gallery items by category
  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F2922] text-white font-semibold px-5 py-3.5 rounded-2xl shadow-2xl border border-[#E5E8D8] flex items-center gap-2.5 text-sm">
          <CheckCircle className="w-4.5 h-4.5 text-[#AFEB63]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E8D8]">
        <div>
          <h1 className="font-serif text-[28px] sm:text-[32px] font-normal text-[#1F2922] tracking-tight">
            Gallery Visuals &amp; Media
          </h1>
          <p className="text-[13.5px] text-[#5C6051] font-sans mt-0.5">
            Manage authentic site footage, Aravalli horizon views, and progress media
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-[#AFEB63] hover:bg-[#9de04e] text-[#1F2922] font-semibold text-[13.5px] px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-[#AFEB63]/20 cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Upload Visual</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all cursor-pointer ${
            activeCategory === "all"
              ? "bg-[#AFEB63] text-[#1F2922] font-semibold shadow-xs"
              : "bg-white text-[#5C6051] hover:text-[#1F2922] border border-[#E5E8D8] hover:bg-[#FAF9F5]"
          }`}
        >
          All Categories ({galleryItems.length})
        </button>

        {categories.map((cat) => {
          const catKey = cat.slug || cat.name;
          const count = galleryItems.filter((i) => i.category === catKey).length;
          const isActive = activeCategory === catKey;

          return (
            <button
              key={cat.id || catKey}
              type="button"
              onClick={() => setActiveCategory(catKey)}
              className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all cursor-pointer flex items-center gap-2 ${
                isActive
                  ? "bg-[#AFEB63] text-[#1F2922] font-semibold shadow-xs"
                  : "bg-white text-[#5C6051] hover:text-[#1F2922] border border-[#E5E8D8] hover:bg-[#FAF9F5]"
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                  isActive ? "bg-[#1F2922] text-[#AFEB63]" : "bg-[#FAF9F5] text-[#5C6051] border border-[#E5E8D8]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Visuals Grid */}
      {loading ? (
        <div className="py-24 text-center text-[#5C6051]">
          <div className="inline-flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-[#1F2922] border-t-transparent rounded-full animate-spin" />
            <span className="text-[14px]">Loading gallery visuals...</span>
          </div>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5E8D8] rounded-3xl overflow-hidden group hover:border-[#1F2922] hover:shadow-md transition-all flex flex-col"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[4/3] bg-[#FAF9F5] overflow-hidden border-b border-[#E5E8D8]">
                <Image
                  src={item.image}
                  alt={item.alt || item.title || "Gallery Item"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-xs text-[#1F2922] border border-[#E5E8D8] shadow-xs">
                    {item.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-black/75 text-white">
                    #{item.orderIndex}
                  </span>
                </div>

                {/* Hover Quick Action Buttons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="p-2.5 rounded-xl bg-white text-[#1F2922] hover:bg-[#FAF9F5] backdrop-blur-xs transition-all cursor-pointer shadow-lg"
                    title="Edit Visual Details"
                  >
                    <Edit className="w-4.5 h-4.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white backdrop-blur-xs transition-all cursor-pointer shadow-lg"
                    title="Delete Visual"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-[#1F2922] text-[14px] leading-snug line-clamp-1">
                    {item.title || "Untitled Visual"}
                  </h3>
                  {item.alt && (
                    <p className="text-[12px] text-[#5C6051] line-clamp-1 mt-1">
                      Alt: {item.alt}
                    </p>
                  )}
                </div>

                <div className="pt-3 mt-2 border-t border-[#E5E8D8] flex items-center justify-between text-[11.5px] text-[#5C6051]">
                  <span className="font-mono truncate max-w-[140px]">{item.image}</span>
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="font-semibold text-[#1F2922] hover:text-[#B3482B] cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E5E8D8] rounded-3xl p-12 text-center text-[#5C6051] shadow-xs">
          <ImageIcon className="w-10 h-10 mx-auto mb-3 text-[#1F2922]/30" />
          <p className="text-[14px] text-[#1F2922] font-semibold">No visual items found in this category</p>
          <p className="text-[12.5px] mt-1">Click &ldquo;Upload Visual&rdquo; to add photos directly.</p>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-[#E5E8D8] rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E5E8D8]">
              <h2 className="font-serif text-[22px] text-[#1F2922] font-normal">
                {editingItem ? "Edit Gallery Visual" : "Upload New Visual"}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-[#5C6051] hover:text-[#1F2922] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Alert */}
            {modalError && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-[13px]">
                <AlertCircle className="w-4.5 h-4.5 shrink-0 text-rose-600 mt-0.5" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleSaveModal} className="space-y-4">
              
              {/* Image Preview / Upload Area */}
              <div>
                <label className="block text-[12px] font-bold text-[#5C6051] uppercase tracking-wider mb-2">
                  Visual Image *
                </label>

                {formImage ? (
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#E5E8D8] bg-[#FAF9F5] mb-2 group">
                    <Image
                      src={formImage}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setFormImage("")}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white text-[12px] font-semibold shadow-lg"
                      >
                        Change Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-[#D2D8C0] hover:border-[#1F2922] rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-[#FAF9F5] hover:bg-white transition-all">
                    <Upload className="w-6 h-6 text-[#1F2922]" />
                    <span className="text-[13.5px] font-semibold text-[#1F2922]">
                      {uploading ? "Converting with Sharp WebP..." : "Click to upload image file"}
                    </span>
                    <span className="text-[11.5px] text-[#5C6051]">
                      Lossless WebP compression automatic
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                )}

                <input
                  type="text"
                  placeholder="Or enter image URL path (/locations/hero.avif)"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full mt-2 px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] text-[12.5px] font-mono outline-none"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-[12px] font-bold text-[#5C6051] uppercase tracking-wider mb-1.5">
                  Visual Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aravalli Hills Horizon View"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] text-[13.5px] outline-none"
                />
              </div>

              {/* Alt Text */}
              <div>
                <label className="block text-[12px] font-bold text-[#5C6051] uppercase tracking-wider mb-1.5">
                  Alt Text (SEO &amp; Accessibility)
                </label>
                <input
                  type="text"
                  placeholder="Descriptive text for image..."
                  value={formAlt}
                  onChange={(e) => setFormAlt(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] text-[13.5px] outline-none"
                />
              </div>

              {/* Category & Order Index */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#5C6051] uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] text-[13px] outline-none cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id || c.slug} value={c.slug || c.name} className="bg-white text-[#1F2922]">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#5C6051] uppercase tracking-wider mb-1.5">
                    Display Order Index
                  </label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={(e) => setFormOrder(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] text-[13px] outline-none font-mono"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E5E8D8] mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF9F5] text-[#5C6051] hover:text-[#1F2922] border border-[#E5E8D8] text-[13.5px] font-medium transition-colors cursor-pointer shadow-xs"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#AFEB63] hover:bg-[#9de04e] text-[#1F2922] text-[13.5px] font-semibold transition-all shadow-sm shadow-[#AFEB63]/20 disabled:opacity-60 cursor-pointer"
                >
                  {saving ? "Saving..." : editingItem ? "Update Visual" : "Add to Gallery"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

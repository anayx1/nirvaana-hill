"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Images,
  Loader2,
} from "lucide-react";

export default function AdminGalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  // Single Edit Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modalError, setModalError] = useState("");

  // Single Edit Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formAlt, setFormAlt] = useState("");
  const [formCategory, setFormCategory] = useState("raw-site");
  const [formImage, setFormImage] = useState("");
  const [formOrder, setFormOrder] = useState(0);

  // Bulk Upload Modal State
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkCategory, setBulkCategory] = useState("raw-site");
  const [bulkTitlePrefix, setBulkTitlePrefix] = useState("");
  const [bulkFiles, setBulkFiles] = useState([]); // { id, file, preview, status: 'pending'|'uploading'|'done'|'error', url, error }
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkError, setBulkError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const bulkFileInputRef = useRef(null);
  const bulkIdCounter = useRef(0);

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

  // ─── Single Edit Modal Handlers ───

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

  // ─── Bulk Upload Modal Handlers ───

  const openBulkModal = () => {
    setBulkCategory(categories[0]?.slug || "raw-site");
    setBulkTitlePrefix("");
    setBulkFiles([]);
    setBulkError("");
    setBulkUploading(false);
    setIsDragging(false);
    setBulkModalOpen(true);
  };

  const addFilesToBulk = useCallback((fileList) => {
    const imageFiles = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    const newEntries = imageFiles.map((file) => {
      const id = `bulk-${++bulkIdCounter.current}`;
      return {
        id,
        file,
        preview: URL.createObjectURL(file),
        status: "pending",
        url: null,
        error: null,
      };
    });

    setBulkFiles((prev) => [...prev, ...newEntries]);
  }, []);

  const removeBulkFile = (id) => {
    setBulkFiles((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item?.preview) URL.revokeObjectURL(item.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleBulkFileInput = (e) => {
    if (e.target.files) {
      addFilesToBulk(e.target.files);
    }
    // Reset input so the same files can be re-selected
    e.target.value = "";
  };

  // Drag & Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      addFilesToBulk(e.dataTransfer.files);
    }
  };

  const handleBulkUpload = async () => {
    const pendingFiles = bulkFiles.filter((f) => f.status === "pending");
    if (pendingFiles.length === 0) {
      setBulkError("No images to upload. Add some images first.");
      return;
    }

    setBulkUploading(true);
    setBulkError("");

    const startingOrder = galleryItems.length + 1;
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < pendingFiles.length; i++) {
      const entry = pendingFiles[i];

      // Mark as uploading
      setBulkFiles((prev) =>
        prev.map((f) => (f.id === entry.id ? { ...f, status: "uploading" } : f))
      );

      try {
        // Step 1: Upload the file
        const uploadFormData = new FormData();
        uploadFormData.append("file", entry.file);
        const prefix = bulkTitlePrefix.trim() || "gallery";
        uploadFormData.append(
          "customName",
          `gallery-${prefix.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`
        );

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadData.success) {
          throw new Error(uploadData.error || "Upload failed");
        }

        // Step 2: Create gallery entry
        const titleText = bulkTitlePrefix.trim()
          ? `${bulkTitlePrefix.trim()} ${i + 1}`
          : entry.file.name.replace(/\.[^/.]+$/, "");

        const galleryPayload = {
          title: titleText,
          alt: titleText,
          category: bulkCategory,
          image: uploadData.url,
          orderIndex: startingOrder + i,
        };

        const galleryRes = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(galleryPayload),
        });

        const galleryData = await galleryRes.json();

        if (!galleryRes.ok || !galleryData.success) {
          throw new Error(galleryData.error || "Failed to save gallery entry");
        }

        // Mark as done
        setBulkFiles((prev) =>
          prev.map((f) =>
            f.id === entry.id ? { ...f, status: "done", url: uploadData.url } : f
          )
        );
        successCount++;
      } catch (err) {
        console.error(`Bulk upload error for ${entry.file.name}:`, err);
        setBulkFiles((prev) =>
          prev.map((f) =>
            f.id === entry.id
              ? { ...f, status: "error", error: err.message || "Upload failed" }
              : f
          )
        );
        failCount++;
      }
    }

    setBulkUploading(false);

    if (successCount > 0) {
      showToast(
        `${successCount} image${successCount > 1 ? "s" : ""} uploaded successfully${failCount > 0 ? ` (${failCount} failed)` : ""}`
      );
      fetchData();
    }

    if (failCount > 0 && successCount === 0) {
      setBulkError(`All ${failCount} uploads failed. Please check your files and try again.`);
    }
  };

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      bulkFiles.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
    };
  }, []);

  // Filter gallery items by category
  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const bulkDoneCount = bulkFiles.filter((f) => f.status === "done").length;
  const bulkPendingCount = bulkFiles.filter((f) => f.status === "pending").length;
  const bulkErrorCount = bulkFiles.filter((f) => f.status === "error").length;

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

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={openBulkModal}
            className="inline-flex items-center gap-2 bg-[#1F2922] hover:bg-[#2a3d30] text-white font-semibold text-[13.5px] px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <Images className="w-4 h-4" />
            <span>Bulk Upload</span>
          </button>
        </div>
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
          <p className="text-[12.5px] mt-1">Click &ldquo;Bulk Upload&rdquo; to add multiple photos at once.</p>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* Single Edit Modal (for editing existing items) */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-[#E5E8D8] rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E5E8D8]">
              <h2 className="font-serif text-[22px] text-[#1F2922] font-normal">
                Edit Gallery Visual
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
                  {saving ? "Saving..." : "Update Visual"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* Bulk Upload Modal */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {bulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white border border-[#E5E8D8] rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E5E8D8]">
              <div>
                <h2 className="font-serif text-[22px] text-[#1F2922] font-normal flex items-center gap-2">
                  <Images className="w-5 h-5 text-[#AFEB63]" />
                  Bulk Upload Images
                </h2>
                <p className="text-[12.5px] text-[#5C6051] mt-0.5">
                  Upload multiple images under one category at once
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!bulkUploading) setBulkModalOpen(false);
                }}
                disabled={bulkUploading}
                className="p-1 rounded-lg text-[#5C6051] hover:text-[#1F2922] transition-colors disabled:opacity-40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Alert */}
            {bulkError && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-[13px]">
                <AlertCircle className="w-4.5 h-4.5 shrink-0 text-rose-600 mt-0.5" />
                <span>{bulkError}</span>
              </div>
            )}

            {/* Category & Title Prefix Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-[12px] font-bold text-[#5C6051] uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <select
                  value={bulkCategory}
                  onChange={(e) => setBulkCategory(e.target.value)}
                  disabled={bulkUploading}
                  className="w-full px-3 py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] text-[13px] outline-none cursor-pointer disabled:opacity-60"
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
                  Title Prefix (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aravalli View"
                  value={bulkTitlePrefix}
                  onChange={(e) => setBulkTitlePrefix(e.target.value)}
                  disabled={bulkUploading}
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] text-[13.5px] outline-none disabled:opacity-60"
                />
                <p className="text-[11px] text-[#5C6051] mt-1">
                  Images will be titled &ldquo;{bulkTitlePrefix.trim() || "Filename"} 1&rdquo;, &ldquo;{bulkTitlePrefix.trim() || "Filename"} 2&rdquo;, etc.
                </p>
              </div>
            </div>

            {/* Drag & Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !bulkUploading && bulkFileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all mb-5 ${
                isDragging
                  ? "border-[#AFEB63] bg-[#AFEB63]/5 scale-[1.01]"
                  : "border-[#D2D8C0] hover:border-[#1F2922] bg-[#FAF9F5] hover:bg-white"
              } ${bulkUploading ? "pointer-events-none opacity-60" : ""}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#1F2922]/5 flex items-center justify-center">
                <Upload className="w-6 h-6 text-[#1F2922]" />
              </div>
              <div className="text-center">
                <span className="text-[14px] font-semibold text-[#1F2922] block">
                  {isDragging ? "Drop images here" : "Click or drag images here"}
                </span>
                <span className="text-[12px] text-[#5C6051] mt-1 block">
                  Select multiple files at once • Auto-converted to WebP
                </span>
              </div>
              <input
                ref={bulkFileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleBulkFileInput}
                disabled={bulkUploading}
                className="hidden"
              />
            </div>

            {/* Preview Thumbnails Grid */}
            {bulkFiles.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[13px] font-semibold text-[#1F2922]">
                    {bulkFiles.length} image{bulkFiles.length > 1 ? "s" : ""} selected
                    {bulkDoneCount > 0 && (
                      <span className="text-[#5C6051] font-normal ml-2">
                        ({bulkDoneCount} uploaded{bulkErrorCount > 0 ? `, ${bulkErrorCount} failed` : ""})
                      </span>
                    )}
                  </p>
                  {!bulkUploading && bulkPendingCount > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        bulkFiles.forEach((f) => {
                          if (f.preview) URL.revokeObjectURL(f.preview);
                        });
                        setBulkFiles([]);
                      }}
                      className="text-[12px] text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[280px] overflow-y-auto pr-1">
                  {bulkFiles.map((entry) => (
                    <div
                      key={entry.id}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        entry.status === "done"
                          ? "border-[#AFEB63]"
                          : entry.status === "error"
                          ? "border-rose-400"
                          : entry.status === "uploading"
                          ? "border-[#1F2922] animate-pulse"
                          : "border-[#E5E8D8]"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={entry.preview}
                        alt={entry.file.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Status Overlay */}
                      {entry.status === "uploading" && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Loader2 className="w-5 h-5 text-white animate-spin" />
                        </div>
                      )}
                      {entry.status === "done" && (
                        <div className="absolute inset-0 bg-[#AFEB63]/20 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-[#1F2922]" />
                        </div>
                      )}
                      {entry.status === "error" && (
                        <div className="absolute inset-0 bg-rose-600/20 flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-rose-600" />
                        </div>
                      )}

                      {/* Remove Button (only for pending) */}
                      {entry.status === "pending" && !bulkUploading && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeBulkFile(entry.id);
                          }}
                          className="absolute top-1 right-1 p-1 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}

                      {/* Filename tooltip */}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1.5 py-0.5">
                        <p className="text-[9px] text-white truncate">{entry.file.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Progress Bar (during upload) */}
            {bulkUploading && bulkFiles.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between text-[12px] text-[#5C6051] mb-1.5">
                  <span>Uploading...</span>
                  <span className="font-mono">{bulkDoneCount + bulkErrorCount}/{bulkFiles.length}</span>
                </div>
                <div className="h-2 bg-[#FAF9F5] rounded-full overflow-hidden border border-[#E5E8D8]">
                  <div
                    className="h-full bg-[#AFEB63] rounded-full transition-all duration-300"
                    style={{ width: `${((bulkDoneCount + bulkErrorCount) / bulkFiles.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-[#E5E8D8]">
              <button
                type="button"
                onClick={() => !bulkUploading && bulkFileInputRef.current?.click()}
                disabled={bulkUploading}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF9F5] text-[#1F2922] border border-[#E5E8D8] text-[13px] font-medium transition-colors cursor-pointer shadow-xs disabled:opacity-40 inline-flex items-center gap-2"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Add More
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (!bulkUploading) {
                      bulkFiles.forEach((f) => {
                        if (f.preview) URL.revokeObjectURL(f.preview);
                      });
                      setBulkModalOpen(false);
                    }
                  }}
                  disabled={bulkUploading}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF9F5] text-[#5C6051] hover:text-[#1F2922] border border-[#E5E8D8] text-[13.5px] font-medium transition-colors cursor-pointer shadow-xs disabled:opacity-40"
                >
                  {bulkDoneCount > 0 && !bulkUploading ? "Done" : "Cancel"}
                </button>

                {bulkPendingCount > 0 && (
                  <button
                    type="button"
                    onClick={handleBulkUpload}
                    disabled={bulkUploading || bulkPendingCount === 0}
                    className="px-6 py-2.5 rounded-xl bg-[#AFEB63] hover:bg-[#9de04e] text-[#1F2922] text-[13.5px] font-semibold transition-all shadow-sm shadow-[#AFEB63]/20 disabled:opacity-60 cursor-pointer inline-flex items-center gap-2"
                  >
                    {bulkUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Upload {bulkPendingCount} Image{bulkPendingCount > 1 ? "s" : ""}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

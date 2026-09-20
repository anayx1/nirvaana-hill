"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Minus,
  RemoveFormatting,
  Code,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Save,
  Clock,
  X,
} from "lucide-react";

export default function BlogEditorForm({ isNew = true, blogId = null }) {
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [readDuration, setReadDuration] = useState("4 min read");
  const [author, setAuthor] = useState("Nirvaana Hills Team");
  const [status, setStatus] = useState("PUBLISHED");
  const [publishedAt, setPublishedAt] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");

  // Categories & UI State
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showCodeView, setShowCodeView] = useState(false);

  const editorRef = useRef(null);

  // Fetch categories and existing blog if editing
  useEffect(() => {
    async function loadData() {
      try {
        // Load categories
        const catRes = await fetch("/api/categories?type=blog");
        const catData = await catRes.json();
        if (catData.success && catData.data.length > 0) {
          setCategories(catData.data);
          if (isNew) {
            setCategory(catData.data[0].name);
          }
        }

        // If editing, load blog data
        if (!isNew && blogId) {
          const blogRes = await fetch(`/api/blogs/${blogId}`);
          const blogData = await blogRes.json();
          if (blogData.success && blogData.data) {
            const b = blogData.data;
            setTitle(b.title || "");
            setSlug(b.slug || "");
            setCategory(b.category || "");
            setContent(b.content || "");
            setExcerpt(b.excerpt || "");
            setFeaturedImage(b.featuredImage || "");
            setReadDuration(b.readDuration || "4 min read");
            setAuthor(b.author || "Nirvaana Hills Team");
            setStatus(b.status || "PUBLISHED");
            if (b.publishedAt) {
              setPublishedAt(new Date(b.publishedAt).toISOString().slice(0, 16));
            }
            setMetaTitle(b.metaTitle || "");
            setMetaDescription(b.metaDescription || "");
            setMetaKeywords(b.metaKeywords || "");

            if (editorRef.current) {
              editorRef.current.innerHTML = b.content || "";
            }
          }
        }
      } catch (err) {
        console.error("Error loading blog editor data:", err);
        setError("Failed to load blog data.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [isNew, blogId]);

  // Sync editor innerHTML when content changes initially
  useEffect(() => {
    if (editorRef.current && content && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  // Auto generate slug from title
  const handleTitleChange = (val) => {
    setTitle(val);
    if (isNew || !slug) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generated);
    }
    if (!metaTitle) {
      setMetaTitle(val ? `${val} | Nirvaana Hills` : "");
    }
  };

  // Auto calculate read duration when content changes
  const handleEditorInput = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    setContent(html);

    const textOnly = html.replace(/<[^>]*>/g, " ").trim();
    const words = textOnly.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    setReadDuration(`${minutes} min read`);
  };

  // Rich Text Command Handlers
  const executeCommand = (command, value = null) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, value);
    handleEditorInput();
  };

  const handleInsertLink = () => {
    const url = window.prompt("Enter link URL (e.g. https://nirvaanahills.com):");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  // Image Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (title) {
        formData.append("customName", `blog-${slug || "featured"}`);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setFeaturedImage(data.url);
      } else {
        setError(data.error || "Failed to upload image.");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setError("An error occurred while uploading image.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const currentContent = showCodeView ? content : editorRef.current?.innerHTML || content;

    if (!title.trim()) {
      setError("Article title is required.");
      return;
    }

    if (!category.trim()) {
      setError("Category is required.");
      return;
    }

    if (!currentContent.trim() || currentContent === "<p><br></p>") {
      setError("Article content cannot be empty.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        title: title.trim(),
        slug: slug.trim(),
        category,
        content: currentContent,
        excerpt: excerpt.trim(),
        featuredImage,
        readDuration,
        author,
        status,
        publishedAt: new Date(publishedAt).toISOString(),
        metaTitle: metaTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim() || excerpt.trim(),
        metaKeywords: metaKeywords.trim(),
      };

      const url = isNew ? "/api/blogs" : `/api/blogs/${blogId}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Failed to save blog article.");
        setSaving(false);
        return;
      }

      setSuccessMsg(isNew ? "Article published successfully!" : "Article updated successfully!");
      setTimeout(() => {
        router.push("/admin/blogs");
        router.refresh();
      }, 1200);
    } catch (err) {
      console.error("Save blog error:", err);
      setError("A connection error occurred. Please try again.");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-[#5C6051] flex flex-col items-center justify-center gap-3">
        <div className="w-6 h-6 border-2 border-[#1F2922] border-t-transparent rounded-full animate-spin" />
        <span className="text-[14px] font-medium">Loading article editor...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E8D8]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/blogs")}
            className="p-2.5 rounded-xl bg-white hover:bg-[#FAF9F5] text-[#1F2922] border border-[#E5E8D8] transition-colors cursor-pointer shadow-xs"
            title="Back to blogs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-serif text-[26px] sm:text-[30px] font-normal text-[#1F2922] tracking-tight">
              {isNew ? "Create New Article" : "Edit Article"}
            </h1>
            <p className="text-[13px] text-[#5C6051]">
              {isNew ? "Draft and format a new insight" : `Editing: ${title}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/blogs")}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF9F5] text-[#5C6051] hover:text-[#1F2922] border border-[#E5E8D8] text-[13.5px] font-medium transition-colors cursor-pointer shadow-xs"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#AFEB63] hover:bg-[#9de04e] text-[#1F2922] font-semibold text-[13.5px] px-6 py-2.5 rounded-xl transition-all shadow-sm shadow-[#AFEB63]/20 disabled:opacity-60 cursor-pointer"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-[#1F2922] border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{status === "PUBLISHED" ? "Publish Article" : "Save Draft"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-[13.5px]">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-[13.5px]">
          <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Title & Rich Text Editor */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Article Title */}
          <div className="bg-white border border-[#E5E8D8] rounded-3xl p-6 sm:p-7 shadow-xs">
            <label className="block text-[12px] font-bold text-[#5C6051] uppercase tracking-wider mb-2">
              Article Title *
            </label>
            <input
              type="text"
              placeholder="e.g. The Philosophy of Organic Farmland Living..."
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] font-serif text-[20px] sm:text-[22px] placeholder-[#8C9280] outline-none transition-all"
            />
          </div>

          {/* Featured Image Uploader */}
          <div className="bg-white border border-[#E5E8D8] rounded-3xl p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-[12px] font-bold text-[#5C6051] uppercase tracking-wider">
                Featured Cover Image
              </label>
              <span className="text-[11px] font-semibold text-[#1F2922] bg-[#F3F5ED] px-2.5 py-0.5 rounded-full border border-[#E5E8D8] font-mono">
                Auto WebP Compression
              </span>
            </div>

            {featuredImage ? (
              <div className="relative w-full aspect-[16/8] rounded-2xl overflow-hidden border border-[#E5E8D8] bg-[#FAF9F5] group">
                <Image
                  src={featuredImage}
                  alt={title || "Featured Image"}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFeaturedImage("")}
                    className="px-3.5 py-2 rounded-xl bg-rose-600 text-white text-[12.5px] font-semibold flex items-center gap-1.5 hover:bg-rose-700 transition-colors cursor-pointer shadow-lg"
                  >
                    <X className="w-4 h-4" />
                    <span>Remove Image</span>
                  </button>
                </div>
              </div>
            ) : (
              <label className="border-2 border-dashed border-[#D2D8C0] hover:border-[#1F2922] rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-[#FAF9F5] hover:bg-white transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#AFEB63]/20 text-[#1F2922] flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <span className="text-[14px] font-semibold text-[#1F2922] block">
                    {uploadingImage ? "Processing image with Sharp..." : "Upload Cover Image"}
                  </span>
                  <span className="text-[12px] text-[#5C6051] block mt-1">
                    Supports JPEG, PNG, WEBP (Automatically converted to WebP)
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Rich Text Editor Section */}
          <div className="bg-white border border-[#E5E8D8] rounded-3xl p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-[12px] font-bold text-[#5C6051] uppercase tracking-wider">
                Article Body (Rich Text) *
              </label>
              
              <button
                type="button"
                onClick={() => {
                  if (showCodeView && editorRef.current) {
                    editorRef.current.innerHTML = content;
                  }
                  setShowCodeView(!showCodeView);
                }}
                className="text-[12px] font-semibold text-[#1F2922] hover:text-[#B3482B] bg-[#F3F5ED] hover:bg-[#E5E8D8] px-3 py-1 rounded-lg border border-[#E5E8D8] flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Code className="w-3.5 h-3.5" />
                <span>{showCodeView ? "Switch to Visual Editor" : "Switch to Raw HTML"}</span>
              </button>
            </div>

            {/* Formatting Toolbar */}
            {!showCodeView && (
              <div className="flex flex-wrap items-center gap-1 p-2 bg-[#F3F5ED] border border-[#E5E8D8] rounded-2xl mb-4 text-[#5C6051]">
                {/* Bold */}
                <button
                  type="button"
                  onClick={() => executeCommand("bold")}
                  className="p-2 rounded-lg hover:bg-white hover:text-[#1F2922] hover:shadow-xs transition-colors cursor-pointer"
                  title="Bold (Ctrl+B)"
                >
                  <Bold className="w-4 h-4" />
                </button>

                {/* Italic */}
                <button
                  type="button"
                  onClick={() => executeCommand("italic")}
                  className="p-2 rounded-lg hover:bg-white hover:text-[#1F2922] hover:shadow-xs transition-colors cursor-pointer"
                  title="Italic (Ctrl+I)"
                >
                  <Italic className="w-4 h-4" />
                </button>

                {/* Underline */}
                <button
                  type="button"
                  onClick={() => executeCommand("underline")}
                  className="p-2 rounded-lg hover:bg-white hover:text-[#1F2922] hover:shadow-xs transition-colors cursor-pointer"
                  title="Underline (Ctrl+U)"
                >
                  <Underline className="w-4 h-4" />
                </button>

                {/* Strikethrough */}
                <button
                  type="button"
                  onClick={() => executeCommand("strikeThrough")}
                  className="p-2 rounded-lg hover:bg-white hover:text-[#1F2922] hover:shadow-xs transition-colors cursor-pointer"
                  title="Strikethrough"
                >
                  <Strikethrough className="w-4 h-4" />
                </button>

                <div className="w-[1px] h-5 bg-[#D2D8C0] mx-1" />

                {/* Heading 2 */}
                <button
                  type="button"
                  onClick={() => executeCommand("formatBlock", "h2")}
                  className="p-2 rounded-lg hover:bg-white hover:text-[#1F2922] hover:shadow-xs transition-colors cursor-pointer font-bold text-xs"
                  title="Heading 2"
                >
                  <Heading2 className="w-4 h-4" />
                </button>

                {/* Heading 3 */}
                <button
                  type="button"
                  onClick={() => executeCommand("formatBlock", "h3")}
                  className="p-2 rounded-lg hover:bg-white hover:text-[#1F2922] hover:shadow-xs transition-colors cursor-pointer font-bold text-xs"
                  title="Heading 3"
                >
                  <Heading3 className="w-4 h-4" />
                </button>

                <div className="w-[1px] h-5 bg-[#D2D8C0] mx-1" />

                {/* Unordered List */}
                <button
                  type="button"
                  onClick={() => executeCommand("insertUnorderedList")}
                  className="p-2 rounded-lg hover:bg-white hover:text-[#1F2922] hover:shadow-xs transition-colors cursor-pointer"
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </button>

                {/* Ordered List */}
                <button
                  type="button"
                  onClick={() => executeCommand("insertOrderedList")}
                  className="p-2 rounded-lg hover:bg-white hover:text-[#1F2922] hover:shadow-xs transition-colors cursor-pointer"
                  title="Numbered List"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>

                {/* Blockquote */}
                <button
                  type="button"
                  onClick={() => executeCommand("formatBlock", "blockquote")}
                  className="p-2 rounded-lg hover:bg-white hover:text-[#1F2922] hover:shadow-xs transition-colors cursor-pointer"
                  title="Blockquote"
                >
                  <Quote className="w-4 h-4" />
                </button>

                <div className="w-[1px] h-5 bg-[#D2D8C0] mx-1" />

                {/* Link */}
                <button
                  type="button"
                  onClick={handleInsertLink}
                  className="p-2 rounded-lg hover:bg-white hover:text-[#1F2922] hover:shadow-xs transition-colors cursor-pointer"
                  title="Insert Link"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>

                {/* Divider */}
                <button
                  type="button"
                  onClick={() => executeCommand("insertHorizontalRule")}
                  className="p-2 rounded-lg hover:bg-white hover:text-[#1F2922] hover:shadow-xs transition-colors cursor-pointer"
                  title="Horizontal Divider"
                >
                  <Minus className="w-4 h-4" />
                </button>

                {/* Clear Formatting */}
                <button
                  type="button"
                  onClick={() => executeCommand("removeFormat")}
                  className="p-2 rounded-lg hover:bg-white hover:text-[#1F2922] hover:shadow-xs transition-colors cursor-pointer"
                  title="Clear Formatting"
                >
                  <RemoveFormatting className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Content Area */}
            {showCodeView ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={16}
                placeholder="<p>Write your raw HTML here...</p>"
                className="w-full p-4 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-2xl text-[#1F2922] font-mono text-[13.5px] outline-none leading-relaxed"
              />
            ) : (
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorInput}
                className="w-full min-h-[400px] p-5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-2xl text-[#1F2922] outline-none leading-[1.8] text-[15px] font-sans overflow-y-auto selection:bg-[#AFEB63] selection:text-[#1F2922]"
                style={{
                  minHeight: "400px",
                }}
              />
            )}

            {/* Word count and estimated read time */}
            <div className="flex items-center justify-between text-[12px] text-[#5C6051] mt-3 px-1 font-mono">
              <span>{content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length} Words</span>
              <span className="font-bold text-[#1F2922]">{readDuration}</span>
            </div>
          </div>

          {/* Article Excerpt */}
          <div className="bg-white border border-[#E5E8D8] rounded-3xl p-6 sm:p-7 shadow-xs">
            <label className="block text-[12px] font-bold text-[#5C6051] uppercase tracking-wider mb-2">
              Short Excerpt / Preview Summary
            </label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief 1-2 sentence overview for cards and meta descriptions..."
              className="w-full p-3.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] text-[13.5px] placeholder-[#8C9280] outline-none transition-all leading-relaxed"
            />
          </div>

        </div>

        {/* Right Column: Settings & Metadata */}
        <div className="space-y-6">
          
          {/* Publication Settings */}
          <div className="bg-white border border-[#E5E8D8] rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
            <h3 className="font-serif text-[18px] text-[#1F2922] font-normal mb-2">
              Publishing Settings
            </h3>

            {/* Status */}
            <div>
              <label className="block text-[12px] font-semibold text-[#5C6051] mb-2">
                Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus("PUBLISHED")}
                  className={`py-2.5 px-3 rounded-xl text-[13px] font-semibold border transition-all cursor-pointer ${
                    status === "PUBLISHED"
                      ? "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs"
                      : "bg-[#FAF9F5] border-[#E5E8D8] text-[#5C6051] hover:text-[#1F2922] hover:bg-white"
                  }`}
                >
                  Published
                </button>

                <button
                  type="button"
                  onClick={() => setStatus("DRAFT")}
                  className={`py-2.5 px-3 rounded-xl text-[13px] font-semibold border transition-all cursor-pointer ${
                    status === "DRAFT"
                      ? "bg-amber-50 border-amber-500 text-amber-900 shadow-xs"
                      : "bg-[#FAF9F5] border-[#E5E8D8] text-[#5C6051] hover:text-[#1F2922] hover:bg-white"
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-[12px] font-semibold text-[#5C6051] mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] text-[13.5px] outline-none cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name} className="bg-white text-[#1F2922]">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-[12px] font-semibold text-[#5C6051] mb-2">
                Author Name
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] text-[13.5px] outline-none"
              />
            </div>

            {/* Read Duration */}
            <div>
              <label className="block text-[12px] font-semibold text-[#5C6051] mb-2">
                Read Duration
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5C6051]" />
                <input
                  type="text"
                  value={readDuration}
                  onChange={(e) => setReadDuration(e.target.value)}
                  placeholder="e.g. 5 min read"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] text-[13.5px] outline-none"
                />
              </div>
            </div>

            {/* Published Date */}
            <div>
              <label className="block text-[12px] font-semibold text-[#5C6051] mb-2">
                Publication Date
              </label>
              <input
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] text-[13.5px] outline-none"
              />
            </div>

            {/* URL Slug */}
            <div>
              <label className="block text-[12px] font-semibold text-[#5C6051] mb-2">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="the-philosophy-of-farmland"
                className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] text-[13px] font-mono outline-none"
              />
              <span className="text-[11px] text-[#5C6051] block mt-1">
                /blogs/{slug || "slug-preview"}
              </span>
            </div>

          </div>

          {/* SEO Metadata Box */}
          <div className="bg-white border border-[#E5E8D8] rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
            <h3 className="font-serif text-[18px] text-[#1F2922] font-normal mb-2">
              Search Engine (SEO) Meta
            </h3>

            {/* Meta Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12px] font-semibold text-[#5C6051]">
                  Meta Title
                </label>
                <span className="text-[11px] text-[#5C6051] font-mono">
                  {metaTitle.length}/60
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="SEO Title..."
                className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] text-[13px] outline-none"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12px] font-semibold text-[#5C6051]">
                  Meta Description
                </label>
                <span className="text-[11px] text-[#5C6051] font-mono">
                  {metaDescription.length}/160
                </span>
              </div>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="SEO Description..."
                className="w-full p-3 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] text-[13px] outline-none"
              />
            </div>

            {/* Meta Keywords */}
            <div>
              <label className="block text-[12px] font-semibold text-[#5C6051] mb-1.5">
                Meta Keywords
              </label>
              <input
                type="text"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                placeholder="farmland, aravalli, luxury, nature"
                className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E5E8D8] focus:border-[#1F2922] focus:bg-white rounded-xl text-[#1F2922] text-[13px] outline-none"
              />
            </div>

          </div>

        </div>

      </div>

    </form>
  );
}

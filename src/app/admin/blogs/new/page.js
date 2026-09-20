import React from "react";
import BlogEditorForm from "@/components/admin/BlogEditorForm";

export const metadata = {
  title: "New Blog Article | Nirvaana Hills Admin",
};

export default function NewBlogPage() {
  return <BlogEditorForm isNew={true} />;
}

import React from "react";
import BlogEditorForm from "@/components/admin/BlogEditorForm";

export const metadata = {
  title: "Edit Blog Article | Nirvaana Hills Admin",
};

export default async function EditBlogPage({ params }) {
  const { id } = await params;
  return <BlogEditorForm isNew={false} blogId={id} />;
}

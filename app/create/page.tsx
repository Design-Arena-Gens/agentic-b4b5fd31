"use client";
import { PostForm } from "../../components/PostForm";

export default function CreatePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Create a post</h1>
      <PostForm />
    </div>
  );
}

"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getStore } from "../../../lib/storage";
import { PostCard } from "../../../components/PostCard";
import { CommentThread } from "../../../components/CommentThread";

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const [post, setPost] = useState(() => getStore().posts.find((p) => p.id === id));

  useEffect(() => {
    setPost(getStore().posts.find((p) => p.id === id));
  }, [id]);

  if (!post) return <div className="card p-6">Post not found.</div>;

  return (
    <div className="space-y-4">
      <PostCard post={post} />
      <CommentThread postId={post.id} />
    </div>
  );
}

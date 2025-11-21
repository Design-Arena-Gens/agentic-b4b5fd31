"use client";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getStore } from "../../../lib/storage";
import { PostCard } from "../../../components/PostCard";
import { CommunityPicker } from "../../../components/CommunityPicker";
import Link from "next/link";

export default function CommunityPage() {
  const params = useParams<{ community: string }>();
  const community = decodeURIComponent(params?.community as string);
  const [posts, setPosts] = useState(() => getStore().posts.filter((p) => p.community === community));

  useEffect(() => {
    setPosts(getStore().posts.filter((p) => p.community === community));
  }, [community]);

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_260px]">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">r/{community}</h1>
          <Link className="btn" href={`/create`}>
            Create Post
          </Link>
        </div>
        {posts
          .sort((a, b) => b.votes - a.votes || b.createdAt - a.createdAt)
          .map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        {posts.length === 0 && <div className="card p-6 text-sm text-muted">No posts yet.</div>}
      </div>
      <div className="space-y-3">
        <CommunityPicker current={community} />
      </div>
    </div>
  );
}

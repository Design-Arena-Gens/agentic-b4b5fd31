"use client";
import { useEffect, useMemo, useState } from "react";
import { PostCard } from "../components/PostCard";
import { getStore, ensureSeed } from "../lib/storage";
import { CommunityPicker } from "../components/CommunityPicker";

export default function HomePage() {
  const [sort, setSort] = useState<"top" | "new">("top");
  const [q, setQ] = useState("");
  const [posts, setPosts] = useState(getStore().posts);

  useEffect(() => {
    ensureSeed();
    setPosts(getStore().posts);
  }, []);

  const filtered = useMemo(() => {
    let arr = [...posts];
    if (q.trim()) {
      const s = q.toLowerCase();
      arr = arr.filter((p) => p.title.toLowerCase().includes(s) || p.body.toLowerCase().includes(s));
    }
    if (sort === "top") arr.sort((a, b) => b.votes - a.votes || b.createdAt - a.createdAt);
    else arr.sort((a, b) => b.createdAt - a.createdAt);
    return arr;
  }, [posts, sort, q]);

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_260px]">
      <div className="space-y-3">
        <div className="card flex items-center gap-3 p-3">
          <input className="input flex-1" placeholder="Search posts" value={q} onChange={(e) => setQ(e.target.value)} />
          <select className="input w-36" value={sort} onChange={(e) => setSort(e.target.value as any)}>
            <option value="top">Top</option>
            <option value="new">New</option>
          </select>
        </div>

        {filtered.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}

        {filtered.length === 0 && (
          <div className="card p-6 text-center text-sm text-muted">No posts found.</div>
        )}
      </div>

      <div className="space-y-3">
        <CommunityPicker />
        <div className="card p-3 text-sm text-muted">
          Your data is saved locally in your browser.
        </div>
      </div>
    </div>
  );
}

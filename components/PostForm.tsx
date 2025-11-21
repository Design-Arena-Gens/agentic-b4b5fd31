"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getStore, setStore, ensureSeed } from "../lib/storage";

export function PostForm({ defaultCommunity }: { defaultCommunity?: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [community, setCommunity] = useState(defaultCommunity ?? "general");
  const store = useMemo(() => getStore(), []);

  useEffect(() => {
    ensureSeed();
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const s = getStore();
    if (!s.communities.includes(community)) s.communities.push(community);
    const id = crypto.randomUUID();
    s.posts.unshift({ id, title: title.trim(), body: body.trim(), community, createdAt: Date.now(), votes: 1 });
    setStore(s);
    router.push(`/p/${id}`);
  };

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Community</label>
        <input
          className="input"
          placeholder="e.g. webdev"
          value={community}
          onChange={(e) => setCommunity(e.target.value.replace(/\s+/g, ""))}
        />
        <p className="mt-1 text-xs text-muted">Do not include the r/ prefix</p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Title</label>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={140} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Body</label>
        <textarea className="input min-h-[120px]" value={body} onChange={(e) => setBody(e.target.value)} />
      </div>

      <div className="flex items-center justify-end gap-2">
        <button type="button" className="rounded-md px-3 py-1.5 text-sm hover:bg-gray-100" onClick={() => router.back()}>
          Cancel
        </button>
        <button className="btn" type="submit">Post</button>
      </div>
    </form>
  );
}

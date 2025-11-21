"use client";
import { useEffect, useMemo, useState } from "react";
import { getStore, setStore } from "../lib/storage";
import { formatDistanceToNow } from "date-fns";

export type Comment = {
  id: string;
  postId: string;
  parentId?: string;
  body: string;
  createdAt: number;
};

export function CommentThread({ postId }: { postId: string }) {
  const [body, setBody] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const refresh = () => {
    const s = getStore();
    setComments(s.comments.filter((c) => c.postId === postId));
  };

  useEffect(() => {
    refresh();
  }, [postId]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    const s = getStore();
    s.comments.push({ id: crypto.randomUUID(), postId, body: body.trim(), createdAt: Date.now() });
    setStore(s);
    setBody("");
    refresh();
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3 text-sm font-semibold">Comments</h3>
      <form onSubmit={onSubmit} className="mb-4 space-y-2">
        <textarea className="input min-h-[80px]" placeholder="What are your thoughts?" value={body} onChange={(e) => setBody(e.target.value)} />
        <div className="flex justify-end">
          <button className="btn" type="submit">Comment</button>
        </div>
      </form>

      <div className="space-y-3">
        {comments.length === 0 && <div className="text-sm text-muted">Be the first to comment.</div>}
        {comments
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((c) => (
            <div key={c.id} className="rounded-md border border-gray-200 bg-white p-3">
              <div className="mb-1 text-xs text-muted">{formatDistanceToNow(c.createdAt)} ago</div>
              <div className="whitespace-pre-wrap text-sm text-gray-800">{c.body}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

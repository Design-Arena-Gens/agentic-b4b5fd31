"use client";
import { useEffect, useState } from "react";
import { getStore, setStore } from "../lib/storage";

export function VoteButtons({ postId, votes }: { postId: string; votes: number }) {
  const [count, setCount] = useState(votes);

  useEffect(() => setCount(votes), [votes]);

  const handle = (delta: number) => {
    const store = getStore();
    const post = store.posts.find((p) => p.id === postId);
    if (!post) return;
    post.votes += delta;
    setCount(post.votes);
    setStore(store);
  };

  return (
    <div className="flex w-14 flex-col items-center gap-1 rounded-md bg-gray-50 p-2 text-sm">
      <button
        aria-label="Upvote"
        className="rounded p-1 hover:bg-gray-200"
        onClick={() => handle(1)}
      >
        ?
      </button>
      <div className="font-semibold">{count}</div>
      <button
        aria-label="Downvote"
        className="rounded p-1 hover:bg-gray-200"
        onClick={() => handle(-1)}
      >
        ?
      </button>
    </div>
  );
}

"use client";
import Link from "next/link";
import { getStore } from "../lib/storage";
import { useEffect, useState } from "react";

export function CommunityPicker({ current }: { current?: string }) {
  const [communities, setCommunities] = useState<string[]>([]);
  useEffect(() => setCommunities(getStore().communities), []);

  return (
    <div className="card p-3">
      <div className="mb-2 text-sm font-semibold">Communities</div>
      <div className="flex flex-wrap gap-2">
        {communities.map((c) => (
          <Link key={c} href={`/r/${encodeURIComponent(c)}`} className={`rounded-full border px-3 py-1 text-sm hover:bg-gray-50 ${current===c?"bg-gray-100 border-gray-300":"border-gray-200"}`}>
            r/{c}
          </Link>
        ))}
      </div>
    </div>
  );
}

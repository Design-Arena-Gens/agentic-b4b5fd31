"use client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { VoteButtons } from "./VoteButtons";

export type Post = {
  id: string;
  title: string;
  body: string;
  community: string;
  createdAt: number;
  votes: number;
};

export function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  return (
    <div className="card p-4">
      <div className="flex items-start gap-4">
        <VoteButtons postId={post.id} votes={post.votes} />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2 text-sm text-muted">
            <Link href={`/r/${encodeURIComponent(post.community)}`} className="font-medium text-gray-700 hover:underline">
              r/{post.community}
            </Link>
            <span>?</span>
            <span>{formatDistanceToNow(post.createdAt)} ago</span>
          </div>
          <Link href={`/p/${post.id}`} className="block">
            <h2 className="truncate text-lg font-semibold">{post.title}</h2>
          </Link>
          {!compact && (
            <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700">
              {post.body.length > 280 ? post.body.slice(0, 280) + "?" : post.body}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

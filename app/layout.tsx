"use client";
import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <div className="container mx-auto flex items-center gap-4 px-4 py-3">
            <Link href="/" className="text-xl font-bold text-orange-600">
              redditish
            </Link>
            <nav className="ml-auto flex items-center gap-3">
              <Link className="btn" href="/create">
                Create Post
              </Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto max-w-3xl px-4 py-6">{children}</main>
        <footer className="border-t bg-white">
          <div className="container mx-auto px-4 py-6 text-sm text-muted">
            Built with Next.js and Tailwind CSS
          </div>
        </footer>
      </body>
    </html>
  );
}

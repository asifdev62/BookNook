
"use client";

import Link from "next/link";
import { BookOpen, Home, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE3] px-6 py-16">

      {/* Background Decoration */}
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#C59D5F]/15 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#8B6B45]/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">

        {/* Book Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-[#2D241E] text-[#E4C18A] shadow-xl shadow-[#2D241E]/20">
          <BookOpen size={45} strokeWidth={1.5} />
        </div>

        {/* 404 */}
        <h1 className="bg-gradient-to-r from-[#8B6B45] via-[#C59D5F] to-[#A47C48] bg-clip-text text-[110px] font-black leading-none tracking-tight text-transparent sm:text-[150px]">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-[#2D241E] sm:text-4xl">
          Oops! This Page Is Missing
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#796B5D] sm:text-base">
          Looks like this page has gone on a little reading adventure.
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>

        {/* Buttons */}
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link
            href="/"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#2D241E] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2D241E]/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#49392C] hover:shadow-xl sm:w-auto"
          >
            <Home size={18} />
            Back to Home
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/books"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#C59D5F]/40 bg-white/80 px-7 py-3.5 text-sm font-semibold text-[#8B6B45] transition-all duration-300 hover:-translate-y-1 hover:border-[#C59D5F] hover:bg-[#FDF8F3] sm:w-auto"
          >
            <Search size={18} />
            Explore Books
          </Link>

        </div>

        {/* Footer Text */}
        <div className="mt-14 flex items-center justify-center gap-2 text-xs font-medium text-[#9B8B78]">
          <BookOpen size={15} />
          <span>Lost in the pages? Let&apos;s find your next chapter.</span>
        </div>

      </div>
    </main>
  );
}
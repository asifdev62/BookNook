import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE3] px-6">

      {/* Background Decoration */}
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#C59D5F]/15 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#8B6B45]/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Animated Book Icon */}
        <div className="relative mb-7 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#2D241E] text-[#E4C18A] shadow-xl shadow-[#2D241E]/20 animate-pulse">
          <BookOpen size={38} strokeWidth={1.5} />

          {/* Rotating Circle */}
          <div className="absolute -inset-2 rounded-3xl border-2 border-dashed border-[#C59D5F]/60 animate-spin [animation-duration:8s]" />
        </div>

        {/* Brand Name */}
        <h2 className="text-2xl font-bold tracking-tight text-[#2D241E]">
          Book<span className="text-[#C59D5F]">Nook</span>
        </h2>

        {/* Loading Text */}
        <p className="mt-3 text-sm font-medium text-[#796B5D]">
          Preparing your reading experience...
        </p>

        {/* Progress Bar */}
        <div className="mt-7 h-1.5 w-48 overflow-hidden rounded-full bg-[#E9DFD2]">
          <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#8B6B45] to-[#C59D5F] animate-loading" />
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-[#9B8B78]">
          Every great story begins with a little patience.
        </p>

      </div>
    </main>
  );
}
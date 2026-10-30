
import Link from "next/link";
import { BookOpen } from "lucide-react";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export default function AuthShell({
  eyebrow,
  title,
  description,
  footer,
  children,
}: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B141A] px-4 py-6 sm:px-6">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#1C6656]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#D6A85F]/10 blur-3xl" />

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#172A35] shadow-[0_25px_80px_rgba(0,0,0,0.4)]">

        {/* Top Decorative Line */}
        <div className="h-1 w-full bg-gradient-to-r from-[#1C6656] via-[#D6A85F] to-[#1C6656]" />

        <div className="p-5 sm:p-7">

          {/* Logo */}
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-2"
          >
            <BookOpen size={24} className="text-[#D6A85F]" />

            <span className="font-serif text-xl font-bold text-white">
              Book<span className="text-[#D6A85F]">Nook</span>
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-5">
            <p className="mb-2 text-xs font-bold tracking-[0.25em] text-[#D6A85F]">
              {eyebrow}
            </p>

            <h1 className="font-serif text-2xl font-bold leading-tight text-white sm:text-3xl">
              {title}
            </h1>

            <p className="mt-2 text-sm leading-5 text-[#B8C9D2]">
              {description}
            </p>
          </div>

          {/* Form */}
          {children}

          {/* Footer */}
          <div className="mt-5 text-center text-sm leading-5 text-[#B8C9D2]">
            {footer}
          </div>

        </div>
      </div>
    </main>
  );
}
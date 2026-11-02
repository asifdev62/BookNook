import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  message: string;
  buttonText?: string;
  href?: string;
}

export default function EmptyState({
  icon,
  title,
  message,
  buttonText,
  href,
}: EmptyStateProps) {
  return (
    <div className="mx-auto max-w-md border border-[#E8E1D5] bg-[#FAF9F6] px-5 py-10 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="mx-auto flex h-16 w-16 items-center justify-center bg-[#C59D5F]/10 text-[#C59D5F] [&>svg]:h-[30px] [&>svg]:w-[30px]">
        {icon}
      </div>

      <h2 className="mt-4 font-serif text-xl font-bold">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
        {message}
      </p>

      {buttonText && href && (
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-2 bg-[#172A3A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C59D5F]"
        >
          {buttonText}
          <ArrowUpRight size={17} />
        </Link>
      )}
    </div>
  );
}

import Link from "next/link";
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
    <div className="w-full border border-dashed border-brass/50 bg-ink px-6 py-14 text-center sm:px-8 sm:py-16">
      <div className="mx-auto flex h-16 w-16 items-center justify-center bg-brass/10 text-brass [&>svg]:h-8 [&>svg]:w-8">
        {icon}
      </div>

      <h2 className="mt-5 font-serif text-xl font-bold text-cream sm:text-2xl">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-cream-muted">
        {message}
      </p>

      {buttonText && href && (
        <Link
          href={href}
          className="mt-6 inline-flex items-center justify-center bg-brass px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brass-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}


import Link from "next/link";
import {
  BookOpen,
  Library,
  Sparkles,
  RefreshCw,
  Search,
} from "lucide-react";

import { API_URL } from "@/app/lib/api";
import BookCard from "./BookCard";
import CategoryFilter from "./CategoryFilter";

interface Book {
  _id: string;
  bookName: string;
  author: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  publishedYear: number;
  availableCopies: number;
  isNewArrival: boolean;
}

interface AllBooksPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

async function getCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function getBooks(
  category?: string
): Promise<{ books: Book[]; error: string }> {
  try {
    const url = category
      ? `${API_URL}/book?category=${encodeURIComponent(category)}`
      : `${API_URL}/book`;

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        books: [],
        error: "Unable to load books. Please try again.",
      };
    }

    const data = await res.json();

    return {
      books: Array.isArray(data) ? data : [],
      error: "",
    };
  } catch {
    return {
      books: [],
      error: "Could not connect to the server.",
    };
  }
}

const AllBooksPage = async ({
  searchParams,
}: AllBooksPageProps) => {
  const { category } = await searchParams;

  const { books, error } = await getBooks(category);
  const categories = await getCategories();

  const availableBooks = books.filter(
    (book) => book.availableCopies > 0
  ).length;

  return (
    <main className="min-h-screen bg-[#FAF8F4] dark:bg-[#172A3A] p-10">

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#172A3A]/5 bg-white dark:border-white/10 dark:bg-[#1C3548]">
        <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full border border-[#C59D5F]/20" />
        <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full border border-[#C59D5F]/20" />

        <div className="pointer-events-none absolute right-10 top-8 h-40 w-40 rounded-full bg-[#C59D5F]/10 blur-[70px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-10 md:py-8">
          <div className="max-w-3xl">

            <div className="mb-3 inline-flex items-center gap-2 border border-[#C59D5F]/40 bg-[#C59D5F]/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#A47C3D] dark:text-[#D9B77B]">
              <Sparkles size={12} className="text-[#C59D5F]" />
              Explore Our Collection
              <span className="ml-1 h-1.5 w-1.5 rounded-full bg-[#C59D5F]" />
            </div>

            <h1 className="font-serif text-2xl font-bold leading-tight tracking-tight text-[#172A3A] dark:text-white sm:text-3xl md:text-4xl">
              Every Book Opens
              <span className="relative mt-1 block w-fit text-[#C59D5F]">
                A New World.
                <span className="absolute -bottom-1 left-0 h-[2px] w-2/3 bg-gradient-to-r from-[#C59D5F] to-transparent" />
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-xs leading-6 text-[#172A3A]/65 dark:text-[#D5D9DC] sm:text-sm">
              Discover stories that inspire, knowledge that empowers,
              and adventures waiting between the pages. Find your next
              favorite book at BookNook.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">

              <div className="group flex min-w-[145px] items-center gap-3 border border-[#172A3A]/10 bg-[#172A3A]/[0.03] px-3 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C59D5F]/50 dark:border-white/10 dark:bg-white/[0.06]">
                <div className="flex h-9 w-9 items-center justify-center bg-[#C59D5F]/15 text-[#C59D5F] transition-colors group-hover:bg-[#C59D5F] group-hover:text-[#172A3A]">
                  <Library size={18} />
                </div>

                <div>
                  <p className="text-lg font-bold text-[#172A3A] dark:text-white">
                    {books.length}
                  </p>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Total Books
                  </p>
                </div>
              </div>

              <div className="group flex min-w-[155px] items-center gap-3 border border-[#172A3A]/10 bg-[#172A3A]/[0.03] px-3 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C59D5F]/50 dark:border-white/10 dark:bg-white/[0.06]">
                <div className="flex h-9 w-9 items-center justify-center bg-[#C59D5F]/15 text-[#C59D5F] transition-colors group-hover:bg-[#C59D5F] group-hover:text-[#172A3A]">
                  <BookOpen size={18} />
                </div>

                <div>
                  <p className="text-lg font-bold text-[#172A3A] dark:text-white">
                    {availableBooks}
                  </p>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Available Books
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-5 flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.2em] text-[#172A3A]/40 dark:text-white/40">
              <span className="h-px w-7 bg-[#C59D5F]/60" />
              Read. Discover. Repeat.
            </div>

          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-10 md:py-10">

        <div className="mb-7 flex flex-col justify-between gap-4 border-b border-[#E8E1D5] pb-5 dark:border-white/10 sm:flex-row sm:items-end">

          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B18A4A]">
              <span className="h-px w-7 bg-[#C59D5F]" />
              The Book Collection
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#172A3A] dark:text-white sm:text-3xl">
              {category ? `${category} Books` : "All Books"}
            </h2>

            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
              Find the perfect book for your next reading journey.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

            <CategoryFilter categories={categories} />

            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <BookOpen size={16} className="text-[#C59D5F]" />
              Showing{" "}
              <span className="font-bold text-[#172A3A] dark:text-white">
                {books.length}
              </span>{" "}
              books
            </div>

          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="border border-red-200 bg-white px-5 py-12 text-center dark:border-red-400/20 dark:bg-[#1C3548]">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center bg-red-50 text-red-500 dark:bg-red-500/10">
              <RefreshCw size={24} />
            </div>

            <h3 className="font-serif text-xl font-bold text-[#172A3A] dark:text-white">
              Something Went Wrong
            </h3>

            <p className="mx-auto mt-2 max-w-md text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
              {error}
            </p>

            <Link
              href="/books"
              className="mt-5 inline-flex items-center gap-2 bg-[#172A3A] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#C59D5F] dark:bg-[#C59D5F] dark:text-[#172A3A]"
            >
              <RefreshCw size={15} />
              Try Again
            </Link>
          </div>
        )}

        {/* Empty State */}
        {!error && books.length === 0 && (
          <div className="border border-[#E8E1D5] bg-white px-5 py-14 text-center dark:border-white/10 dark:bg-[#1C3548]">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center bg-[#F5F0E8] text-[#C59D5F] dark:bg-[#C59D5F]/10">
              <Search size={28} />
            </div>

            <h3 className="font-serif text-xl font-bold text-[#172A3A] dark:text-white">
              No Books Found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-gray-500 dark:text-gray-400 sm:text-sm">
              {category
                ? `No books found in ${category} category. Try another category.`
                : "Our collection is currently empty. Please check back later for new books and exciting discoveries."}
            </p>
          </div>
        )}

        {/* Books Grid */}
        {!error && books.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

      </section>

      {/* Bottom Quote Section */}


<section className="relative mx-auto max-w-5xl overflow-hidden border-t border-[#E8E1D5] bg-[#F5F0E8] my-15">
  {/* Decorative Circles */}
  <div className="pointer-events-none absolute -left-8 -top-10 h-24 w-24 rounded-full border border-[#C59D5F]/20" />
  <div className="pointer-events-none absolute -left-4 -top-5 h-14 w-14 rounded-full border border-[#C59D5F]/20" />
  <div className="pointer-events-none absolute -bottom-10 -right-7 h-24 w-24 rounded-full border border-[#C59D5F]/20" />

  <div className="relative mx-auto max-w-xl px-3 py-10 text-center sm:px-4 md:py-12">
    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center border border-[#C59D5F]/30 bg-[#C59D5F]/10 text-[#C59D5F]">
      <BookOpen size={16} strokeWidth={1.5} />
    </div>

    <p className="mb-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#B18A4A]">
      A Thought for Every Reader
    </p>

    <blockquote className="mx-auto max-w-sm font-serif text-base italic leading-relaxed text-[#172A3A] sm:text-lg">
      &ldquo;A book is a dream that you hold in your hands.&rdquo;
    </blockquote>

    <div className="mx-auto mt-3 flex items-center justify-center gap-2">
      <span className="h-px w-6 bg-[#C59D5F]/50" />
      <span className="h-1.5 w-1.5 rounded-full bg-[#C59D5F]" />
      <span className="h-px w-6 bg-[#C59D5F]/50" />
    </div>

    <p className="mt-3 text-[8px] font-bold uppercase tracking-[0.18em] text-[#B18A4A]">
      Discover <span className="mx-1">·</span> Read{" "}
      <span className="mx-1">·</span> Grow
    </p>
  </div>
</section>

    </main>
  );
};

export default AllBooksPage;






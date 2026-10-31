
import React from "react";

import { BookOpen, Library, Sparkles, RefreshCw, Search } from "lucide-react";
import BookCard from "./BookCard";

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

async function getBooks(): Promise<{ books: Book[]; error: string }> {
  try {
    const res = await fetch("http://localhost:5000/book", {
      cache: "no-store",
    });

    if (!res.ok) {
      return { books: [], error: "Unable to load books. Please try again." };
    }

    const data = await res.json();
    return { books: Array.isArray(data) ? data : [], error: "" };
  } catch {
    return { books: [], error: "Could not connect to the server." };
  }
}

const AllBooksPage = async () => {
  const { books, error } = await getBooks();

  return (
    <main className="min-h-screen bg-[#FAF8F4]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#172A3A]">
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border border-[#C59D5F]/20" />
        <div className="absolute -right-10 -top-20 h-60 w-60 rounded-full border border-[#C59D5F]/20" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/5" />
        <div className="pointer-events-none absolute right-10 top-10 h-64 w-64 rounded-full bg-[#C59D5F]/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-[#C59D5F]/10 blur-[80px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-8">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 border border-[#C59D5F]/40 bg-[#C59D5F]/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D9B77B] shadow-lg shadow-black/10">
              <Sparkles size={15} className="text-[#C59D5F]" />
              Explore Our Collection
              <span className="ml-1 h-1.5 w-1.5 rounded-full bg-[#C59D5F]" />
            </div>

            <h1 className="font-serif text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl">
              Every Book Opens
              <span className="relative mt-2 block w-fit text-[#C59D5F]">
                A New World.
                <span className="absolute -bottom-2 left-0 h-[3px] w-2/3 bg-gradient-to-r from-[#C59D5F] to-transparent" />
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-8 text-[#D5D9DC] sm:text-base">
              Discover stories that inspire, knowledge that empowers, and
              adventures waiting between the pages. Find your next favorite
              book at BookNook.
            </p>

            {/* Statistics */}
            <div className="mt-10 flex flex-wrap gap-4">
              <div className="group flex min-w-[175px] items-center gap-4 border border-white/10 bg-white/[0.06] px-5 py-4 shadow-xl shadow-black/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#C59D5F]/50 hover:bg-white/[0.09]">
                <div className="flex h-12 w-12 items-center justify-center bg-[#C59D5F]/15 text-[#C59D5F] transition-colors duration-300 group-hover:bg-[#C59D5F] group-hover:text-[#172A3A]">
                  <Library size={23} />
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-wide text-white">
                    {books.length}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                    Total Books
                  </p>
                </div>
              </div>

              <div className="group flex min-w-[190px] items-center gap-4 border border-white/10 bg-white/[0.06] px-5 py-4 shadow-xl shadow-black/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#C59D5F]/50 hover:bg-white/[0.09]">
                <div className="flex h-12 w-12 items-center justify-center bg-[#C59D5F]/15 text-[#C59D5F] transition-colors duration-300 group-hover:bg-[#C59D5F] group-hover:text-[#172A3A]">
                  <BookOpen size={23} />
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-wide text-white">
                    {books.filter((book) => book.availableCopies > 0).length}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                    Available Titles
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
              <span className="h-px w-10 bg-[#C59D5F]/60" />
              Read. Discover. Repeat.
            </div>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-[#E8E1D5] pb-7 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B18A4A]">
              <span className="h-px w-8 bg-[#C59D5F]" />
              The Book Collection
            </div>

            <h2 className="font-serif text-3xl font-bold text-[#172A3A] sm:text-4xl">
              All Books
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Find the perfect book for your next reading journey.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <BookOpen size={17} className="text-[#C59D5F]" />
            Showing{" "}
            <span className="font-bold text-[#172A3A]">{books.length}</span>{" "}
            books
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="border border-red-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center bg-red-50 text-red-500">
              <RefreshCw size={28} />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#172A3A]">
              Something Went Wrong
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
              {error}
            </p>

            <a
              href="/books"
              className="mt-7 inline-flex items-center gap-2 bg-[#172A3A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#C59D5F]"
            >
              <RefreshCw size={16} />
              Try Again
            </a>
          </div>
        )}

        {/* Empty State */}
        {!error && books.length === 0 && (
          <div className="border border-[#E8E1D5] bg-white px-6 py-20 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-[#F5F0E8] text-[#C59D5F]">
              <Search size={34} />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#172A3A]">
              No Books Found
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              Our collection is currently empty. Please check back later for
              new books and exciting discoveries.
            </p>
          </div>
        )}

        {/* Books Grid */}
        {!error && books.length > 0 && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </section>

      {/* Bottom Quote Section */}
      <section className="border-t border-[#E8E1D5] bg-[#F5F0E8]">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <BookOpen size={30} className="mx-auto mb-5 text-[#C59D5F]" />

          <p className="font-serif text-2xl italic leading-relaxed text-[#172A3A] sm:text-3xl">
            &ldquo;A book is a dream that you hold in your hands.&rdquo;
          </p>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-[#B18A4A]">
            Discover · Read · Grow
          </p>
        </div>
      </section>
    </main>
  );
};

export default AllBooksPage;
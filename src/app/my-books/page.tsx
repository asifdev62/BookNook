

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import { API_URL } from "@/app/lib/api";
import {
  ArrowUpRight,
  BookOpen,
  Library,
  Search,
  Loader2,
} from "lucide-react";
import { VscCollection } from "react-icons/vsc";
import { toast } from "sonner";
import EmptyState from "@/components/EmptyState";
import EditBook from "./EditBook";
import DeleteBook from "./DeletetBook";

interface Book {
  _id: string;
  bookName: string;
  author: string;
  category: string;
  rating: number;
  image: string;
  description: string;
  publishedYear: number;
  availableCopies: number;
  isNewArrival: boolean;
  userEmail: string;
  userName?: string;
}

export default function MyBooksPage() {
  const { data: session, isPending } = authClient.useSession();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Load My Books
  useEffect(() => {
    if (isPending || !session?.user?.email) return;

    const fetchBooks = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          email: session.user.email,
        });

        const response = await fetch(
          `${API_URL}/my-books?${params}`
        );

        if (!response.ok) {
          throw new Error("Failed to load books");
        }

        const data = await response.json();
        setBooks(data);
      } catch {
        toast.error("Failed to load books!");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [session, isPending]);

  // Search Books
  const filteredBooks = books.filter((book) => {
    const query = search.toLowerCase();

    return (
      book.bookName?.toLowerCase().includes(query) ||
      book.author?.toLowerCase().includes(query) ||
      book.category?.toLowerCase().includes(query)
    );
  });

  // Loading
if (isPending || loading) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#FAF9F6] dark:bg-[#172A3A]">
      <Loader2 className="animate-spin text-[#C59D5F]" size={35} />

      <h3 className="text-sm font-medium text-[#172A3A] dark:text-white">
        Please Wait...
      </h3>
    </div>
  );
}

  // Login Check
  if (!session?.user?.email) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FAF9F6] px-5 text-center dark:bg-[#101C27]">
        <Library className="mb-5 h-14 w-14 text-[#C59D5F]" />

        <h2 className="text-2xl font-bold text-[#172A3A] dark:text-white">
          Please Login First
        </h2>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Log in to view the books you have added.
        </p>
      </div>
    );
  }

  return (
      <main className="min-h-screen bg-[#FAF9F6] text-[#172A3A] dark:bg-[#101C27] dark:text-white">
      <div className="mx-auto max-w-7xl   px-4 py-10  sm:px-6 lg:px-8">

        {/* Header */}
        <section className="relative overflow-hidden border-b border-[#E8E1D5] bg-white dark:border-white/10 dark:bg-[#1C3548]">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#C59D5F]/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
            <div className="text-center">

              <div className="mb-4 inline-flex items-center gap-2 border border-[#C59D5F]/40 bg-[#C59D5F]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#A47B3E] dark:text-[#D9B77C]">
                <Library size={14} />
                Your Personal Library
              </div>

              <h1 className="font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
                My <span className="text-[#C59D5F]">Books</span>
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-500 dark:text-gray-300">
                View and manage all the books you have added to your personal library
                with BookNook.
              </p>

              <div className="mx-auto mt-7 flex w-fit items-center gap-3 border border-[#E8E1D5] bg-[#FAF9F6] px-5 py-3 dark:border-white/10 dark:bg-white/5">
                <BookOpen size={19} className="text-[#C59D5F]" />

                <span className="text-sm font-medium">
                  {books.length} {books.length === 1 ? "Book" : "Books"} Added
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* Search */}
        <div className="mb-7 flex items-center gap-3 border border-gray-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#172A3A]">
          <Search className="h-5 w-5 text-[#C59D5F]" />

          <input
            type="text"
            placeholder="Search by book name, author or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Books Section */}
        <section
          className={`border border-[#E8E1D5] bg-white dark:border-white/10 dark:bg-[#1C3548] ${
            filteredBooks.length === 0
              ? "min-h-[40vh] px-4 py-6 sm:px-6 sm:py-8"
              : "min-h-[55vh] px-5 py-8 sm:px-8 sm:py-10"
          }`}
        >
          <div className="mx-auto max-w-7xl">
            {books.length === 0 ? (
              <EmptyState
                icon={<Library />}
                title="No Books Added Yet"
                message="Add your first book to get started."
                buttonText="Add Your First Book"
                href="/add-book"
              />
            ) : (
              <>
                {/* Section Heading */}
                <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                  <div className="flex flex-col gap-1">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B18A4A]">
                      <VscCollection size={18} />
                      Your Collection
                    </p>

                    <h2 className="font-serif text-2xl font-bold text-[#172A3A] sm:text-3xl dark:text-white">
                      Added Books
                    </h2>
                  </div>

                  <Link
                    href="/books"
                    className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#A47B3E] transition-colors hover:text-[#C59D5F]"
                  >
                    Browse More Books
                    <ArrowUpRight size={16} />
                  </Link>
                </div>

                {/* Table */}
                {filteredBooks.length === 0 ? (
                  <EmptyState
                    icon={<Search />}
                    title="No Books Found"
                    message="Try a different keyword"
                  />
                ) : (
                  <div className="overflow-hidden border border-[#E8E1D5] bg-white shadow-sm dark:border-white/10 dark:bg-[#172A3A]">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[850px] text-left">
                        <thead className="bg-[#F5F0E8] dark:bg-[#213E52]">
                          <tr className="text-xs font-bold uppercase tracking-wider text-[#172A3A] dark:text-gray-200">
                            <th className="px-6 py-5">Book</th>
                            <th className="px-6 py-5">Category</th>
                            <th className="px-6 py-5">Published</th>
                            <th className="px-6 py-5">Copies</th>
                            <th className="px-6 py-5 text-center">Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {filteredBooks.map((book) => (
                            <tr
                              key={book._id}
                              className="border-t border-[#E8E1D5] transition-colors hover:bg-[#FAF9F6] dark:border-white/10 dark:hover:bg-white/5"
                            >
                              <td className="px-6 py-4">
                                <Link
                                  href={`/books/${book._id}`}
                                  className="flex items-center gap-4"
                                >
                                  <div className="relative h-20 w-14 shrink-0 overflow-hidden border border-[#E8E1D5] bg-[#F5F0E8] dark:border-white/10 dark:bg-white/10">
                                    {book.image ? (
                                      <Image
                                        src={book.image}
                                        alt={book.bookName}
                                        fill
                                        sizes="56px"
                                        className="object-contain p-1 transition-transform duration-300 hover:scale-105"
                                      />
                                    ) : (
                                      <BookOpen className="m-auto h-7 w-7" />
                                    )}
                                  </div>

                                  <div>
                                    <h3 className="max-w-[250px] font-serif font-bold transition-colors hover:text-[#C59D5F]">
                                      {book.bookName}
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                      by {book.author}
                                    </p>
                                  </div>
                                </Link>
                              </td>

                              <td className="px-6 py-4">
                                <span className="border border-[#C59D5F]/40 px-3 py-1 text-xs">
                                  {book.category}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                {book.publishedYear}
                              </td>

                              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                {book.availableCopies}
                              </td>

                              {/* Edit and Delete */}
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                  <EditBook
                                    book={book}
                                    email={session.user.email}
                                    onUpdate={(updatedBook: Book) => {
                                      setBooks((previousBooks) =>
                                        previousBooks.map((item) =>
                                          item._id === book._id
                                            ? { ...updatedBook, _id: book._id }
                                            : item
                                        )
                                      );
                                    }}
                                  />

                                  <DeleteBook
                                    book={book}
                                    email={session.user.email}
                                    onDelete={(id: string) => {
                                      setBooks((previousBooks) =>
                                        previousBooks.filter(
                                          (item) => item._id !== id
                                        )
                                      );
                                    }}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Table Footer */}
                    <div className="flex flex-col justify-between gap-2 border-t border-[#E8E1D5] bg-[#FAF9F6] px-6 py-4 text-xs text-gray-500 dark:border-white/10 dark:bg-[#172A3A] dark:text-gray-400 sm:flex-row">
                      <p>
                        Showing {filteredBooks.length} of {books.length} books
                      </p>
                      <p>Thank you for reading with BookNook.</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  Loader2,
  RotateCcw,
  Eye,
  ArrowUpRight,
  Library,
} from "lucide-react";

import { authClient } from "@/app/lib/auth-client";
import { toast } from "sonner";

interface Book {
  _id: string;
  bookId: string;
  bookName: string;
  author: string;
  image: string;
  borrowDate: string;
}

export default function MyBorrowsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState("");

  // Get Borrowed Books
  useEffect(() => {
    if (isPending || !session?.user?.email) return;

    const getBooks = async () => {
      try {
        const email = encodeURIComponent(session.user.email);

        const response = await fetch(
          `http://localhost:5000/my-borrows?email=${email}`
        );

        if (!response.ok) {
          throw new Error("Failed to load books");
        }

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load borrowed books");
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, [session, isPending]);

  // Return Date
  const getReturnDate = (borrowDate: string) => {
    const date = new Date(borrowDate);

    date.setDate(date.getDate() + 7);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Return Book
  const handleReturn = async (book: Book) => {
    const confirmed = window.confirm(
      `Are you sure you want to return "${book.bookName}"?`
    );

    if (!confirmed) return;

    try {
      setReturningId(book._id);

      const response = await fetch(
        "http://localhost:5000/return-book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            borrowId: book._id,
            bookId: book.bookId,
            userEmail: session?.user?.email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Return failed");
      }

      setBooks((previousBooks) =>
        previousBooks.filter((item) => item._id !== book._id)
      );

      toast.success("Book returned successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to return book");
    } finally {
      setReturningId("");
    }
  };

  // Loading
  if (isPending || (session?.user && loading)) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#FAF9F6] dark:bg-[#172A3A]">
        <Loader2
          size={38}
          className="animate-spin text-[#C59D5F]"
        />
      </div>
    );
  }

  // Login Check
  if (!session?.user) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FAF9F6] px-5 dark:bg-[#172A3A]">
        <div className="flex h-20 w-20 items-center justify-center border border-[#C59D5F]/40 bg-[#C59D5F]/10">
          <BookOpen size={38} className="text-[#C59D5F]" />
        </div>

        <h1 className="mt-6 font-serif text-2xl font-bold text-[#172A3A] dark:text-white">
          Please Login First
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Login to see your borrowed books.
        </p>

        <Link
          href="/login"
          className="mt-6 bg-[#172A3A] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C59D5F]"
        >
          Login Now
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#172A3A] dark:bg-[#172A3A] dark:text-white">

      {/* Header */}
      <section className="relative overflow-hidden border-b border-[#E8E1D5] bg-white dark:border-white/10 dark:bg-[#1C3548]">

        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#C59D5F]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">

          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 border border-[#C59D5F]/40 bg-[#C59D5F]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#A47B3E] dark:text-[#D9B77C]">
              <Library size={14} />
              Your Reading Journey
            </div>

            <h1 className="font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
              My <span className="text-[#C59D5F]">Borrows</span>
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-500 dark:text-gray-300">
              Keep track of your borrowed books and manage your reading journey
              with BookNook.
            </p>

            <div className="mx-auto mt-7 flex w-fit items-center gap-3 border border-[#E8E1D5] bg-[#FAF9F6] px-5 py-3 dark:border-white/10 dark:bg-white/5">
              <BookOpen size={19} className="text-[#C59D5F]" />

              <span className="text-sm font-medium">
                {books.length} {books.length === 1 ? "Book" : "Books"} Borrowed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="min-h-[55vh] px-5 py-12 sm:px-8 sm:py-14">

        <div className="mx-auto max-w-7xl">

          {books.length === 0 ? (
            <div className="mx-auto max-w-xl border border-[#E8E1D5] bg-white px-6 py-16 text-center shadow-sm dark:border-white/10 dark:bg-white/5">

              <div className="mx-auto flex h-20 w-20 items-center justify-center bg-[#C59D5F]/10">
                <BookOpen size={38} className="text-[#C59D5F]" />
              </div>

              <h2 className="mt-6 font-serif text-2xl font-bold">
                No Borrowed Books Yet
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
                Your reading journey starts here. Explore our collection and
                borrow your favourite books.
              </p>

              <Link
                href="/books"
                className="mt-7 inline-flex items-center gap-2 bg-[#172A3A] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#C59D5F]"
              >
                Explore Books
                <ArrowUpRight size={17} />
              </Link>
            </div>
          ) : (
            <>

              {/* Section Heading */}
              <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B18A4A]">
                    Your Collection
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">
                    Borrowed Books
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
              <div className="overflow-hidden border border-[#E8E1D5] bg-white shadow-sm dark:border-white/10 dark:bg-[#1C3548]">

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px] text-left">

                    <thead className="bg-[#F5F0E8] dark:bg-[#213E52]">
                      <tr className="text-xs font-bold uppercase tracking-wider text-[#172A3A] dark:text-gray-200">
                        <th className="px-6 py-5">Book</th>
                        <th className="px-6 py-5">Title</th>
                        <th className="px-6 py-5">Borrow Date</th>
                        <th className="px-6 py-5">Return Date</th>
                        <th className="px-6 py-5 text-center">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {books.map((book) => (
                        <tr
                          key={book._id}
                          className="border-t border-[#E8E1D5] transition-colors hover:bg-[#FAF9F6] dark:border-white/10 dark:hover:bg-white/5"
                        >

                          {/* Book Image */}
                          <td className="px-6 py-4">
                            <Link href={`/books/${book.bookId}`}>
                              <div className="relative h-20 w-14 overflow-hidden border border-[#E8E1D5] bg-[#F5F0E8] dark:border-white/10 dark:bg-white/10">
                                <Image
                                  src={book.image}
                                  alt={book.bookName}
                                  fill
                                  className="object-contain p-1 transition-transform duration-300 hover:scale-105"
                                  sizes="56px"
                                />
                              </div>
                            </Link>
                          </td>

                          {/* Book Title */}
                          <td className="px-6 py-4">
                            <Link
                              href={`/books/${book.bookId}`}
                              className="font-serif font-bold transition-colors hover:text-[#C59D5F]"
                            >
                              {book.bookName}
                            </Link>

                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              by {book.author}
                            </p>
                          </td>

                          {/* Borrow Date */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <CalendarDays
                                size={16}
                                className="text-[#C59D5F]"
                              />

                              {new Date(book.borrowDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </div>
                          </td>

                          {/* Return Date */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <CalendarDays
                                size={16}
                                className="text-[#C59D5F]"
                              />

                              {getReturnDate(book.borrowDate)}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">

                              {/* View Book */}
                              <Link
                                href={`/books/${book.bookId}`}
                                className="inline-flex items-center gap-2 border border-[#C59D5F] px-3 py-2 text-xs font-semibold text-[#A47B3E] transition-all hover:bg-[#C59D5F] hover:text-white dark:text-[#D9B77C] dark:hover:text-[#172A3A]"
                              >
                                <Eye size={14} />
                                View Book
                              </Link>

                              {/* Return Book */}
                              <button
                                type="button"
                                onClick={() => handleReturn(book)}
                                disabled={returningId === book._id}
                                className="inline-flex items-center gap-2 bg-[#172A3A] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#C59D5F] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#C59D5F] dark:text-[#172A3A] dark:hover:bg-[#E0BD80]"
                              >
                                {returningId === book._id ? (
                                  <Loader2
                                    size={14}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <RotateCcw size={14} />
                                )}

                                {returningId === book._id
                                  ? "Returning..."
                                  : "Return Book"}
                              </button>

                            </div>
                          </td>

                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>

                {/* Table Footer */}
                <div className="flex flex-col justify-between gap-2 border-t border-[#E8E1D5] bg-[#FAF9F6] px-6 py-4 text-xs text-gray-500 dark:border-white/10 dark:bg-[#172A3A] dark:text-gray-400 sm:flex-row">
                  <p>Showing {books.length} borrowed books</p>
                  <p>Thank you for reading with BookNook.</p>
                </div>

              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}


import React from "react";
import BookCard from "../../books/BookCard";
import { Sparkles } from "lucide-react";

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

const NewArrivalBooks = async () => {
    const res = await fetch("http://localhost:5000/book", {
        cache: "no-store",
    });
    const books: Book[] = await res.json();

    const newArrivals = books.filter((book) => book.isNewArrival);

    return (
        <section className="relative overflow-hidden bg-[#172A3A]">
            {/* Decorative Background */}
            <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full border border-[#C59D5F]/20" />
            <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full border border-[#C59D5F]/20" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/5" />
            <div className="pointer-events-none absolute right-16 top-10 h-64 w-64 rounded-full bg-[#C59D5F]/10 blur-[100px]" />

            <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-8">
                {/* Banner Heading */}
                <div className="mb-12 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 border border-[#C59D5F]/40 bg-[#C59D5F]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D9B77B]">
                            <Sparkles size={14} className="text-[#C59D5F]" />
                            Fresh on the Shelves
                            <span className="ml-1 h-1.5 w-1.5 animate-pulse rounded-full bg-[#C59D5F]" />
                        </div>

                        <h2 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                            New Arrived
                            <span className="relative ml-3 inline-block text-[#C59D5F]">
                                Books
                                <span className="absolute -bottom-2 left-0 h-0.75 w-full bg-gradient-to-r from-[#C59D5F] to-transparent" />
                            </span>
                        </h2>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-[#D5D9DC] sm:text-base">
                            The newest books added to BookNook. Fresh stories
                            and new ideas are waiting for you.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur-md">
                        <span className="text-2xl font-bold text-white">
                            {newArrivals.length}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                            New Books
                        </span>
                    </div>
                </div>

                {/* Books Grid */}
                {newArrivals.length > 0 ? (
                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {newArrivals.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                ) : (
                    <p className="py-10 text-center text-sm text-gray-400">
                        No new arrivals yet. Please check back soon.
                    </p>
                )}
            </div>
        </section>
    );
};

export default NewArrivalBooks;
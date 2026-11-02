
import BookCard from "@/app/books/BookCard";
import { Star } from "lucide-react";
import { API_URL } from "@/app/lib/api";
import FooterBanner from "./FooterBanner";

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

const PopularBooks = async () => {
    const res = await fetch(`${API_URL}/popular-books`, {
        cache: "no-store",
    });

    const books: Book[] = await res.json();

    return (
        <section className="relative overflow-hidden bg-[#FAF9F6] dark:bg-[#101C27]">

            {/* Decorative Background */}
            <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full border border-[#C59D5F]/20" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-[#C59D5F]/10" />

            <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-8">

                {/* Header */}
                <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[#E8E1D5] pb-8 dark:border-white/10 sm:flex-row sm:items-end">

                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 border border-[#C59D5F]/40 bg-[#C59D5F]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A47B3E] dark:text-[#D9B77B]">
                            <Star size={14} className="text-[#C59D5F]" />
                            Reader Favorites
                        </div>

                        <h2 className="font-serif text-3xl font-bold leading-tight text-[#172A3A] dark:text-white sm:text-4xl md:text-5xl">
                            Popular
                            <span className="relative ml-3 inline-block text-[#C59D5F]">
                                Books
                                <span className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-[#C59D5F] to-transparent" />
                            </span>
                        </h2>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 dark:text-[#D5D9DC] sm:text-base">
                            Discover the highest-rated books in BookNook,
                            loved by readers and worth exploring.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 border border-[#E8E1D5] bg-white px-5 py-3 dark:border-white/10 dark:bg-white/[0.06]">
                        <Star size={22} className="fill-[#C59D5F] text-[#C59D5F]" />

                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                            Top Rated Books
                        </span>
                    </div>

                </div>

                {/* Books Grid */}
                {books.length > 0 ? (
                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {books.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                ) : (
                    <p className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                        No popular books available yet.
                    </p>
                )}

            </div>

            <FooterBanner />
        </section>
    );
};

export default PopularBooks;
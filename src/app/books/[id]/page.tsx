import BorrowButton from "@/app/components/BorrowButton";
import { API_URL } from "@/app/lib/api";
import { getTokenFromSever } from "@/app/lib/getTokenFromSever";
import {
    ArrowLeft,
    ArrowUpRight,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Library,
    Star,
    UserRound,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

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
    userName?: string;
    userEmail?: string;
}

interface BookDetailPageProps {
    params: Promise<{ id: string }>;
}

async function getBook(id: string): Promise<Book | null> {


    try {
        const response = await fetch(
            `${API_URL}/book/${encodeURIComponent(id)}`,
            {

                cache: "no-store",
            }
        );

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        return data.book ?? data;
    } catch (error) {
        console.error("Failed to fetch book:", error);
        return null;
    }
}

export default async function BookDetailPage({
    params,
}: BookDetailPageProps) {
    const { id } = await params;
    const book = await getBook(id);

    if (!book || !book.bookName) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-[#FAF9F6] px-6 dark:bg-[#172A3A]">
                <div className="max-w-md text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border border-[#C59D5F]/30 bg-[#C59D5F]/10">
                        <BookOpen size={34} className="text-[#C59D5F]" />
                    </div>

                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#B18A4A]">
                        Book Not Found
                    </p>

                    <h1 className="font-serif text-3xl font-bold text-[#172A3A] dark:text-white">
                        This chapter is missing.
                    </h1>

                    <p className="mt-4 text-sm leading-6 text-gray-500">
                        We couldn&apos;t find this book. Please check the book ID or try
                        again later.
                    </p>

                    <Link
                        href="/books"
                        className="mt-8 inline-flex items-center gap-2 bg-[#172A3A] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#C59D5F]"
                    >
                        <ArrowLeft size={17} />
                        Back to All Books
                    </Link>
                </div>
            </main>
        );
    }

    const isAvailable = book.availableCopies > 0;

    return (
        <main className="min-h-screen bg-[#FAF9F6] text-[#172A3A] dark:bg-[#172A3A] dark:text-[#FAF9F6]">
            {/* Breadcrumb */}
            <section className="border-b border-[#E8E1D5] dark:border-white/10">
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
                    <nav
                        aria-label="Breadcrumb"
                        className="flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm"
                    >
                        <Link href="/" className="transition-colors hover:text-[#C59D5F]">
                            Home
                        </Link>

                        <ChevronRight size={14} />

                        <Link
                            href="/books"
                            className="transition-colors hover:text-[#C59D5F]"
                        >
                            Books
                        </Link>

                        <ChevronRight size={14} />

                        <span className="max-w-[180px] truncate font-medium text-[#B18A4A]">
                            {book.bookName}
                        </span>
                    </nav>
                </div>
            </section>

            {/* Book Details */}
            <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16 lg:py-20">
                <Link
                    href="/books"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-[#C59D5F]"
                >
                    <ArrowLeft size={17} />
                    Back to Collection
                </Link>

                <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                    {/* Book Cover */}
                    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                        <div className="absolute -right-4 -top-4 h-32 w-32 border border-[#C59D5F]/30 sm:-right-6 sm:-top-6" />

                        <div className="absolute -bottom-4 -left-4 h-32 w-32 border border-[#C59D5F]/30 sm:-bottom-6 sm:-left-6" />

                        <div className="relative flex min-h-[400px] items-center justify-center overflow-hidden border border-[#E8E1D5] bg-[#F5F0E8] p-8 sm:min-h-[540px] sm:p-12">
                            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[#C59D5F]/20" />

                            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full border border-[#C59D5F]/20" />

                            <div className="relative z-10 h-[320px] w-[220px] max-w-full transition-transform duration-700 hover:scale-105 sm:h-[420px] sm:w-[290px]">
                                <Image
                                    src={book.image}
                                    alt={book.bookName}
                                    fill
                                    sizes="(max-width: 640px) 220px, 290px"
                                    className="object-contain drop-shadow-[0_25px_25px_rgba(23,42,58,0.25)]"
                                    priority
                                />
                            </div>

                            {book.isNewArrival && (
                                <span className="absolute left-4 top-4 z-20 flex items-center gap-2 bg-[#172A3A] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#C59D5F]" />
                                    New Arrival
                                </span>
                            )}

                            <span className="absolute bottom-4 right-4 z-20 border border-[#E8E1D5] bg-white/90 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#172A3A] backdrop-blur-sm">
                                {book.category}
                            </span>
                        </div>

                        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
                            <BookOpen size={15} className="text-[#C59D5F]" />
                            <span>Every book holds a new adventure.</span>
                        </div>
                    </div>

                    {/* Book Information */}
                    <div className="pt-2 lg:pt-6">
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#B18A4A]">
                            Discover Your Next Chapter
                        </p>

                        <h1 className="font-serif text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl xl:text-6xl">
                            {book.bookName}
                        </h1>

                        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <UserRound size={17} className="text-[#C59D5F]" />

                                <span>
                                    by{" "}
                                    <span className="font-semibold text-[#172A3A] dark:text-[#FAF9F6]">
                                        {book.author}
                                    </span>
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Star
                                    size={17}
                                    className="fill-[#C59D5F] text-[#C59D5F]"
                                />

                                <span className="text-sm font-bold">{book.rating}</span>
                                <span className="text-xs text-gray-500">/ 5</span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="my-7 flex items-center gap-3">
                            <div className="h-px w-16 bg-[#C59D5F]" />
                            <div className="h-px flex-1 bg-[#E8E1D5] dark:bg-white/10" />
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="mb-3 font-serif text-xl font-bold">
                                About This Book
                            </h2>

                            <p className="text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
                                {book.description}
                            </p>
                        </div>

                        {/* Book Information Grid */}
                        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5">
                            {/* Published Year */}
                            <div className="border border-[#E8E1D5] bg-white p-4 dark:border-white/10 dark:bg-white/5 sm:p-5">
                                <div className="mb-3 flex items-center gap-2 text-[#B18A4A]">
                                    <CalendarDays size={18} />

                                    <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
                                        Published
                                    </span>
                                </div>

                                <p className="font-serif text-xl font-bold sm:text-2xl">
                                    {book.publishedYear}
                                </p>
                            </div>

                            {/* Category */}
                            <div className="border border-[#E8E1D5] bg-white p-4 dark:border-white/10 dark:bg-white/5 sm:p-5">
                                <div className="mb-3 flex items-center gap-2 text-[#B18A4A]">
                                    <Library size={18} />

                                    <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
                                        Category
                                    </span>
                                </div>

                                <p className="break-words font-serif text-lg font-bold sm:text-xl">
                                    {book.category}
                                </p>
                            </div>

                            {/* Added By and availability*/}
                            <div className="col-span-2 flex flex-col justify-between gap-4 border border-[#E8E1D5] bg-white p-4 dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center sm:p-5">
                                {/* Added By */}
                                <div>
                                    <div className="mb-3 flex items-center gap-2 text-[#B18A4A]">
                                        <UserRound size={18} />

                                        <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
                                            Added By
                                        </span>
                                    </div>

                                    <p className="font-serif text-lg font-bold">
                                        {book.userName || "Unknown User"}
                                    </p>

                                    <p className="mt-1 break-all text-sm text-gray-500">
                                        {book.userEmail || "Email not available"}
                                    </p>
                                </div>

                                {/* Availability */}
                                <div className="sm:text-right">
                                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
                                        Availability
                                    </p>

                                    <span
                                        className={`inline-flex items-center gap-2 text-sm font-semibold ${isAvailable
                                                ? "text-green-700 dark:text-green-400"
                                                : "text-red-600"
                                            }`}
                                    >
                                        <span
                                            className={`h-2.5 w-2.5 rounded-full ${isAvailable ? "bg-green-600" : "bg-red-500"
                                                }`}
                                        />

                                        {isAvailable
                                            ? `${book.availableCopies} Copies Available`
                                            : "Unavailable"}
                                    </span>
                                </div>
                            </div>
                        </div>



                        {/* Action Buttons */}
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            <BorrowButton book={book} />

                            <Link
                                href="/books"
                                className="flex items-center justify-center gap-2 border border-[#E8E1D5] px-5 py-4 text-sm font-semibold transition-colors hover:border-[#C59D5F] hover:text-[#B18A4A] dark:border-white/20"
                            >
                                <BookOpen size={18} />
                                Explore More Books
                            </Link>
                        </div>

                        <div className="mt-5 flex items-start gap-2 border-t border-[#E8E1D5] pt-4 text-xs leading-5 text-gray-500 dark:border-white/10">
                            <CheckCircle2
                                size={16}
                                className="mt-0.5 shrink-0 text-[#C59D5F]"
                            />

                            <p>
                                Find your next favorite read and make every reading moment
                                meaningful with BookNook.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Collection Banner */}
            <section className="border-t border-[#E8E1D5] bg-white dark:border-white/10 dark:bg-white/5">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B18A4A]">
                            Keep Exploring
                        </p>

                        <h2 className="font-serif text-2xl font-bold sm:text-3xl">
                            There&apos;s always another story.
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Discover more books and find the one that speaks to you.
                        </p>
                    </div>

                    <Link
                        href="/books"
                        className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#172A3A] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#C59D5F]"
                    >
                        Browse All Books
                        <ArrowUpRight size={18} />
                    </Link>
                </div>
            </section>
        </main>
    );
}
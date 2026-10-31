
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Star,
  BookOpen,
  ArrowUpRight,
  ShoppingBag,
} from "lucide-react";

export interface Book {
  _id?: string;
  id?: string;
  bookName: string;
  author: string;
  category: string;
  rating: number;
  image: string;
  description: string;
  publishedYear: number;
  availableCopies: number;
  isNewArrival: boolean;
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const bookId = book._id ?? book.id;
  const isAvailable = book.availableCopies > 0;

  const detailsLink = bookId ? `/books/${bookId}` : "#";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-[#E8E1D5] bg-white transition-all duration-500 hover:-translate-y-2 hover:border-[#C59D5F]/50 hover:shadow-[0_20px_50px_rgba(23,42,58,0.12)]">

      {/* Book Cover Section */}
      <Link
        href={detailsLink}
        aria-label={`View ${book.bookName}`}
        className="relative block overflow-hidden bg-[#F5F0E8]"
      >
        <div className="relative flex h-[280px] items-center justify-center overflow-hidden p-8">

          {/* Background Decoration */}
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-[#C59D5F]/20 transition-transform duration-700 group-hover:scale-150" />

          <div className="absolute -bottom-20 -left-12 h-48 w-48 rounded-full border border-[#C59D5F]/20 transition-transform duration-700 group-hover:scale-125" />

          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-[#C59D5F]/10" />

          {/* Book Image */}
  {/* Book Image */}
<div className="relative z-10 h-full transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-rotate-2">
            <Image
              src={book.image}
              alt={book.bookName}
              width={180}
              height={240}
              className="h-full w-auto max-w-full object-cover drop-shadow-[0_15px_15px_rgba(23,42,58,0.25)]"
            />
          </div>

          {/* New Arrival Badge */}
          {book.isNewArrival && (
            <span className="absolute left-2 top-2 z-20 flex items-center gap-1.5 bg-[#172A3A] px-1 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-white shadow-md rounded-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C59D5F]" />
              New Arrival
            </span>
          )}

          {/* Category Badge */}
          <span className="absolute bottom-2 left-2 z-20 border border-[#C59D5F] bg-white/90 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-[#172A3A] backdrop-blur-sm rounded-xl">
            {book.category}
          </span>

          {/* Quick View Icon */}
          <span className="absolute bottom-4 right-4 z-20 flex h-10 w-10 translate-y-3 items-center justify-center bg-[#C59D5F] text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={19} />
          </span>
        </div>
      </Link>

      {/* Book Information */}
      <div className="flex flex-1 flex-col p-5">

        {/* Rating and Published Year */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star
              size={15}
              className="fill-[#C59D5F] text-[#C59D5F]"
            />

            <span className="text-sm font-bold text-[#172A3A]">
              {book.rating}
            </span>

            <span className="text-xs text-gray-400">
              / 5
            </span>
          </div>

          <span className="text-xs font-medium text-gray-400">
            {book.publishedYear}
          </span>
        </div>

        {/* Book Name */}
        <Link href={detailsLink}>
          <h3 className="line-clamp-1 font-serif text-xl font-bold text-[#172A3A] transition-colors duration-300 group-hover:text-[#B18A4A]">
            {book.bookName}
          </h3>
        </Link>

        {/* Author */}
        <p className="mt-1 text-sm text-gray-500">
          by <span className="font-medium text-[#8A795F]">{book.author}</span>
        </p>

        {/* Description */}
        <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
          {book.description}
        </p>

        {/* Decorative Divider */}
        <div className="my-5 flex items-center gap-2">
          <div className="h-px flex-1 bg-[#EEE8DE]" />
          <BookOpen size={15} className="text-[#C59D5F]" />
          <div className="h-px flex-1 bg-[#EEE8DE]" />
        </div>

          {/* Availability */}
          <div className="text-right mb-3">
            <p className=" text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
              Availability
            </p>

            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                isAvailable ? "text-green-700" : "text-red-600"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isAvailable ? "bg-green-600" : "bg-red-500"
                }`}
              />

              {isAvailable
                ? `${book.availableCopies} Copies`
                : "Out of Stock"}
            </span>
          </div>
        

        {/* Explore Button */}
        <Link
          href={detailsLink}
          className="mt-auto flex w-full items-center justify-between bg-[#172A3A] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#C59D5F] group/button"
        >
          <span className="flex items-center gap-2">
            <ShoppingBag size={16} />
            Explore Book
          </span>

          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover/button:translate-x-1 group-hover/button:-translate-y-1"
          />
        </Link>

      </div>
    </article>
  );
}
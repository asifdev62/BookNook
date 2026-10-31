
"use client";

import { useState } from "react";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "sonner";

interface BorrowButtonProps {
  book: {
    _id: string;
    bookName: string;
    author: string;
    image: string;
    availableCopies: number;
  };
}

export default function BorrowButton({ book }: BorrowButtonProps) {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const isAvailable = book.availableCopies > 0;

  const borrowBook = async () => {
    // Login Check
    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    // Availability Check
    if (!isAvailable) {
      toast.error("This book is currently unavailable!");
      return;
    }

    try {
      setLoading(true);

      const borrowData = {
        bookId: book._id,
        bookName: book.bookName,
        author: book.author,
        image: book.image,
        userEmail: session.user.email,
        borrowDate: new Date().toISOString(),
      };

      const response = await fetch(
        "http://localhost:5000/my-borrows",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(borrowData),
        }
      );

      const data = await response.json();

      // Already Borrowed Check
      if (response.status === 409) {
        toast.error("You have already borrowed this book!");
        return;
      }

      // Other Error Check
      if (!response.ok) {
        throw new Error(data.message || "Borrow failed");
      }

      // Success
      toast.success("Book borrowed successfully!");

      console.log(data);

    } catch (error) {
      console.log(error);
      toast.error("Failed to borrow book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={borrowBook}
      disabled={!isAvailable || loading}
      className="flex items-center justify-center gap-2 bg-[#172A3A] px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#C59D5F] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <ShoppingBag size={18} />

      {loading
        ? "Borrowing..."
        : isAvailable
          ? "Borrow This Book"
          : "Currently Unavailable"}

      {isAvailable && !loading && <ArrowUpRight size={17} />}
    </button>
  );
}

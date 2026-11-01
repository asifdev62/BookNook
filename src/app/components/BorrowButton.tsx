
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "sonner";
import { API_URL } from "@/app/lib/api";

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
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const isAvailable = book.availableCopies > 0;

  const borrowBook = async () => {
    // Login Check
    if (!session?.user) {
      toast.error("Please sign in to borrow a book.");
      return;
    }

    // Availability Check
    if (!isAvailable) {
      toast.error("This book is currently unavailable.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/my-borrows`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    bookId: book._id,
    bookName: book.bookName,
    author: book.author,
    image: book.image,
    userEmail: session.user.email,
  }),
});

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (response.status === 401) {
        toast.error(data?.message || "Please sign in to borrow a book.");
        return;
      }

      if (response.status === 409) {
        toast.error(
          data?.message || "This book is currently unavailable."
        );
        return;
      }

      // Other Error Check
      if (!response.ok) {
        throw new Error(data?.message || "Failed to borrow book.");
      }

      // Success
      toast.success(data?.message || "Book borrowed successfully!");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to borrow book."
      );
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

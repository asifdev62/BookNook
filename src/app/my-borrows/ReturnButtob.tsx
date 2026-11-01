"use client";

import { useState } from "react";
import { Loader2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "@/app/lib/api";

interface ReturnButtonProps {
  borrowId: string;
  bookName: string;
  email?: string;
  onSuccess: (borrowId: string) => void;
}

export default function ReturnButton({
  borrowId,
  bookName,
  email,
  onSuccess,
}: ReturnButtonProps) {
  const [returning, setReturning] = useState(false);

  const handleReturn = async () => {
    if (!email) {
      toast.error("Please sign in to return a book.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to return "${bookName}"?`
    );

    if (!confirmed) return;

    try {
      setReturning(true);

      const response = await fetch(
        `${API_URL}/my-borrows/${borrowId}/return`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Return failed");
      }

      onSuccess(borrowId);

      toast.success(data.message || "Book returned successfully!");
    } catch (error) {
      console.error("Return book error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to return book"
      );
    } finally {
      setReturning(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleReturn}
      disabled={returning}
      className="inline-flex items-center gap-2 bg-[#172A3A] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#C59D5F] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#C59D5F] dark:text-[#172A3A] dark:hover:bg-[#E0BD80]"
    >
      {returning ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <RotateCcw size={14} />
      )}

      {returning ? "Returning..." : "Return Book"}
    </button>
  );
}
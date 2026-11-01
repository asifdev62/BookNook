
"use client";

import { useState } from "react";
import { Trash2, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

interface Book {
  _id: string;
  bookName: string;
}

interface DeleteBookProps {
  book: Book;
  email: string;
  onDelete: (id: string) => void;
}

const API_URL = "http://localhost:5000";

const DeleteBook = ({ book, email, onDelete }: DeleteBookProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!email) {
      toast.error("Please login first!");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/my-books/${book._id}?email=${email}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      const result = await response.json();

      if (result.deletedCount === 0) {
        throw new Error("Book not found");
      }

      onDelete(book._id);
      toast.success("Book successfully deleted!");
    } catch {
      toast.error("Book delete failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-2 border border-red-500/50 px-3 py-2 text-sm text-red-500 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
    >
      {loading ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}

      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteBook;
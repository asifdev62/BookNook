
"use client";

import { useState } from "react";
import { Pencil, } from "lucide-react";
import { toast } from "sonner";
import { RxCross2 } from "react-icons/rx";
import { IoMdBook } from "react-icons/io";
import { FaSave } from "react-icons/fa";
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

interface EditBookProps {
    book: Book;
    email: string;
    onUpdate: (updatedBook: Book) => void;
}

const API_URL = "http://localhost:5000";

const EditBook = ({ book, email, onUpdate }: EditBookProps) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ ...book });
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please login first!");
            return;
        }

        setLoading(true);

        // Only send editable fields. The API does `$set: req.body`, so sending
        // `_id` makes MongoDB reject the update (immutable field), and sending
        // `userEmail` would let the owner change.
        const payload = {
            bookName: formData.bookName,
            author: formData.author,
            category: formData.category,
            rating: formData.rating,
            image: formData.image,
            description: formData.description,
            publishedYear: formData.publishedYear,
            availableCopies: formData.availableCopies,
            isNewArrival: formData.isNewArrival,
        };

        try {
            const params = new URLSearchParams({ email });

            const response = await fetch(
                `${API_URL}/my-books/${book._id}?${params}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const result = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(result?.message || "Update failed");
            }

            if (result?.matchedCount === 0) {
                throw new Error("Book not found");
            }

            onUpdate({ ...book, ...payload });
            setOpen(false);
            toast.success("Book updated successfully!");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update book!"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => {
                    setFormData({ ...book });
                    setOpen(true);
                }}
                className="flex items-center gap-2 border border-[#C59D5F] px-3 py-2 text-sm hover:bg-[#C59D5F] hover:text-white"
            >
                <Pencil size={16} />
                Edit
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4">
                    <div className="my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto bg-[#FAF9F6] p-6 text-[#172A3A] dark:bg-[#172A3A] dark:text-white">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <IoMdBook className="text-[#C59D5F] " />
                                Edit<span className="text-[#C59D5F] ">Book</span>
                            </h2>

                            <button type="button" onClick={() => setOpen(false)}>
                                <RxCross2 size={22} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            {(
                                [
                                    ["bookName", "Book Name"],
                                    ["author", "Author"],
                                    ["category", "Category"],
                                    ["publishedYear", "Published Year"],
                                    ["rating", "Rating"],
                                    ["availableCopies", "Available Copies"],
                                    ["image", "Image URL"],
                                ] as const
                            ).map(([key, label]) => (
                                <div key={key}>
                                    <label className="mb-1 block text-sm font-semibold">
                                        {label}
                                    </label>

                                    <input
                                        required
                                        type={
                                            ["publishedYear", "rating", "availableCopies"].includes(
                                                key
                                            )
                                                ? "number"
                                                : "text"
                                        }
                                        value={formData[key]}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                [key]: [
                                                    "publishedYear",
                                                    "rating",
                                                    "availableCopies",
                                                ].includes(key)
                                                    ? Number(e.target.value)
                                                    : e.target.value,
                                            })
                                        }
                                        className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-[#C59D5F]"
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="mb-1 block text-sm font-semibold">
                                    Description
                                </label>

                                <textarea
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-[#C59D5F]"
                                />
                            </div>

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.isNewArrival}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            isNewArrival: e.target.checked,
                                        })
                                    }
                                />
                                New Arrival
                            </label>


                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 bg-[#C59D5F] px-4 py-3 font-bold text-[#172A3A] transition hover:bg-[#b58b4d] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <FaSave />
                                {loading ? "Updating..." : "Save Changes"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditBook;
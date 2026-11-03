"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";
import { RxCross2 } from "react-icons/rx";
import { IoMdBook } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { API_URL } from "@/app/lib/api";
import {
    categoryKey,
    normalizeCategory,
    resolveCategorySelection,
    uniqueCategories,
} from "@/app/lib/categories";
import { getTokenFromClient } from "../lib/getTokenFromClient";

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

interface FormState {
    bookName: string;
    author: string;
    category: string;
    publishedYear: string;
    rating: string;
    availableCopies: string;
    image: string;
    description: string;
    isNewArrival: boolean;
}

const CURRENT_YEAR = new Date().getFullYear();

const toFormState = (book: Book): FormState => ({
    bookName: book.bookName ?? "",
    author: book.author ?? "",
    category: normalizeCategory(book.category),
    publishedYear:
        book.publishedYear !== undefined && book.publishedYear !== null
            ? String(book.publishedYear)
            : "",
    rating:
        book.rating !== undefined && book.rating !== null
            ? String(book.rating)
            : "",
    availableCopies:
        book.availableCopies !== undefined && book.availableCopies !== null
            ? String(book.availableCopies)
            : "",
    image: book.image ?? "",
    description: book.description ?? "",
    isNewArrival: Boolean(book.isNewArrival),
});

const inputClass =
    "w-full border border-[#D8CFC0] bg-white px-3 py-2.5 text-sm text-[#172A3A] outline-none transition placeholder:text-[#172A3A]/35 focus:border-[#C59D5F] focus:ring-1 focus:ring-[#C59D5F]/25 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/15 dark:bg-[#101C27] dark:text-white dark:placeholder:text-white/30";

const labelClass =
    "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#172A3A]/65 dark:text-white/65";

const EditBook = ({ book, email, onUpdate }: EditBookProps) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<FormState>(() =>
        toFormState(book)
    );
    const [categories, setCategories] = useState<string[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [categoryMode, setCategoryMode] = useState<"existing" | "new">(
        "existing"
    );
    const [newCategory, setNewCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");



    useEffect(() => {
        if (!open) return;

        let cancelled = false;

        fetch(`${API_URL}/categories`, { cache: "no-store" })
            .then((response) => (response.ok ? response.json() : []))
            .then((data) => {
                if (!cancelled) {
                    setCategories(
                        uniqueCategories(Array.isArray(data) ? data : [])
                    );
                }
            })
            .catch(() => {
                if (!cancelled) setCategories([]);
            })
            .finally(() => {
                if (!cancelled) setCategoriesLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [open]);

    
    const categoryOptions = useMemo(
        () =>
            uniqueCategories([
                ...categories,
                book.category,
                formData.category,
            ]),
        [categories, book.category, formData.category]
    );

    const resolvedCategory = useMemo(() => {
        if (categoryMode === "new") {
            return resolveCategorySelection(newCategory, categories);
        }

        return resolveCategorySelection(formData.category, categories);
    }, [categoryMode, newCategory, formData.category, categories]);

    const duplicateCategory =
        categoryMode === "new" && normalizeCategory(newCategory)
            ? categories.find(
                (category) =>
                    categoryKey(category) === categoryKey(newCategory)
            ) ?? null
            : null;

    const closeEditor = () => {
        if (loading) return;

        setOpen(false);
        setErrorMessage("");
        setNewCategory("");
        setCategoryMode("existing");
    };

    const openEditor = () => {
        setFormData(toFormState(book));
        setNewCategory("");
        setCategoryMode("existing");
        setErrorMessage("");
        setCategoriesLoading(true);
        setOpen(true);
    };

   
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !loading) {
                setOpen(false);
                setErrorMessage("");
                setNewCategory("");
                setCategoryMode("existing");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, loading]);

    
    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    const validate = (): string | null => {
        if (!email) {
            return "Please login first.";
        }

        if (!formData.bookName.trim()) {
            return "Book name is required.";
        }

        if (!formData.author.trim()) {
            return "Author is required.";
        }

        if (!resolvedCategory) {
            return "Please choose a category or create a new one.";
        }

        const year = Number(formData.publishedYear);

        if (
            !Number.isInteger(year) ||
            year < 1000 ||
            year > CURRENT_YEAR
        ) {
            return `Published year must be between 1000 and ${CURRENT_YEAR}.`;
        }

        const rating = Number(formData.rating);

        if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
            return "Rating must be a number between 0 and 5.";
        }

        const copies = Number(formData.availableCopies);

        if (!Number.isInteger(copies) || copies < 0) {
            return "Available copies must be a whole number of 0 or more.";
        }

        const imageUrl = formData.image.trim();

        if (!imageUrl) {
            return "Image URL is required.";
        }

        try {
            const parsed = new URL(imageUrl);

            if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
                return "Image URL must start with http:// or https://.";
            }
        } catch {
            return "Please enter a valid image URL.";
        }

        if (!formData.description.trim()) {
            return "Description is required.";
        }

        return null;
    };

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");

        const validationError = validate();

        if (validationError) {
            setErrorMessage(validationError);
            toast.error(validationError);
            return;
        }

        const payload = {
            bookName: formData.bookName.trim(),
            author: formData.author.trim(),
            category: resolvedCategory,
            rating: Number(formData.rating),
            image: formData.image.trim(),
            description: formData.description.trim(),
            publishedYear: Number(formData.publishedYear),
            availableCopies: Number(formData.availableCopies),
            isNewArrival: formData.isNewArrival,
        };

        setLoading(true);

        try {
            const params = new URLSearchParams({ email });

            const token = await getTokenFromClient()

            const response = await fetch(
                `${API_URL}/my-books/${book._id}?${params}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(payload),
                }
            );

            const result = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(
                    result?.message || "Failed to update book. Please try again."
                );
            }

            if (result?.matchedCount === 0) {
                throw new Error("Book not found or you do not own it.");
            }

            const updatedBook: Book =
                (result?.book as Book | undefined) ?? {
                    ...book,
                    ...payload,
                };

            onUpdate(updatedBook);
            setOpen(false);
            setErrorMessage("");
            toast.success("Book updated successfully!");
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to update book. Please try again.";

            // Keep the editor open so the user can fix the problem.
            setErrorMessage(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const saving = loading;

    return (
        <>
            <button
                type="button"
                onClick={openEditor}
                className="flex items-center gap-2 border border-[#C59D5F] px-3 py-2 text-sm transition hover:bg-[#C59D5F] hover:text-white"
            >
                <Pencil size={16} />
                Edit
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-[#0B141A]/75 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeEditor();
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="edit-book-title"
                        className="flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden border border-[#C59D5F]/30 bg-[#FAF9F6] text-[#172A3A] shadow-2xl shadow-black/30 dark:border-white/10 dark:bg-[#172A3A] dark:text-white sm:max-h-[90vh]"
                    >
                        <div className="h-0.5 w-full bg-linear-to-r from-[#C59D5F]/30 via-[#C59D5F] to-[#C59D5F]/30" />

                        <header className="flex items-start justify-between gap-4 border-b border-[#E8E1D5] px-5 py-4 dark:border-white/10 sm:px-6">
                            <div className="flex items-start gap-3">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#C59D5F]/15 text-[#A47B3E] dark:text-[#D9B77C]">
                                    <IoMdBook size={21} />
                                </span>

                                <div>
                                    <h2
                                        id="edit-book-title"
                                        className="font-serif text-xl font-bold sm:text-2xl"
                                    >
                                        Edit{" "}
                                        <span className="text-[#B18A4A] dark:text-[#D9B77C]">
                                            Book
                                        </span>
                                    </h2>

                                    <p className="mt-0.5 max-w-md truncate text-xs text-[#172A3A]/55 dark:text-white/55">
                                        Updating “{book.bookName}”. Only change
                                        what you need, then save.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={closeEditor}
                                disabled={saving}
                                aria-label="Close edit form"
                                className="flex h-8 w-8 shrink-0 items-center justify-center text-[#172A3A]/60 transition hover:bg-[#172A3A]/5 hover:text-[#172A3A] disabled:cursor-not-allowed disabled:opacity-40 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
                            >
                                <RxCross2 size={20} />
                            </button>
                        </header>

                        <form
                            onSubmit={handleUpdate}
                            className="flex min-h-0 flex-1 flex-col"
                        >
                            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="edit-bookName"
                                            className={labelClass}
                                        >
                                            Book Name
                                        </label>

                                        <input
                                            id="edit-bookName"
                                            name="bookName"
                                            type="text"
                                            required
                                            value={formData.bookName}
                                            onChange={(event) =>
                                                setFormData((previous) => ({
                                                    ...previous,
                                                    bookName: event.target.value,
                                                }))
                                            }
                                            placeholder="Enter the book title"
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="edit-author"
                                            className={labelClass}
                                        >
                                            Author
                                        </label>

                                        <input
                                            id="edit-author"
                                            name="author"
                                            type="text"
                                            required
                                            value={formData.author}
                                            onChange={(event) =>
                                                setFormData((previous) => ({
                                                    ...previous,
                                                    author: event.target.value,
                                                }))
                                            }
                                            placeholder="Enter the author name"
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="edit-category"
                                            className={labelClass}
                                        >
                                            Category
                                        </label>

                                        <div className="relative">
                                            <select
                                                id="edit-category"
                                                name="category"
                                                value={
                                                    categoryMode === "new"
                                                        ? "__new__"
                                                        : formData.category
                                                }
                                                onChange={(event) => {
                                                    const value =
                                                        event.target.value;

                                                    if (value === "__new__") {
                                                        setCategoryMode("new");
                                                        setNewCategory("");
                                                        return;
                                                    }

                                                    setCategoryMode("existing");
                                                    setNewCategory("");
                                                    setFormData((previous) => ({
                                                        ...previous,
                                                        category: value,
                                                    }));
                                                }}
                                                className={`${inputClass} appearance-none pr-10`}
                                            >
                                                <option value="" disabled>
                                                    Select a category
                                                </option>

                                                {categoryOptions.map(
                                                    (category) => (
                                                        <option
                                                            key={category}
                                                            value={category}
                                                        >
                                                            {category}
                                                        </option>
                                                    )
                                                )}

                                                <option value="__new__">
                                                    + Add new category
                                                </option>
                                            </select>

                                            <ChevronDown
                                                size={17}
                                                aria-hidden="true"
                                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#C59D5F]"
                                            />
                                        </div>

                                        {categoryMode === "new" && (
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    value={newCategory}
                                                    onChange={(event) =>
                                                        setNewCategory(
                                                            event.target.value
                                                        )
                                                    }
                                                    placeholder="Type the new category name"
                                                    aria-label="New category name"
                                                    className={inputClass}
                                                />

                                                {normalizeCategory(
                                                    newCategory
                                                ) && (
                                                        <p
                                                            className={`mt-1.5 text-[11px] leading-5 ${duplicateCategory
                                                                ? "text-[#8A5A16] dark:text-[#D9B77C]"
                                                                : "text-[#172A3A]/55 dark:text-white/55"
                                                                }`}
                                                        >
                                                            {duplicateCategory
                                                                ? `“${duplicateCategory}” already exists, so this book will be saved there.`
                                                                : `“${normalizeCategory(
                                                                    newCategory
                                                                )}” will be added as a new category.`}
                                                        </p>
                                                    )}
                                            </div>
                                        )}

                                        {categoriesLoading && (
                                            <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#172A3A]/50 dark:text-white/50">
                                                <Loader2
                                                    size={12}
                                                    className="animate-spin"
                                                />
                                                Loading categories...
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="edit-publishedYear"
                                            className={labelClass}
                                        >
                                            Published Year
                                        </label>

                                        <input
                                            id="edit-publishedYear"
                                            name="publishedYear"
                                            type="number"
                                            min={1000}
                                            max={CURRENT_YEAR}
                                            step={1}
                                            required
                                            value={formData.publishedYear}
                                            onChange={(event) =>
                                                setFormData((previous) => ({
                                                    ...previous,
                                                    publishedYear:
                                                        event.target.value,
                                                }))
                                            }
                                            placeholder={`e.g. ${CURRENT_YEAR}`}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="edit-rating"
                                            className={labelClass}
                                        >
                                            Rating (0–5)
                                        </label>

                                        <input
                                            id="edit-rating"
                                            name="rating"
                                            type="number"
                                            min={0}
                                            max={5}
                                            step={0.1}
                                            required
                                            value={formData.rating}
                                            onChange={(event) =>
                                                setFormData((previous) => ({
                                                    ...previous,
                                                    rating: event.target.value,
                                                }))
                                            }
                                            placeholder="e.g. 4.5"
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="edit-availableCopies"
                                            className={labelClass}
                                        >
                                            Available Copies
                                        </label>

                                        <input
                                            id="edit-availableCopies"
                                            name="availableCopies"
                                            type="number"
                                            min={0}
                                            step={1}
                                            required
                                            value={formData.availableCopies}
                                            onChange={(event) =>
                                                setFormData((previous) => ({
                                                    ...previous,
                                                    availableCopies:
                                                        event.target.value,
                                                }))
                                            }
                                            placeholder="e.g. 3"
                                            className={inputClass}
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <label className="flex w-full cursor-pointer items-center gap-3 border border-[#D8CFC0] bg-white px-3 py-2.5 dark:border-white/15 dark:bg-[#101C27]">
                                            <input
                                                id="edit-isNewArrival"
                                                name="isNewArrival"
                                                type="checkbox"
                                                checked={
                                                    formData.isNewArrival
                                                }
                                                onChange={(event) =>
                                                    setFormData(
                                                        (previous) => ({
                                                            ...previous,
                                                            isNewArrival:
                                                                event.target
                                                                    .checked,
                                                        })
                                                    )
                                                }
                                                className="h-4 w-4 accent-[#C59D5F]"
                                            />

                                            <span className="text-sm font-medium">
                                                New Arrival
                                            </span>
                                        </label>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="edit-image"
                                            className={labelClass}
                                        >
                                            Image URL
                                        </label>

                                        <input
                                            id="edit-image"
                                            name="image"
                                            type="url"
                                            required
                                            value={formData.image}
                                            onChange={(event) =>
                                                setFormData((previous) => ({
                                                    ...previous,
                                                    image: event.target.value,
                                                }))
                                            }
                                            placeholder="https://example.com/book-cover.jpg"
                                            className={inputClass}
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="edit-description"
                                            className={labelClass}
                                        >
                                            Description
                                        </label>

                                        <textarea
                                            id="edit-description"
                                            name="description"
                                            rows={4}
                                            required
                                            value={formData.description}
                                            onChange={(event) =>
                                                setFormData((previous) => ({
                                                    ...previous,
                                                    description:
                                                        event.target.value,
                                                }))
                                            }
                                            placeholder="Write a short description about this book..."
                                            className={`${inputClass} resize-y`}
                                        />
                                    </div>
                                </div>

                                {errorMessage && (
                                    <p
                                        role="alert"
                                        className="mt-4 border border-red-300 bg-red-50 px-3 py-2.5 text-xs leading-5 text-red-700 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-300"
                                    >
                                        {errorMessage}
                                    </p>
                                )}
                            </div>

                            <footer className="flex flex-col-reverse gap-2.5 border-t border-[#E8E1D5] bg-white/60 px-5 py-4 dark:border-white/10 dark:bg-white/[0.03] sm:flex-row sm:justify-end sm:px-6">
                                <button
                                    type="button"
                                    onClick={closeEditor}
                                    disabled={saving}
                                    className="w-full border border-[#172A3A]/20 px-5 py-2.5 text-sm font-semibold text-[#172A3A] transition hover:border-[#172A3A]/40 hover:bg-[#172A3A]/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/20 dark:text-white dark:hover:bg-white/10 sm:w-auto"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex w-full items-center justify-center gap-2 bg-[#C59D5F] px-6 py-2.5 text-sm font-bold text-[#172A3A] transition hover:bg-[#B58B4D] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                >
                                    {saving ? (
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <FaSave size={15} />
                                    )}
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </footer>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditBook;

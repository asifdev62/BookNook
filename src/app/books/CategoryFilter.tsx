
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

const categories = [
  "All Categories",
  "Fiction",
  "Technology",
  "Science",
  "History",
  "Biography",
  "Business",
  "Self-Development",
  "Romance",
  "Education",
  "Astronomy",
  "Philosophy",
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory =
    searchParams.get("category") || "All Categories";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "All Categories") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    const query = params.toString();

    router.push(query ? `/books?${query}` : "/books");
  };

  return (
    <div className="relative w-full sm:w-64">
      <select
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="w-full appearance-none border border-[#C59D5F]/50 bg-white px-5 py-3.5 pr-11 text-sm text-[#172A3A] outline-none transition focus:border-[#C59D5F]"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <ChevronDown
        size={18}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#C59D5F]"
      />
    </div>
  );
}

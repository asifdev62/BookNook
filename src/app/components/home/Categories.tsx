import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Lightbulb,
  Sparkles,
} from "lucide-react";

async function getCategories(): Promise<string[]> {
  try {
    const res = await fetch("http://localhost:5000/categories", {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// Each category gets its own icon, colors, and description.
function getCategoryInfo(name: string) {
  if (name === "Fiction") {
    return {
      name: "Fiction",
      description:
        "Explore unforgettable stories, novels, and imaginary worlds.",
      icon: BookOpen,
      color: "bg-[#F4E8D8]",
      iconColor: "text-[#8B623D]",
      slug: "Fiction",
    };
  }

  if (name === "Fantasy") {
    return {
      name: "Fantasy",
      description:
        "Step into magical worlds, mythical creatures, and epic adventures.",
      icon: Sparkles,
      color: "bg-[#E9E2F3]",
      iconColor: "text-[#74579B]",
      slug: "Fantasy",
    };
  }

  if (name === "Finance") {
    return {
      name: "Finance",
      description:
        "Learn about money, investing, and building financial freedom.",
      icon: BriefcaseBusiness,
      color: "bg-[#E0E8E9]",
      iconColor: "text-[#416A70]",
      slug: "Finance",
    };
  }

  if (name === "Programming") {
    return {
      name: "Programming",
      description:
        "Discover coding, software development, and computer science.",
      icon: Code2,
      color: "bg-[#DFEAF3]",
      iconColor: "text-[#315A7D]",
      slug: "Programming",
    };
  }

  if (name === "Self-Help") {
    return {
      name: "Self-Help",
      description:
        "Build better habits and unlock your personal potential.",
      icon: Lightbulb,
      color: "bg-[#F5EED8]",
      iconColor: "text-[#92762D]",
      slug: "Self-Help",
    };
  }

  // This fallback is used if a new category is added to MongoDB later.
  return {
    name: name,
    description: `Explore our ${name} books.`,
    icon: BookOpen,
    color: "bg-[#E6E9E5]",
    iconColor: "text-[#5E715B]",
    slug: name,
  };
}

export default async function CategoriesPage() {
  const categoryNames = await getCategories();

  // Turn each category name from MongoDB into a category card.
  const categories = categoryNames.map((name) => getCategoryInfo(name));

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#172A3A] text-[#172A3A] p-10">
      {/* Hero Section */}
    
      <section className="relative overflow-hidden bg-white dark:border-white/10 dark:bg-[#1C3548]">
  <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full border border-[#C59D5F]/20" />
  <div className="absolute -right-6 -top-10 h-36 w-36 rounded-full border border-[#C59D5F]/20" />

  <div className="relative mx-auto max-w-7xl px-4 py-7 sm:px-6 md:px-10 md:py-10">
    <div className="mb-3 flex items-center gap-2 text-xs text-[#C59D5F]">
      <Link href="/" className="transition hover:text-white">
        Home
      </Link>
      <span>/</span>
      <span className="text-white/70">Categories</span>
    </div>

    <div className="max-w-2xl">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C59D5F]">
        Find Your Next Read
      </p>

      <h1 className="font-serif text-3xl font-medium leading-tight text-[#FAF9F6] sm:text-4xl md:text-5xl">
        Explore Books by{" "}
        <span className="italic text-[#C59D5F]">Category.</span>
      </h1>

      <p className="mt-3 max-w-xl text-sm leading-6 text-white/65 md:text-base">
        From timeless fiction to groundbreaking technology, discover
        books that match your curiosity and inspire your imagination.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-white/70">
        <span className="flex items-center gap-2">
          <BookOpen size={15} className="text-[#C59D5F]" />
          Explore different subjects
        </span>

        <span className="hidden h-1 w-1 rounded-full bg-[#C59D5F] sm:block" />

        <span className="flex items-center gap-2">
          <Sparkles size={15} className="text-[#C59D5F]" />
          Find your next favorite
        </span>
      </div>
    </div>
  </div>
</section>

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-10 md:py-10">
  <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
    <div>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B18A4E]">
        Browse Collection
      </p>

      <h2 className="font-serif text-2xl font-medium text-[#172A3A] dark:text-white md:text-3xl">
        Explore by Interest
      </h2>

      <p className="mt-2 max-w-xl text-xs leading-6 text-[#172A3A]/60 dark:text-white/60 sm:text-sm">
        Choose a category and discover books selected for your interests.
      </p>
    </div>

    <div className="flex items-center gap-2 text-xs text-[#172A3A]/60 dark:text-white/60">
      <BookOpen size={16} className="text-[#C59D5F]" />
      <span>{categories.length} categories to explore</span>
    </div>
  </div>

  {/* Category Cards */}
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {categories.map((category, index) => {
      const Icon = category.icon;

      return (
        <Link
          key={category.slug}
          href={`/books?category=${encodeURIComponent(category.slug)}`}
          className="group relative flex min-h-52 flex-col border border-[#172A3A]/10 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#C59D5F]/70 hover:shadow-lg hover:shadow-[#172A3A]/5 dark:border-white/10 dark:bg-[#1C3548]"
        >
          <div className="mb-5 flex items-start justify-between">
            <div
              className={`flex h-11 w-11 items-center justify-center ${category.color}`}
            >
              <Icon
                size={22}
                strokeWidth={1.6}
                className={category.iconColor}
              />
            </div>

            <span className="font-serif text-xs text-[#172A3A]/30 dark:text-white/30">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="font-serif text-lg font-medium text-[#172A3A] transition group-hover:text-[#A47C3D] dark:text-white">
            {category.name}
          </h3>

          <p className="mt-2 flex-1 text-xs leading-6 text-[#172A3A]/60 dark:text-white/60">
            {category.description}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-[#172A3A]/10 pt-3 dark:border-white/10">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#172A3A]/60 dark:text-white/60">
              Explore Books
            </span>

            <ArrowRight
              size={16}
              className="text-[#C59D5F] transition-transform group-hover:translate-x-1"
            />
          </div>
        </Link>
      );
    })}
  </div>
</section>

    </div>
  );
}









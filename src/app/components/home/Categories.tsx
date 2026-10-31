
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BookText,
  BriefcaseBusiness,
  Code2,
  FlaskConical,
  Heart,
  History,
  Landmark,
  Lightbulb,
  Sparkles,
  Telescope,
  UserRound,
} from "lucide-react";

const categories = [
  {
    name: "Fiction",
    description: "Explore unforgettable stories, novels, and imaginary worlds.",
    icon: BookOpen,
    color: "bg-[#F4E8D8]",
    iconColor: "text-[#8B623D]",
    slug: "Fiction",
  },
  {
    name: "Technology",
    description: "Discover programming, software development, and technology.",
    icon: Code2,
    color: "bg-[#DFEAF3]",
    iconColor: "text-[#315A7D]",
    slug: "Technology",
  },
  {
    name: "Science",
    description: "Understand the universe through scientific discoveries.",
    icon: FlaskConical,
    color: "bg-[#E1EEE7]",
    iconColor: "text-[#39765A]",
    slug: "Science",
  },
  {
    name: "History",
    description: "Travel through time and discover stories from the past.",
    icon: History,
    color: "bg-[#F2E3E0]",
    iconColor: "text-[#99594E]",
    slug: "History",
  },
  {
    name: "Biography",
    description: "Learn from the lives of remarkable people.",
    icon: UserRound,
    color: "bg-[#E9E2F3]",
    iconColor: "text-[#74579B]",
    slug: "Biography",
  },
  {
    name: "Business",
    description: "Explore entrepreneurship, leadership, and business strategy.",
    icon: BriefcaseBusiness,
    color: "bg-[#E0E8E9]",
    iconColor: "text-[#416A70]",
    slug: "Business",
  },
  {
    name: "Self-Development",
    description: "Build better habits and unlock your personal potential.",
    icon: Lightbulb,
    color: "bg-[#F5EED8]",
    iconColor: "text-[#92762D]",
    slug: "Self-Development",
  },
  {
    name: "Romance",
    description: "Discover heartfelt stories about love and relationships.",
    icon: Heart,
    color: "bg-[#F5E1E8]",
    iconColor: "text-[#A34F70]",
    slug: "Romance",
  },
  {
    name: "Education",
    description: "Find learning resources to expand your knowledge.",
    icon: BookText,
    color: "bg-[#E2E8F5]",
    iconColor: "text-[#4B639A]",
    slug: "Education",
  },
  {
    name: "Astronomy",
    description: "Explore stars, planets, galaxies, and the cosmos.",
    icon: Telescope,
    color: "bg-[#E2E4F4]",
    iconColor: "text-[#535B9B]",
    slug: "Astronomy",
  },
  {
    name: "Philosophy",
    description: "Explore ideas, wisdom, and life's biggest questions.",
    icon: Landmark,
    color: "bg-[#EDE6DC]",
    iconColor: "text-[#79674D]",
    slug: "Philosophy",
  },
  {
    name: "General",
    description: "Discover more books across a variety of subjects.",
    icon: Sparkles,
    color: "bg-[#E6E9E5]",
    iconColor: "text-[#5E715B]",
    slug: "General",
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#172A3A]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#172A3A]">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-[#C59D5F]/20" />
        <div className="absolute -right-8 -top-12 h-52 w-52 rounded-full border border-[#C59D5F]/20" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-5 flex items-center gap-2 text-sm text-[#C59D5F]">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white/70">Categories</span>
          </div>

          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#C59D5F]">
              Find Your Next Read
            </p>

            <h1 className="font-serif text-4xl font-medium leading-tight text-[#FAF9F6] sm:text-5xl md:text-7xl">
              Explore Books by{" "}
              <span className="italic text-[#C59D5F]">Category.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
              From timeless fiction to groundbreaking technology, discover
              books that match your curiosity and inspire your imagination.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <BookOpen size={17} className="text-[#C59D5F]" />
                Explore different subjects
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-[#C59D5F] sm:block" />
              <span className="flex items-center gap-2">
                <Sparkles size={17} className="text-[#C59D5F]" />
                Find your next favorite
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#B18A4E]">
              Browse Collection
            </p>

            <h2 className="font-serif text-3xl font-medium md:text-4xl">
              Explore by Interest
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#172A3A]/60">
              Choose a category and discover books selected for your interests.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#172A3A]/60">
            <BookOpen size={18} className="text-[#C59D5F]" />
            <span>{categories.length} categories to explore</span>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.slug}
                href={`/books?category=${encodeURIComponent(category.slug)}`}
                className="group relative flex min-h-64 flex-col border border-[#172A3A]/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#C59D5F]/70 hover:shadow-xl hover:shadow-[#172A3A]/5"
              >
                <div className="mb-7 flex items-start justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center ${category.color}`}
                  >
                    <Icon size={26} strokeWidth={1.6} className={category.iconColor} />
                  </div>

                  <span className="font-serif text-sm text-[#172A3A]/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-medium transition group-hover:text-[#A47C3D]">
                  {category.name}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-[#172A3A]/60">
                  {category.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-[#172A3A]/10 pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#172A3A]/60">
                    Explore Books
                  </span>

                  <ArrowRight
                    size={18}
                    className="text-[#C59D5F] transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="px-6 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 bg-[#F0E8DA] px-7 py-10 sm:px-10 md:flex-row md:items-center md:px-14 md:py-12">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#A47C3D]">
              A World of Stories
            </p>

            <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl">
              Every great journey begins with a book.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#172A3A]/65">
              Find a new perspective, learn something meaningful, or simply
              enjoy a wonderful story.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex shrink-0 items-center justify-center gap-3 bg-[#172A3A] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#263F53]"
          >
            Browse All Books
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

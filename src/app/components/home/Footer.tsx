import Link from "next/link";
import { cacheLife } from "next/cache";
import {
  ArrowUpRight,
  BookOpen,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/",
    icon: FaInstagram,
  },
  {
    name: "GitHub",
    href: "https://github.com/",
    icon: FaGithub,
  },
];

async function getCopyrightYear() {
  "use cache";
  cacheLife("days");

  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await getCopyrightYear();

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <Link
              href="/"
              aria-label="BookNook home"
              className="inline-flex items-center gap-2.5"
            >
              <BookOpen
                size={34}
                strokeWidth={2}
                aria-hidden="true"
                className="text-brass"
              />

              <span className="font-serif text-2xl font-bold text-white">
                Book<span className="text-brass">Nook</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-cream-muted">
              Your little corner of knowledge and imagination. Discover
              wonderful books, explore new ideas, and make every reading moment
              meaningful.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream transition duration-300 hover:border-brass hover:bg-brass hover:text-ink"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="mb-6 font-serif text-lg font-semibold text-white">
              Quick Links
            </h2>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-cream-muted transition hover:translate-x-1 hover:text-brass"
                  >
                    <ArrowUpRight size={14} aria-hidden="true" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 font-serif text-lg font-semibold text-white">
              Explore Categories
            </h2>

            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/books?category=${encodeURIComponent(category)}`}
                    className="text-sm text-cream-muted transition hover:text-brass"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 font-serif text-lg font-semibold text-white">
              Get in Touch
            </h2>

            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Mail
                  size={19}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brass"
                />
                <a
                  href="mailto:hello@booknook.com"
                  className="text-sm text-cream-muted transition hover:text-brass"
                >
                  hello@booknook.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Phone
                  size={19}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brass"
                />
                <a
                  href="tel:+8801000000000"
                  className="text-sm text-cream-muted transition hover:text-brass"
                >
                  +880 1000-000000
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin
                  size={19}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brass"
                />
                <span className="text-sm leading-6 text-cream-muted">
                  Dhaka, Bangladesh
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-y border-white/10 py-8 text-center">
          <p className="font-serif text-xl italic text-white sm:text-2xl">
            &ldquo;A room without books is like a body without a soul.&rdquo;
          </p>

          <p className="mt-3 text-xs font-semibold tracking-[0.2em] text-brass">
            KEEP READING, KEEP GROWING
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-cream-subtle">
            © {year} BookNook. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-cream-subtle">
            <Link href="/" className="transition hover:text-brass">
              Privacy Policy
            </Link>

            <Link href="/" className="transition hover:text-brass">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

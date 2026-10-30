
import Link from "next/link";
import {
  BookOpen,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

const categories = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

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

export default function Footer() {
  return (
    <footer className="bg-[#172A35] text-[#D6E1E8]">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 md:px-8">

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <BookOpen
                size={34}
                strokeWidth={2}
                className="text-[#D6A85F]"
              />

              <span className="font-serif text-2xl font-bold text-white">
                Book<span className="text-[#D6A85F]">Nook</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-[#A9BBC5]">
              Your little corner of knowledge and imagination.
              Discover wonderful books, explore new ideas, and
              make every reading moment meaningful.
            </p>

            {/* Social Links */}
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#D6E1E8] transition duration-300 hover:border-[#D6A85F] hover:bg-[#D6A85F] hover:text-[#172A35]"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-[#A9BBC5] transition hover:translate-x-1 hover:text-[#D6A85F]"
                  >
                    <ArrowUpRight size={14} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-semibold text-white">
              Explore Categories
            </h3>

            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/books?category=${encodeURIComponent(category)}`}
                    className="text-sm text-[#A9BBC5] transition hover:text-[#D6A85F]"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-semibold text-white">
              Get in Touch
            </h3>

            <ul className="space-y-5">

              <li className="flex items-start gap-3">
                <Mail
                  size={19}
                  className="mt-0.5 shrink-0 text-[#D6A85F]"
                />
                <a
                  href="mailto:hello@booknook.com"
                  className="text-sm text-[#A9BBC5] transition hover:text-[#D6A85F]"
                >
                  hello@booknook.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Phone
                  size={19}
                  className="mt-0.5 shrink-0 text-[#D6A85F]"
                />
                <a
                  href="tel:+8801000000000"
                  className="text-sm text-[#A9BBC5] transition hover:text-[#D6A85F]"
                >
                  +880 1000-000000
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin
                  size={19}
                  className="mt-0.5 shrink-0 text-[#D6A85F]"
                />
                <span className="text-sm leading-6 text-[#A9BBC5]">
                  Dhaka, Bangladesh
                </span>
              </li>

            </ul>
          </div>

        </div>

        {/* Newsletter / Quote */}
        <div className="mt-14 border-y border-white/10 py-8 text-center">
          <p className="font-serif text-xl italic text-white sm:text-2xl">
            "A room without books is like a body without a soul."
          </p>

          <p className="mt-3 text-xs font-semibold tracking-[0.2em] text-[#D6A85F]">
            KEEP READING, KEEP GROWING
          </p>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-center sm:flex-row sm:text-left">

          <p className="text-sm text-[#91A5B0]">
            © {new Date().getFullYear()} BookNook. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-[#91A5B0]">
            <Link
              href="/"
              className="transition hover:text-[#D6A85F]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/"
              className="transition hover:text-[#D6A85F]"
            >
              Terms of Service
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}

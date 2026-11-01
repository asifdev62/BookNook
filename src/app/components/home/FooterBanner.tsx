import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const FooterBanner = () => {
    return (
          
      <section className="px-6 pb-20 md:px-10 md:pb-30 mt-15">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 bg-[#F0E8DA] px-7 py-10 sm:px-10 md:flex-row md:items-center md:px-14 md:py-12">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#A47C3D]">
              A World of Stories
            </p>

            <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl text-[#172A3A]">
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
    );
};

export default FooterBanner;
"use client";

import Image from "next/image";
import Link from "next/link";
import { A11y, Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { useMounted } from "@/app/lib/use-mounted";
import { usePrefersReducedMotion } from "@/app/lib/use-prefers-reduced-motion";

type Slide = {
  subtitle: string;
  title: string;
  description: string;
  image: string;
};

const slides: Slide[] = [
  {
    subtitle: "WELCOME TO BOOKNOOK",
    title: "Every Book Opens a New World.",
    description:
      "Discover your next favorite story, explore new ideas, and let every page take you somewhere wonderful.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=90&w=2000",
  },
  {
    subtitle: "EXPLORE. READ. GROW.",
    title: "Find Your Next Great Read.",
    description:
      "From timeless classics to modern stories, explore a collection made for every curious mind.",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=90&w=2000",
  },
  {
    subtitle: "YOUR READING JOURNEY",
    title: "A Little Reading Goes a Long Way.",
    description:
      "Borrow books, discover knowledge, and make reading a beautiful part of your everyday life.",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=90&w=2000",
  },
];

function SlideContent({
  slide,
  priority = false,
}: {
  slide: Slide;
  priority?: boolean;
}) {
  return (
    <div className="relative flex min-h-155 items-center bg-ink md:min-h-175">
      <Image
        src={slide.image}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-ink/95 via-ink/75 to-ink/20"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold tracking-[0.3em] text-brass">
            {slide.subtitle}
          </p>

          <p className="text-balance font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
            {slide.title}
          </p>

          <p className="mt-6 max-w-xl text-pretty text-base leading-8 text-white/85 md:text-lg">
            {slide.description}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/books"
              className="inline-flex items-center gap-3 rounded-lg bg-brass px-8 py-4 font-semibold text-ink transition duration-300 hover:bg-brass-light"
            >
              Browse Books
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center rounded-lg border border-white/60 px-8 py-4 font-semibold text-white transition duration-300 hover:border-brass hover:bg-brass hover:text-ink"
            >
              Join BookNook
            </Link>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6 text-white">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-white/60">
                Membership
              </dt>
              <dd className="mt-1 font-serif text-2xl font-semibold">Free</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-white/60">
                Loan period
              </dt>
              <dd className="mt-1 font-serif text-xl font-semibold">
                14 days
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-white/60">
                Genres
              </dt>
              <dd className="mt-1 font-serif text-2xl font-semibold">6</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="absolute bottom-12 right-8 z-10 hidden text-right text-white/80 md:block">
        <p className="text-xs tracking-[0.3em] text-brass">
          BOOKNOOK LIBRARY
        </p>
        <p className="mt-2 font-serif text-2xl">Read. Discover. Repeat.</p>
      </div>
    </div>
  );
}

export default function Banner() {
  const mounted = useMounted();
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      <h1 id="hero-heading" className="sr-only">
        BookNook — discover your next favorite book
      </h1>

      {mounted ? (
        <>
          <Swiper
            modules={[A11y, Autoplay, EffectFade, Pagination]}
            effect="fade"
            loop
            speed={800}
            a11y={{ enabled: true }}
            autoplay={
              reduceMotion
                ? false
                : {
                    delay: 6000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
            }
            pagination={{ clickable: true }}
            className="booknook-banner"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.title}>
                <SlideContent slide={slide} priority={index === 0} />
              </SwiperSlide>
            ))}
          </Swiper>

          <style jsx global>{`
            .booknook-banner .swiper-pagination {
              bottom: 28px !important;
              text-align: left;
              padding-left: max(24px, calc((100vw - 1280px) / 2 + 48px));
            }

            .booknook-banner .swiper-pagination-bullet {
              width: 28px;
              height: 4px;
              border-radius: 10px;
              background: white;
              opacity: 0.45;
              transition: all 0.3s ease;
            }

            .booknook-banner .swiper-pagination-bullet-active {
              width: 48px;
              background: #d6a85f;
              opacity: 1;
            }
          `}</style>
        </>
      ) : (
        <SlideContent slide={slides[0]} priority />
      )}
    </section>
  );
}

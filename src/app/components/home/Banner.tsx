
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Autoplay, EffectFade, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/pagination";

// const slides = [
//   {
//     subtitle: "WELCOME TO BOOKNOOK",
//     title: "Every Book Opens a New World.",
//     description:
//       "Discover your next favorite story, explore new ideas, and let every page take you somewhere wonderful.",
//     image:
//       "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=90&w=2000",
//   },
//   {
//     subtitle: "EXPLORE. READ. GROW.",
//     title: "Find Your Next Great Read.",
//     description:
//       "From timeless classics to modern stories, explore a collection made for every curious mind.",
//     image:
//       "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=90&w=2000",
//   },
//   {
//     subtitle: "YOUR READING JOURNEY",
//     title: "A Little Reading Goes a Long Way.",
//     description:
//       "Borrow books, discover knowledge, and make reading a beautiful part of your everyday life.",
//     image:
//       "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=90&w=2000",
//   },
// ];

// export default function Banner() {
//   return (
//     <section className="relative overflow-hidden">
//       <Swiper
//         modules={[Autoplay, EffectFade, Pagination]}
//         effect="fade"
//         loop
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         className="booknook-banner"
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div className="relative flex min-h-[560px] items-center bg-[#123F38] md:min-h-[650px]">
//               <Image
//                 src={slide.image}
//                 alt="Beautiful library and books"
//                 fill
//                 priority={index === 0}
//                 sizes="100vw"
//                 className="object-cover"
//               />

//               {/* Dark overlay */}
//               <div className="absolute inset-0 bg-gradient-to-r from-[#092B27]/95 via-[#092B27]/75 to-[#092B27]/20" />

//               {/* Content */}
//               <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-12">
//                 <div className="max-w-2xl">
//                   <p className="mb-5 text-sm font-semibold tracking-[0.3em] text-[#D8B878]">
//                     {slide.subtitle}
//                   </p>

//                   <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
//                     {slide.title}
//                   </h1>

//                   <p className="mt-6 max-w-xl text-base leading-8 text-white/80 md:text-lg">
//                     {slide.description}
//                   </p>

//                   <div className="mt-9 flex flex-wrap gap-4">
//                     <Link
//                       href="/books"
//                       className="inline-flex items-center gap-3 bg-[#D8B878] px-8 py-4 font-semibold text-[#123F38] transition hover:bg-white"
//                     >
//                       Browse Books
//                       <span aria-hidden="true">→</span>
//                     </Link>

//                     <Link
//                       href="/#how-it-works"
//                       className="inline-flex items-center border border-white/50 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-[#123F38]"
//                     >
//                       How It Works
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               <div className="absolute bottom-12 right-8 z-10 hidden text-right text-white/70 md:block">
//                 <p className="text-xs tracking-[0.3em]">BOOKNOOK LIBRARY</p>
//                 <p className="mt-2 font-serif text-2xl">Read. Discover. Repeat.</p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <style jsx global>{`
//         .booknook-banner .swiper-pagination {
//           bottom: 28px !important;
//           text-align: left;
//           padding-left: max(24px, calc((100vw - 1280px) / 2 + 48px));
//         }

//         .booknook-banner .swiper-pagination-bullet {
//           width: 28px;
//           height: 4px;
//           border-radius: 0;
//           background: white;
//           opacity: 0.45;
//         }

//         .booknook-banner .swiper-pagination-bullet-active {
//           width: 48px;
//           background: #d8b878;
//           opacity: 1;
//         }
//       `}</style>
//     </section>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
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

export default function Banner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="min-h-[560px] bg-[#172A35] md:min-h-[650px]" />
    );
  }

  return (
    <section className="relative overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="booknook-banner"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex min-h-[560px] items-center bg-[#172A35] md:min-h-[650px]">

              {/* Background Image */}
              <Image
                src={slide.image}
                alt="BookNook reading and library atmosphere"
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#102A32]/95 via-[#102A32]/75 to-[#102A32]/20" />

              {/* Content */}
              <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-12">
                <div className="max-w-2xl">

                  <p className="mb-5 text-sm font-semibold tracking-[0.3em] text-[#D6A85F]">
                    {slide.subtitle}
                  </p>

                  <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
                    {slide.title}
                  </h1>

                  <p className="mt-6 max-w-xl text-base leading-8 text-white/85 md:text-lg">
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div className="mt-9 flex flex-wrap gap-4">

                    <Link
                      href="/books"
                      className="inline-flex items-center gap-3 rounded-lg bg-[#D6A85F] px-8 py-4 font-semibold text-[#172A35] transition duration-300 hover:bg-[#E7BE7D]"
                    >
                      Browse Books
                      <span aria-hidden="true">→</span>
                    </Link>

                    <Link
                      href="/#how-it-works"
                      className="inline-flex items-center rounded-lg border border-white/60 px-8 py-4 font-semibold text-white transition duration-300 hover:border-[#D6A85F] hover:bg-[#D6A85F] hover:text-[#172A35]"
                    >
                      How It Works
                    </Link>

                  </div>
                </div>
              </div>

              {/* Bottom Right Text */}
              <div className="absolute bottom-12 right-8 z-10 hidden text-right text-white/80 md:block">
                <p className="text-xs tracking-[0.3em] text-[#D6A85F]">
                  BOOKNOOK LIBRARY
                </p>

                <p className="mt-2 font-serif text-2xl">
                  Read. Discover. Repeat.
                </p>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper Pagination */}
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
    </section>
  );
}



"use client";

import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  UserRound,
  Mail,
  CalendarDays,
  BookOpen,
  Library,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import { authClient } from "@/app/lib/auth-client";
import { API_URL } from "@/app/lib/api";

interface User {
  name: string;
  email: string;
  image?: string;
  createdAt?: string;
}

interface BorrowedBook {
  returned?: boolean;
  active?: boolean;
}

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalBorrows, setTotalBorrows] = useState(0);

  const email = session?.user?.email;

  // Fetch Profile Data
  useEffect(() => {
    if (isPending || !email) return;

    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const encodedEmail = encodeURIComponent(email);

        const [profileRes, booksRes, borrowsRes] = await Promise.all([
          fetch(`${API_URL}/user-profile?email=${encodedEmail}`),

          fetch(`${API_URL}/my-books?email=${encodedEmail}`),

          fetch(`${API_URL}/my-borrows?email=${encodedEmail}`),
        ]);

        if (!profileRes.ok || !booksRes.ok || !borrowsRes.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const profileData = await profileRes.json();
        const booksData = await booksRes.json();
        const borrowsData: BorrowedBook[] = await borrowsRes.json();

        if (!isMounted) return;

        setUser(profileData);

        setTotalBooks(
          Array.isArray(booksData)
            ? booksData.length
            : booksData.books?.length || 0
        );

        setTotalBorrows(
          Array.isArray(borrowsData)
            ? borrowsData.filter(
                (book) =>
                  book.returned !== true && book.active !== false
              ).length
            : 0
        );
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [email, isPending]);


    // Loading
    if (isPending) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#FAF9F6] dark:bg-[#172A3A]">
          <Loader2 className="animate-spin text-[#C59D5F]" size={35} />
  
          <h3 className="text-sm font-medium text-[#172A3A] dark:text-white">
            Please Wait...
          </h3>
        </div>
      );
    }

  // Login Check
  if (!session?.user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF9F6] px-5 dark:bg-[#172A3A]">
        <div className="flex h-20 w-20 items-center justify-center border border-[#C59D5F]/40 bg-[#C59D5F]/10">
          <UserRound size={38} className="text-[#C59D5F]" />
        </div>

        <h1 className="mt-6 font-serif text-2xl font-bold text-[#172A3A] dark:text-white">
          Please Login First
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Login to view your profile.
        </p>

        <Link
          href="/login"
          className="mt-6 bg-[#172A3A] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C59D5F]"
        >
          Login Now
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-4 py-10 text-[#172A3A] dark:bg-[#172A3A] dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">

        {/* Profile Header */}
        <section className="border border-[#E8E1D5] bg-white p-6 dark:border-white/10 dark:bg-[#1C3548] sm:p-10">
          <div className="flex flex-col items-center gap-6 sm:flex-row">

            <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-[#C59D5F] bg-[#172A3A]">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <UserRound size={48} className="text-[#C59D5F]" />
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#C59D5F]">
                My Profile
              </p>

              <h1 className="text-3xl font-bold">
                {user?.name || session.user.name}
              </h1>

              <p className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-300 sm:justify-start">
                <Mail size={16} />
                {user?.email || session.user.email}
              </p>
            </div>

            <Link
              href="/userProfileUpdate"
              className="flex shrink-0 items-center gap-1 border border-[#C59D5F] p-2 text-sm font-medium text-[#172A3A] transition hover:bg-[#C59D5F]/10 dark:text-white"
            >
              <CiEdit size={20} />
              Edit Profile
            </Link>

          </div>
        </section>

        {/* Statistics */}
        <section>
          <h2 className="mb-5 text-xl font-bold">
            Reading Statistics
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">

            <div className="flex items-center gap-4 border border-[#E8E1D5] bg-white p-6 dark:border-white/10 dark:bg-[#1C3548]">
              <div className="flex h-12 w-12 items-center justify-center bg-[#C59D5F]/15 text-[#C59D5F]">
                <Library size={25} />
              </div>

              <div>
                <p className="text-2xl font-bold">{totalBooks}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Books Added
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border border-[#E8E1D5] bg-white p-6 dark:border-white/10 dark:bg-[#1C3548]">
              <div className="flex h-12 w-12 items-center justify-center bg-[#C59D5F]/15 text-[#C59D5F]">
                <BookOpen size={25} />
              </div>

              <div>
                <p className="text-2xl font-bold">{totalBorrows}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Books Borrowed
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Account Information */}
        <section className="border border-[#E8E1D5] bg-white p-6 dark:border-white/10 dark:bg-[#1C3548] sm:p-8">
          <h2 className="mb-6 text-xl font-bold">
            Account Information
          </h2>

          <div className="space-y-5">

            <div className="flex items-center gap-3 border-b border-[#E8E1D5] pb-4 dark:border-white/10">
              <UserRound className="text-[#C59D5F]" />

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Full Name
                </p>

                <p className="font-semibold">
                  {user?.name || session.user.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-b border-[#E8E1D5] pb-4 dark:border-white/10">
              <Mail className="text-[#C59D5F]" />

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Email Address
                </p>

                <p className="font-semibold">
                  {user?.email || session.user.email}
                </p>
              </div>
            </div>

            {user?.createdAt && (
              <div className="flex items-center gap-3">
                <CalendarDays className="text-[#C59D5F]" />

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Member Since
                  </p>

                  <p className="font-semibold">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#C59D5F] transition hover:gap-3"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}

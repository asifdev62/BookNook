

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bookmark,
  BookOpen,
  BookPlus,
  ChevronDown,
  Library,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";

import ThemeToggle from "@/app/components/ThemeToggle";
import { authClient } from "@/app/lib/auth-client";


const publicLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
];

const privateLinks = [
  { name: "Add Book", href: "/add-book", icon: BookPlus },
  { name: "My Books", href: "/my-books", icon: Library },
  { name: "My Borrows", href: "/my-borrows", icon: Bookmark },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

 
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    if (!profileMenu) return;

    function handleClick(event: MouseEvent) {
      if (!profileRef.current?.contains(event.target as Node)) {
        setProfileMenu(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [profileMenu]);


  useEffect(() => {
    if (!mobileMenu) return;

    const oldOverflow = document.body.style.overflow;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenu(false);
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenu]);

 
  function closeMenus() {
    setMobileMenu(false);
    setProfileMenu(false);
  }

  // Logout function
  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          closeMenus();
          router.push("/");
          router.refresh();
        },
      },
    });
  }

  
  function isActive(href: string) {
    if (href.includes("#")) return false;

    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(href + "/");
  }

 
  const activeClass = "text-teal dark:text-brass";
  const inactiveClass =
    "text-slate hover:text-teal dark:text-cream-muted dark:hover:text-brass";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-paper/95 backdrop-blur-md dark:border-white/10 dark:bg-ink/95">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-19 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          aria-label="BookNook home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <BookOpen
            size={34}
            strokeWidth={2}
            aria-hidden="true"
            className="text-navy dark:text-brass"
          />

          <span className="font-serif text-2xl font-bold tracking-tight text-navy dark:text-white">
            Book<span className="text-brass-dark dark:text-brass">Nook</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenus}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`relative py-2 text-sm font-medium transition-colors ${
                isActive(link.href) ? activeClass : inactiveClass
              }`}
            >
              {link.name}

              {isActive(link.href) && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-brass"
                />
              )}
            </Link>
          ))}

          
          {user &&
            privateLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href) ? activeClass : inactiveClass
                }`}
              >
                {link.name}
              </Link>
            ))}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-navy transition hover:bg-paper-2 dark:border-white/20 dark:text-brass dark:hover:bg-white/10" />

          {/* Session loading */}
          {isPending && (
            <div
              aria-hidden="true"
              className="h-10 w-28 animate-pulse rounded-full bg-paper-2 dark:bg-white/10"
            />
          )}

          {/* Login  Register */}
          {!isPending && !user && (
            <>
              <Link
                href="/login"
                onClick={closeMenus}
                className="rounded-lg border border-navy px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white dark:border-brass dark:text-brass dark:hover:bg-brass dark:hover:text-ink"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={closeMenus}
                className="rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-dark dark:bg-brass dark:text-ink dark:hover:bg-brass-light"
              >
                Register
              </Link>
            </>
          )}

          {/* Profile Dropdown */}
          {user && (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileMenu(!profileMenu)}
                aria-expanded={profileMenu}
                aria-controls="profile-menu"
                aria-haspopup="true"
                className="flex items-center gap-2 rounded-full border border-line-strong p-1.5 pr-3 transition hover:bg-paper-2 dark:border-white/20 dark:hover:bg-white/10"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <span className="max-w-24 truncate text-sm font-semibold text-slate dark:text-white">
                  {user.name}
                </span>

                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={`text-navy transition-transform dark:text-brass ${
                    profileMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileMenu && (
                <div
                  id="profile-menu"
                  className="absolute right-0 top-14 w-56 overflow-hidden rounded-xl border border-line bg-white p-2 shadow-xl dark:border-white/10 dark:bg-ink-2"
                >
                  <div className="border-b border-line px-3 py-3 dark:border-white/10">
                    <p className="truncate text-sm font-semibold text-navy dark:text-white">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-muted dark:text-cream-muted">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm  transition hover:bg-paper-2 dark:text-cream-muted dark:hover:bg-white/10 text-slate"
                  >
                    <UserRound size={17} aria-hidden="true" />
                    My Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-danger transition hover:bg-danger-bg dark:text-danger-light dark:hover:bg-red-500/10"
                  >
                    <LogOut size={17} aria-hidden="true" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Right Side */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle className="flex h-10 w-10 items-center justify-center rounded-full text-navy dark:text-brass" />

          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label={mobileMenu ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenu}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-navy dark:text-white"
          >
            {mobileMenu ? (
              <X size={25} aria-hidden="true" />
            ) : (
              <Menu size={25} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100vh-76px)] overflow-y-auto overscroll-contain border-t border-line bg-paper px-5 py-5 shadow-lg dark:border-white/10 dark:bg-ink lg:hidden"
        >
          <div className="flex flex-col gap-2">
            {/* Public links */}
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-lg px-4 py-3 text-sm font-semibold ${
                  isActive(link.href)
                    ? "bg-teal text-white"
                    : "text-slate hover:bg-paper-2 dark:text-cream-muted dark:hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Private links */}
            {user &&
              privateLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenus}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold ${
                      isActive(link.href)
                        ? "bg-teal text-white"
                        : "text-slate hover:bg-paper-2 dark:text-cream-muted dark:hover:bg-white/10"
                    }`}
                  >
                    <Icon size={18} aria-hidden="true" />
                    {link.name}
                  </Link>
                );
              })}

            <div className="my-2 border-t border-line dark:border-white/10" />

            {/* Logged out user */}
            {!isPending && !user && (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="rounded-lg border border-navy py-3 text-center text-sm font-semibold text-navy dark:border-brass dark:text-brass"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenus}
                  className="rounded-lg bg-teal py-3 text-center text-sm font-semibold text-white dark:bg-brass dark:text-ink"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Logged in user */}
            {user && (
              <>
                <div className="flex items-center gap-3 px-3 py-2">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal font-bold text-white">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-navy dark:text-white">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-muted dark:text-cream-muted">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                href={"/profile"}
                  onClick={closeMenus}
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-slate hover:bg-paper-2 dark:text-cream-muted dark:hover:bg-white/10 text-"
                >
                  My Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold text-danger hover:bg-danger-bg dark:text-danger-light dark:hover:bg-red-500/10"
                >
                  <LogOut size={18} aria-hidden="true" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}


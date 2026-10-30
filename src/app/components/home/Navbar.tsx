
// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useTheme } from "next-themes";
// import {
//   BookOpen,
//   Menu,
//   X,
//   Sun,
//   Moon,
//   ChevronDown,
//   UserRound,
//   LogOut,
//   BookPlus,
//   Library,
//   Bookmark,
// } from "lucide-react";

// import { authClient } from "@/lib/auth-client";
// import Image from "next/image";

// const publicLinks = [
//   { name: "Home", href: "/" },
//   { name: "All Books", href: "/books" },
// ];

// const privateLinks = [
//   { name: "Add Book", href: "/add-book", icon: BookPlus },
//   { name: "My Books", href: "/my-books", icon: Library },
//   { name: "My Borrows", href: "/my-borrows", icon: Bookmark },
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const { data: session, isPending } = authClient.useSession();
//   const { theme, setTheme } = useTheme();

//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [profileMenu, setProfileMenu] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   const user = session?.user;

//   useEffect(() => {
//     setMounted(true);
//   }, []);
//   useEffect(() => {
//     setMobileMenu(false);
//     setProfileMenu(false);
//   }, [pathname]);

//   const handleLogout = async () => {
//     await authClient.signOut({
//       fetchOptions: {
//         onSuccess: () => {
//           setProfileMenu(false);
//           setMobileMenu(false);
//           router.push("/");
//           router.refresh();
//         },
//       },
//     });
//   };

//   const isActive = (href: string) => {
//     if (href === "/") return pathname === "/";
//     return pathname === href || pathname.startsWith(`${href}/`);
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-[#e8e4da] bg-[#FAF8F1]/95 backdrop-blur-md dark:border-white/10 dark:bg-[#102d29]/95">
//       <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

//         {/* Logo */}
//         <Link
//           href="/"
//           className="flex shrink-0 items-center gap-2.5"
//         >
//           <BookOpen
//             size={34}
//             strokeWidth={2}
//             className="text-[#123F38] dark:text-[#d6a45d]"
//           />

//           <span className="font-serif text-2xl font-bold tracking-tight text-[#123F38] dark:text-white">
//             Book<span className="text-[#C69B52]">Nook</span>
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden items-center gap-8 lg:flex">
//           {publicLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`relative py-2 text-sm font-medium transition-colors ${
//                 isActive(link.href)
//                   ? "text-[#C69B52]"
//                   : "text-[#183B36] hover:text-[#C69B52] dark:text-gray-200"
//               }`}
//             >
//               {link.name}

//               {isActive(link.href) && (
//                 <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#C69B52]" />
//               )}
//             </Link>
//           ))}

//           {/* Private Links */}
//           {user &&
//             privateLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`text-sm font-medium transition-colors ${
//                   isActive(link.href)
//                     ? "text-[#C69B52]"
//                     : "text-[#183B36] hover:text-[#C69B52] dark:text-gray-200"
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//         </div>

//         {/* Right Side */}
//         <div className="hidden items-center gap-3 lg:flex">

//           {/* Theme Toggle */}
//           {mounted && (
//             <button
//               onClick={() =>
//                 setTheme(theme === "dark" ? "light" : "dark")
//               }
//               aria-label="Toggle theme"
//               className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9d5c9] text-[#123F38] transition hover:bg-[#eae6dc] dark:border-white/20 dark:text-white dark:hover:bg-white/10"
//             >
//               {theme === "dark" ? (
//                 <Sun size={19} />
//               ) : (
//                 <Moon size={19} />
//               )}
//             </button>
//           )}

//           {/* Authentication */}
//           {!isPending && !user && (
//             <>
//               <Link
//                 href="/login"
//                 className="rounded-lg border border-[#123F38] px-5 py-2.5 text-sm font-semibold text-[#123F38] transition hover:bg-[#123F38] hover:text-white dark:border-white/50 dark:text-white"
//               >
//                 Login
//               </Link>

//               <Link
//                 href="/register"
//                 className="rounded-lg bg-[#123F38] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1C6656] dark:bg-[#C69B52] dark:text-[#102d29]"
//               >
//                 Register
//               </Link>
//             </>
//           )}

//           {/* User Profile */}
//           {user && (
//             <div className="relative">
//               <button
//                 onClick={() => setProfileMenu(!profileMenu)}
//                 className="flex items-center gap-2 rounded-full border border-[#e4dfd2] p-1.5 pr-3 transition hover:bg-[#f0ede4] dark:border-white/20 dark:hover:bg-white/10"
//               >
//                 {user.image ? (
//                   <Image
//                     src={user.image}
//                     alt={user.name || "User"}
//                     className="h-9 w-9 rounded-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#123F38] text-sm font-bold text-white">
//                     {user.name?.charAt(0).toUpperCase() || "U"}
//                   </div>
//                 )}

//                 <span className="max-w-24 truncate text-sm font-semibold text-[#183B36] dark:text-white">
//                   {user.name}
//                 </span>

//                 <ChevronDown
//                   size={16}
//                   className={`text-[#123F38] transition-transform dark:text-white ${
//                     profileMenu ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {/* Profile Dropdown */}
//               {profileMenu && (
//                 <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-xl border border-[#e8e4da] bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#163c35]">

//                   <div className="border-b border-gray-100 px-3 py-3 dark:border-white/10">
//                     <p className="truncate text-sm font-semibold text-[#123F38] dark:text-white">
//                       {user.name}
//                     </p>
//                     <p className="truncate text-xs text-gray-500 dark:text-gray-400">
//                       {user.email}
//                     </p>
//                   </div>

//                   <Link
//                     href="/profile"
//                     onClick={() => setProfileMenu(false)}
//                     className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-700 transition hover:bg-[#f5f2e9] dark:text-gray-200 dark:hover:bg-white/10"
//                   >
//                     <UserRound size={17} />
//                     My Profile
//                   </Link>

//                   <button
//                     onClick={handleLogout}
//                     className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-500/10"
//                   >
//                     <LogOut size={17} />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Mobile Controls */}
//         <div className="flex items-center gap-2 lg:hidden">

//           {mounted && (
//             <button
//               onClick={() =>
//                 setTheme(theme === "dark" ? "light" : "dark")
//               }
//               aria-label="Toggle theme"
//               className="flex h-10 w-10 items-center justify-center rounded-full text-[#123F38] dark:text-white"
//             >
//               {theme === "dark" ? (
//                 <Sun size={20} />
//               ) : (
//                 <Moon size={20} />
//               )}
//             </button>
//           )}

//           <button
//             onClick={() => setMobileMenu(!mobileMenu)}
//             aria-label="Toggle navigation"
//             className="flex h-10 w-10 items-center justify-center rounded-lg text-[#123F38] dark:text-white"
//           >
//             {mobileMenu ? <X size={25} /> : <Menu size={25} />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {mobileMenu && (
//         <div className="border-t border-[#e8e4da] bg-[#FAF8F1] px-5 py-5 shadow-lg dark:border-white/10 dark:bg-[#102d29] lg:hidden">

//           <div className="flex flex-col gap-2">

//             {publicLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`rounded-lg px-4 py-3 text-sm font-semibold ${
//                   isActive(link.href)
//                     ? "bg-[#123F38] text-white"
//                     : "text-[#183B36] hover:bg-[#eeeadf] dark:text-white dark:hover:bg-white/10"
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}

//             {user &&
//               privateLinks.map((link) => {
//                 const Icon = link.icon;

//                 return (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold ${
//                       isActive(link.href)
//                         ? "bg-[#123F38] text-white"
//                         : "text-[#183B36] hover:bg-[#eeeadf] dark:text-white dark:hover:bg-white/10"
//                     }`}
//                   >
//                     <Icon size={18} />
//                     {link.name}
//                   </Link>
//                 );
//               })}

//             <div className="my-2 border-t border-[#e8e4da] dark:border-white/10" />

//             {!isPending && !user && (
//               <div className="grid grid-cols-2 gap-3">
//                 <Link
//                   href="/login"
//                   className="rounded-lg border border-[#123F38] py-3 text-center text-sm font-semibold text-[#123F38] dark:border-white/50 dark:text-white"
//                 >
//                   Login
//                 </Link>

//                 <Link
//                   href="/register"
//                   className="rounded-lg bg-[#123F38] py-3 text-center text-sm font-semibold text-white dark:bg-[#C69B52] dark:text-[#102d29]"
//                 >
//                   Register
//                 </Link>
//               </div>
//             )}

//             {user && (
//               <>
//                 <div className="flex items-center gap-3 px-3 py-2">
//                   {user.image ? (
//                     <Image
//                       src={user.image}
//                       alt={user.name || "User"}
//                       className="h-10 w-10 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#123F38] font-bold text-white">
//                       {user.name?.charAt(0).toUpperCase() || "U"}
//                     </div>
//                   )}

//                   <div className="min-w-0">
//                     <p className="truncate text-sm font-semibold text-[#123F38] dark:text-white">
//                       {user.name}
//                     </p>
//                     <p className="truncate text-xs text-gray-500">
//                       {user.email}
//                     </p>
//                   </div>
//                 </div>

//                 <Link
//                   href="/profile"
//                   className="rounded-lg px-4 py-3 text-sm font-semibold text-[#183B36] hover:bg-[#eeeadf] dark:text-white dark:hover:bg-white/10"
//                 >
//                   My Profile
//                 </Link>

//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }




"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  BookOpen,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  UserRound,
  LogOut,
  BookPlus,
  Library,
  Bookmark,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

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
  const { theme, setTheme } = useTheme();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileMenu(false);
    setProfileMenu(false);
  }, [pathname]);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setProfileMenu(false);
          setMobileMenu(false);
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const activeClass = "text-[#287C78]";
  const inactiveClass =
    "text-[#34495E] hover:text-[#287C78] dark:text-[#D6E1E8] dark:hover:text-[#D6A85F]";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E5DC] bg-[#FAF9F6]/95 backdrop-blur-md dark:border-white/10 dark:bg-[#172A35]/95">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
        >
          <BookOpen
            size={34}
            strokeWidth={2}
            className="text-[#243B53] dark:text-[#D6A85F]"
          />

          <span className="font-serif text-2xl font-bold tracking-tight text-[#243B53] dark:text-white">
            Book<span className="text-[#D6A85F]">Nook</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-2 text-sm font-medium transition-colors ${
                isActive(link.href) ? activeClass : inactiveClass
              }`}
            >
              {link.name}

              {isActive(link.href) && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#D6A85F]" />
              )}
            </Link>
          ))}

          {/* Private Links */}
          {user &&
            privateLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href) ? activeClass : inactiveClass
                }`}
              >
                {link.name}
              </Link>
            ))}
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-3 lg:flex">

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDD9CE] text-[#243B53] transition hover:bg-[#EEECE5] dark:border-white/20 dark:text-[#D6A85F] dark:hover:bg-white/10"
            >
              {theme === "dark" ? (
                <Sun size={19} />
              ) : (
                <Moon size={19} />
              )}
            </button>
          )}

          {/* Authentication */}
          {!isPending && !user && (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-[#243B53] px-5 py-2.5 text-sm font-semibold text-[#243B53] transition hover:bg-[#243B53] hover:text-white dark:border-[#D6A85F] dark:text-[#D6A85F] dark:hover:bg-[#D6A85F] dark:hover:text-[#172A35]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-[#287C78] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#206662] dark:bg-[#D6A85F] dark:text-[#172A35] dark:hover:bg-[#E3BD7C]"
              >
                Register
              </Link>
            </>
          )}

          {/* User Profile */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setProfileMenu(!profileMenu)}
                className="flex items-center gap-2 rounded-full border border-[#E5E0D5] p-1.5 pr-3 transition hover:bg-[#F0EEE8] dark:border-white/20 dark:hover:bg-white/10"
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
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#287C78] text-sm font-bold text-white">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <span className="max-w-24 truncate text-sm font-semibold text-[#34495E] dark:text-white">
                  {user.name}
                </span>

                <ChevronDown
                  size={16}
                  className={`text-[#243B53] transition-transform dark:text-[#D6A85F] ${
                    profileMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {profileMenu && (
                <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-xl border border-[#E8E5DC] bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#203B49]">

                  <div className="border-b border-[#EEECE5] px-3 py-3 dark:border-white/10">
                    <p className="truncate text-sm font-semibold text-[#243B53] dark:text-white">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-[#82909B] dark:text-[#B7C5CE]">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setProfileMenu(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#34495E] transition hover:bg-[#F2F4F1] dark:text-[#D6E1E8] dark:hover:bg-white/10"
                  >
                    <UserRound size={17} />
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#C45454] transition hover:bg-[#FFF1F0] dark:text-[#FF8585] dark:hover:bg-red-500/10"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">

          {mounted && (
            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#243B53] dark:text-[#D6A85F]"
            >
              {theme === "dark" ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </button>
          )}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#243B53] dark:text-white"
          >
            {mobileMenu ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="border-t border-[#E8E5DC] bg-[#FAF9F6] px-5 py-5 shadow-lg dark:border-white/10 dark:bg-[#172A35] lg:hidden">

          <div className="flex flex-col gap-2">

            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-3 text-sm font-semibold ${
                  isActive(link.href)
                    ? "bg-[#287C78] text-white"
                    : "text-[#34495E] hover:bg-[#EEECE5] dark:text-[#D6E1E8] dark:hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {user &&
              privateLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold ${
                      isActive(link.href)
                        ? "bg-[#287C78] text-white"
                        : "text-[#34495E] hover:bg-[#EEECE5] dark:text-[#D6E1E8] dark:hover:bg-white/10"
                    }`}
                  >
                    <Icon size={18} />
                    {link.name}
                  </Link>
                );
              })}

            <div className="my-2 border-t border-[#E8E5DC] dark:border-white/10" />

            {!isPending && !user && (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  className="rounded-lg border border-[#243B53] py-3 text-center text-sm font-semibold text-[#243B53] dark:border-[#D6A85F] dark:text-[#D6A85F]"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-lg bg-[#287C78] py-3 text-center text-sm font-semibold text-white dark:bg-[#D6A85F] dark:text-[#172A35]"
                >
                  Register
                </Link>
              </div>
            )}

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
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#287C78] font-bold text-white">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#243B53] dark:text-white">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-[#82909B] dark:text-[#B7C5CE]">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-[#34495E] hover:bg-[#EEECE5] dark:text-[#D6E1E8] dark:hover:bg-white/10"
                >
                  My Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold text-[#C45454] hover:bg-[#FFF1F0] dark:text-[#FF8585] dark:hover:bg-red-500/10"
                >
                  <LogOut size={18} />
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

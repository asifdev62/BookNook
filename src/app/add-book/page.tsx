

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { authClient } from "@/app/lib/auth-client";
// import {
//   BookOpen,
//   BookPlus,
//   UserRound,
//   Mail,
//   Upload,
//   Library,
// } from "lucide-react";

// export default function AddBookPage() {
//   const { data: session, isPending } = authClient.useSession();
//   const user = session?.user;

//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     category: "Fiction",
//     totalCopies: "1",
//     description: "",
//   });

//   const [bookImage, setBookImage] = useState<File | null>(null);
//   const [form, setForm] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setForm("");

//     if (!user) {
//       setForm("Please log in before adding a book.");
//       return;
//     }

//     const bookData = {
//       ...formData,
//       totalCopies: Number(formData.totalCopies),
//       userName: user.name ?? "",
//       userEmail: user.email ?? "",
      
//     };

//     try {
//       setSubmitting(true);

//       const res = await fetch("http://localhost:5000/add-book", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bookData),
//       });

//       const data = await res.json();
//       console.log(data);

//       if (!res.ok) {
//         setForm(data.message || "Failed to add book.");
//         return;
//       }

//       setForm("Book added successfully!");
//       setFormData({
//         title: "",
//         author: "",
//         category: "Fiction",
//         totalCopies: "1",
//         description: "",
//       });
//       setBookImage(null);
//     } catch (error) {
//       console.error(error);
//       setForm("Could not connect to the server.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const inputClass =
//     "w-full rounded-md border border-[#526575]/60 bg-[#293F50] px-3 py-1.5 text-xs text-[#F8F5EE] outline-none transition placeholder:text-gray-400 focus:border-[#D6A85F] focus:ring-1 focus:ring-[#D6A85F]/20";

//   const labelClass = "mb-1 block text-xs font-medium text-[#F1E8D7]";

//   return (
//     <main className="min-h-screen bg-[#0B141A] px-3 py-4 text-[#F8F5EE] sm:px-4 sm:py-5">
//       <div className="mx-auto max-w-xl overflow-hidden rounded-xl border border-[#526575]/40 bg-[#172A35] shadow-2xl shadow-black/30">
//         {/* Top Accent */}
//         <div className="h-0.5 w-full bg-gradient-to-r from-[#1C6656] via-[#D6A85F] to-[#1C6656]" />

//         {/* Header */}
//         <header className="border-b border-[#526575]/40 bg-gradient-to-br from-[#1C3340] to-[#172A35] px-4 py-3 text-center">
//           <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg border border-[#D6A85F]/30 bg-[#D6A85F]/10">
//             <BookOpen size={19} strokeWidth={1.7} className="text-[#D6A85F]" />
//           </div>

//           <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D6A85F]">
//             BookNook Library
//           </p>

//           <h1 className="font-serif text-xl font-bold text-[#F8F5EE]">
//             Add a Book
//           </h1>

//           <p className="mt-1 text-[11px] text-gray-400">
//             Share a new story with your library community.
//           </p>
//         </header>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-3 p-4 sm:p-5">
//           {/* Book Information */}
//           <div className="flex items-center gap-2">
//             <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#D6A85F]/10">
//               <Library size={15} className="text-[#D6A85F]" />
//             </div>

//             <div>
//               <h2 className="font-serif text-sm font-semibold text-[#F8F5EE]">
//                 Book Information
//               </h2>

//               <p className="text-[10px] text-gray-400">
//                 Enter your book details.
//               </p>
//             </div>
//           </div>

//           {/* Title & Author */}
//           <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
//             <div>
//               <label htmlFor="title" className={labelClass}>
//                 Book Title
//               </label>

//               <input
//                 id="title"
//                 name="title"
//                 type="text"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Enter book title"
//                 className={inputClass}
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="author" className={labelClass}>
//                 Author Name
//               </label>

//               <input
//                 id="author"
//                 name="author"
//                 type="text"
//                 value={formData.author}
//                 onChange={handleChange}
//                 placeholder="Enter author name"
//                 className={inputClass}
//                 required
//               />
//             </div>
//           </div>

//           {/* Category & Copies */}
//           <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
//             <div>
//               <label htmlFor="category" className={labelClass}>
//                 Category
//               </label>

//               <input
//                 id="category"
//                 name="category"
//                 type="text"
//                 className={inputClass}
//                 value={formData.author}
//                 onChange={handleChange}
//                 placeholder="category name"
//                 required
//               >
                
                
//               </input>
//             </div>

//             <div>
//               <label htmlFor="totalCopies" className={labelClass}>
//                 Total Copies
//               </label>

//               <input
//                 id="totalCopies"
//                 name="totalCopies"
//                 type="number"
//                 min="1"
//                 value={formData.totalCopies}
//                 onChange={handleChange}
//                 className={inputClass}
//                 required
//               />
//             </div>
//           </div>

//           {/* Book Image */}
//           <div>
//             <label htmlFor="bookImage" className={labelClass}>
//               Book Cover Image
//             </label>

//             <label
//               htmlFor="bookImage"
//               className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-[#526575] bg-[#293F50]/50 px-3 py-2 transition hover:border-[#D6A85F] hover:bg-[#293F50]"
//             >
//               <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D6A85F]/10">
//                 <Upload size={16} className="text-[#D6A85F]" />
//               </div>

//               <div className="min-w-0">
//                 <p className="truncate text-xs font-medium text-[#F8F5EE]">
//                   {bookImage ? bookImage.name : "Click to upload book cover"}
//                 </p>

//                 <p className="mt-0.5 text-[10px] text-gray-400">
//                   PNG, JPG or WEBP
//                 </p>
//               </div>

//               <input
//                 id="bookImage"
//                 type="file"
//                 accept="image/png,image/jpeg,image/webp"
//                 className="hidden"
//                 onChange={(e) => setBookImage(e.target.files?.[0] ?? null)}
//               />
//             </label>
//           </div>

//           {/* Description */}
//           <div>
//             <label htmlFor="description" className={labelClass}>
//               Short Description
//             </label>

//             <textarea
//               id="description"
//               name="description"
//               rows={2}
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Write a short description about this book..."
//               className={`${inputClass} resize-y`}
//               required
//             />
//           </div>

//           {/* Contributor Information */}
//           <div className="border-t border-[#526575]/40 pt-3">
//             <div className="mb-3 flex items-center gap-2">
//               <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#D6A85F]/10">
//                 <UserRound size={15} className="text-[#D6A85F]" />
//               </div>

//               <div>
//                 <h2 className="font-serif text-sm font-semibold text-[#F8F5EE]">
//                   Contributor Information
//                 </h2>

//                 <p className="text-[10px] text-gray-400">
//                   Your logged-in account details.
//                 </p>
//               </div>
//             </div>

//             {isPending ? (
//               <p className="text-xs text-gray-400">
//                 Loading account information...
//               </p>
//             ) : !user ? (
//               <div className="rounded-md border border-[#526575]/40 bg-[#293F50] p-3">
//                 <p className="text-xs text-gray-300">
//                   Please log in to add a book to the library.
//                 </p>

//                 <Link
//                   href="/signIn"
//                   className="mt-2 inline-block text-xs font-semibold text-[#D6A85F] hover:underline"
//                 >
//                   Go to Login →
//                 </Link>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
//                 {/* Logged-in User Name */}
//                 <div>
//                   <label htmlFor="userName" className={labelClass}>
//                     User Name
//                   </label>

//                   <div className="relative">
//                     <UserRound
//                       size={14}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D6A85F]"
//                     />

//                     <input
//                       id="userName"
//                       type="text"
//                       value={user.name ?? ""}
//                       readOnly
//                       className={`${inputClass} cursor-not-allowed pl-9 opacity-80`}
//                     />
//                   </div>
//                 </div>

//                 {/* Logged-in User Email */}
//                 <div>
//                   <label htmlFor="userEmail" className={labelClass}>
//                     User Email
//                   </label>

//                   <div className="relative">
//                     <Mail
//                       size={14}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D6A85F]"
//                     />

//                     <input
//                       id="userEmail"
//                       type="email"
//                       value={user.email ?? ""}
//                       readOnly
//                       className={`${inputClass} cursor-not-allowed pl-9 opacity-80`}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Message */}
//           {form && (
//             <p
//               role="status"
//               className="rounded-md border border-[#D6A85F]/20 bg-[#D6A85F]/10 p-2 text-xs text-[#F1E8D7]"
//             >
//               {form}
//             </p>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isPending || !user || submitting}
//             className="group flex w-full items-center justify-center gap-2 rounded-md bg-[#D6A85F] px-4 py-2 text-xs font-semibold text-[#0B141A] transition duration-300 hover:bg-[#E5BC78] focus:outline-none focus:ring-2 focus:ring-[#D6A85F] focus:ring-offset-2 focus:ring-offset-[#172A35] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             <BookPlus
//               size={15}
//               className="transition-transform duration-300 group-hover:-translate-y-0.5"
//             />

//             {submitting ? "Adding..." : "Add Book to Library"}
//           </button>

//           <p className="text-center text-[10px] text-gray-500">
//             Every book opens the door to a new world.
//           </p>
//         </form>
//       </div>
//     </main>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import {
  BookOpen,
  BookPlus,
  UserRound,
  Mail,
  Library,
} from "lucide-react";

export default function AddBookPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const categories = [
    "Fiction",
    "Self-Help",
    "Finance",
    "Programming",
    "Fantasy",
    "Science",
    "History",
    "Biography",
    "Romance",
    "Education",
    "Technology",
    "Philosophy",
    "Business",
  ];

  const [formData, setFormData] = useState({
    bookName: "",
    author: "",
    category: "Fiction",
    price: "",
    rating: "4.5",
    image: "",
    description: "",
    publishedYear: "",
    availableCopies: "1",
    isNewArrival: true,
  });

  const [form, setForm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm("");

    if (!user) {
      setForm("Please log in before adding a book.");
      return;
    }

    const bookData = {
      ...formData,
      price: Number(formData.price),
      rating: Number(formData.rating),
      publishedYear: Number(formData.publishedYear),
      availableCopies: Number(formData.availableCopies),
      userName: user.name ?? "",
      userEmail: user.email ?? "",
    };

    try {
      setSubmitting(true);

      const res = await fetch("http://localhost:5000/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const data = await res.json();

      if (!res.ok) {
        setForm(data.message || "Failed to add book.");
        return;
      }

      setForm("Book added successfully!");

      setFormData({
        bookName: "",
        author: "",
        category: "Fiction",
        price: "",
        rating: "4.5",
        image: "",
        description: "",
        publishedYear: "",
        availableCopies: "1",
        isNewArrival: true,
      });
    } catch (error) {
      console.error(error);
      setForm("Could not connect to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-md border border-[#526575]/60 bg-[#293F50] px-3 py-1.5 text-xs text-[#F8F5EE] outline-none transition placeholder:text-gray-400 focus:border-[#D6A85F] focus:ring-1 focus:ring-[#D6A85F]/20";

  const labelClass = "mb-1 block text-xs font-medium text-[#F1E8D7]";

  return (
    <main className="min-h-screen bg-[#0B141A] px-3 py-4 text-[#F8F5EE] sm:px-4 sm:py-5">
      <div className="mx-auto max-w-xl overflow-hidden rounded-xl border border-[#526575]/40 bg-[#172A35] shadow-2xl shadow-black/30">

        <div className="h-0.5 w-full bg-gradient-to-r from-[#1C6656] via-[#D6A85F] to-[#1C6656]" />

        <header className="border-b border-[#526575]/40 bg-gradient-to-br from-[#1C3340] to-[#172A35] px-4 py-3 text-center">
          <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg border border-[#D6A85F]/30 bg-[#D6A85F]/10">
            <BookOpen size={19} strokeWidth={1.7} className="text-[#D6A85F]" />
          </div>

          <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D6A85F]">
            BookNook Library
          </p>

          <h1 className="font-serif text-xl font-bold text-[#F8F5EE]">
            Add a Book
          </h1>

          <p className="mt-1 text-[11px] text-gray-400">
            Share a new story with your library community.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-3 p-4 sm:p-5">

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#D6A85F]/10">
              <Library size={15} className="text-[#D6A85F]" />
            </div>

            <div>
              <h2 className="font-serif text-sm font-semibold text-[#F8F5EE]">
                Book Information
              </h2>
              <p className="text-[10px] text-gray-400">
                Enter your book details.
              </p>
            </div>
          </div>

          {/* Book Name & Author */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <div>
              <label htmlFor="bookName" className={labelClass}>
                Book Title
              </label>

              <input
                id="bookName"
                name="bookName"
                type="text"
                value={formData.bookName}
                onChange={handleChange}
                placeholder="Enter book title"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="author" className={labelClass}>
                Author Name
              </label>

              <input
                id="author"
                name="author"
                type="text"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <div>
              <label htmlFor="category" className={labelClass}>
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="price" className={labelClass}>
                Price (৳)
              </label>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter book price"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Rating & Published Year */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <div>
              <label htmlFor="rating" className={labelClass}>
                Rating (0-5)
              </label>

              <input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="publishedYear" className={labelClass}>
                Published Year
              </label>

              <input
                id="publishedYear"
                name="publishedYear"
                type="number"
                min="1000"
                max={new Date().getFullYear()}
                value={formData.publishedYear}
                onChange={handleChange}
                placeholder="e.g. 2011"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Available Copies & New Arrival */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <div>
              <label htmlFor="availableCopies" className={labelClass}>
                Available Copies
              </label>

              <input
                id="availableCopies"
                name="availableCopies"
                type="number"
                min="1"
                value={formData.availableCopies}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                New Arrival
              </label>

              <select
                name="isNewArrival"
                value={String(formData.isNewArrival)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isNewArrival: e.target.value === "true",
                  }))
                }
                className={inputClass}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          {/* Book Image URL */}
          <div>
            <label htmlFor="image" className={labelClass}>
              Book Cover Image URL
            </label>

            <input
              id="image"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/book-cover.jpg"
              className={inputClass}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className={labelClass}>
              Short Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={2}
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description about this book..."
              className={`${inputClass} resize-y`}
              required
            />
          </div>

          {/* Contributor Information */}
          <div className="border-t border-[#526575]/40 pt-3">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#D6A85F]/10">
                <UserRound size={15} className="text-[#D6A85F]" />
              </div>

              <div>
                <h2 className="font-serif text-sm font-semibold text-[#F8F5EE]">
                  Contributor Information
                </h2>

                <p className="text-[10px] text-gray-400">
                  Your logged-in account details.
                </p>
              </div>
            </div>

            {isPending ? (
              <p className="text-xs text-gray-400">
                Loading account information...
              </p>
            ) : !user ? (
              <div className="rounded-md border border-[#526575]/40 bg-[#293F50] p-3">
                <p className="text-xs text-gray-300">
                  Please log in to add a book to the library.
                </p>

                <Link
                  href="/signIn"
                  className="mt-2 inline-block text-xs font-semibold text-[#D6A85F] hover:underline"
                >
                  Go to Login →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <div>
                  <label htmlFor="userName" className={labelClass}>
                    User Name
                  </label>

                  <div className="relative">
                    <UserRound
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D6A85F]"
                    />

                    <input
                      id="userName"
                      type="text"
                      value={user.name ?? ""}
                      readOnly
                      className={`${inputClass} cursor-not-allowed pl-9 opacity-80`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="userEmail" className={labelClass}>
                    User Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D6A85F]"
                    />

                    <input
                      id="userEmail"
                      type="email"
                      value={user.email ?? ""}
                      readOnly
                      className={`${inputClass} cursor-not-allowed pl-9 opacity-80`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Message */}
          {form && (
            <p
              role="status"
              className="rounded-md border border-[#D6A85F]/20 bg-[#D6A85F]/10 p-2 text-xs text-[#F1E8D7]"
            >
              {form}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending || !user || submitting}
            className="group flex w-full items-center justify-center gap-2 rounded-md bg-[#D6A85F] px-4 py-2 text-xs font-semibold text-[#0B141A] transition duration-300 hover:bg-[#E5BC78] focus:outline-none focus:ring-2 focus:ring-[#D6A85F] focus:ring-offset-2 focus:ring-offset-[#172A35] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <BookPlus
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />

            {submitting ? "Adding..." : "Add Book to Library"}
          </button>

          <p className="text-center text-[10px] text-gray-500">
            Every book opens the door to a new world.
          </p>
        </form>
      </div>
    </main>
  );
}

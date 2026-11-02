"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { API_URL } from "@/app/lib/api";
import { Loader2, Save, UserRound } from "lucide-react";
import { toast } from "sonner";
import { RxCross2 } from "react-icons/rx";

const UserProfileUpdate = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email = session?.user?.email;

    if (!email) return;

    fetch(
      `${API_URL}/user-profile?email=${encodeURIComponent(email)}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load profile");
        return res.json();
      })
      .then((data) => {
        setName(data.name || "");
        setImage(data.image || "");
      })
      .catch(() => {
        toast.error("Failed to load profile");
      })
}, [session?.user?.email]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = session?.user?.email;

    if (!email) {
      toast.error("Please login first");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/user-profile?email=${encodeURIComponent(email)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            image,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      toast.success("Profile updated successfully!");

      router.push("/profile");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-4 py-10 text-[#172A3A] dark:bg-[#172A3A] dark:text-white">
      <div className="mx-auto max-w-md border border-[#E8E1D5] bg-white p-6 dark:border-white/10 dark:bg-[#1C3548] sm:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center bg-[#C59D5F]/15 text-[#C59D5F]">
              <UserRound size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold">Update Profile</h1>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Edit your personal information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push("/profile")}
            aria-label="Cancel profile update"
            className="flex h-9 w-9 items-center justify-center border border-[#E8E1D5] text-gray-500 transition hover:border-red-400 hover:bg-red-50 hover:text-red-500 dark:border-white/10 dark:hover:bg-red-500/10"
          >
            <RxCross2 size={20} />
          </button>
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-[#E8E1D5] bg-transparent px-4 py-3 outline-none focus:border-[#C59D5F]"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Email Address
            </label>

            <input
              type="email"
              value={session?.user?.email}
              readOnly
              className="w-full border border-[#E8E1D5] bg-gray-100 px-4 py-3 text-gray-500 outline-none dark:bg-[#172A3A]"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Profile Image URL
            </label>

            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border border-[#E8E1D5] bg-transparent px-4 py-3 outline-none focus:border-[#C59D5F]"
              placeholder="Enter image URL"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 bg-[#172A3A] px-5 py-3 font-semibold text-white transition hover:bg-[#243F52] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#C59D5F] dark:text-[#172A3A]"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default UserProfileUpdate;
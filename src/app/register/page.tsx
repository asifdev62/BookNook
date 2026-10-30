
import Link from "next/link";
import AuthShell from "@/app/components/auth/AuthShell";
import RegisterForm from "@/app/components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="JOIN THE LIBRARY"
      title="Create your reading nook"
      description="Discover wonderful books, borrow your favorites, and begin a beautiful reading journey."
      footer={
        <>
          Already a member?{" "}
          <Link
            href="/login"
            className="font-bold text-[#D6A85F] transition hover:text-[#E7BE7D]"
          >
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}

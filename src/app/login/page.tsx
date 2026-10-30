
"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";

import AuthShell from "@/app/components/auth/AuthShell";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to your nook"
      description="Pick up where you left off, revisit your shelf, and find your next great read."
      footer={
        <>
          New to BookNook?{" "}
          <Link
            href="/register"
            className="font-semibold text-teal transition hover:text-teal-dark dark:text-brass dark:hover:text-brass-light"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form
        onSubmit={(event) => event.preventDefault()}
        className="space-y-3"
      >
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate dark:text-cream-muted"
          >
            Email address
          </label>

          <div className="relative mt-1">
            <Mail
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-cream-muted"
            />

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-line bg-white py-2.5 pl-10 pr-3 text-sm text-ink shadow-sm transition placeholder:text-muted focus:border-teal dark:border-white/10 dark:bg-ink-2 dark:text-cream dark:placeholder:text-cream-muted dark:focus:border-brass"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate dark:text-cream-muted"
          >
            Password
          </label>

          <div className="relative mt-1">
            <Lock
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-cream-muted"
            />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-line bg-white py-2.5 pl-10 pr-11 text-sm text-ink shadow-sm transition placeholder:text-muted focus:border-teal dark:border-white/10 dark:bg-ink-2 dark:text-cream dark:placeholder:text-cream-muted dark:focus:border-brass"
            />

            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-paper-2 hover:text-navy dark:text-cream-muted dark:hover:bg-white/10 dark:hover:text-white"
            >
              {showPassword ? (
                <EyeOff size={17} aria-hidden="true" />
              ) : (
                <Eye size={17} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-dark dark:bg-brass dark:text-ink dark:hover:bg-brass-light"
        >
          Sign in
          <ArrowRight size={17} aria-hidden="true" />
        </button>

        {/* Footer Note */}
        <p className="text-center text-xs leading-5 text-muted dark:text-cream-muted">
          By signing in, you agree to keep the library kind and the books
          coming back.
        </p>
      </form>
    </AuthShell>
  );
}
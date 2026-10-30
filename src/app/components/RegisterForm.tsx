
"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  UserRound,
  ShieldCheck,
} from "lucide-react";
import { authClient } from "../lib/auth-client";
import { redirect } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


const inputClass =
  "w-full rounded-lg border border-white/10 bg-[#293F50] py-2.5 pl-10 pr-10 text-sm text-white outline-none transition-all duration-200 placeholder:text-[#A8BAC5] focus:border-[#D6A85F] focus:ring-2 focus:ring-[#D6A85F]/10";

const labelClass = "mb-1 block text-sm font-medium text-[#DCE5E8]";


const handleSignUp = async (e:React.SubmitEvent<HTMLElement>)=>{
  e.preventDefault()

  const formData = new FormData(e.target)
  const user = Object.fromEntries(formData.entries()) as {name: string, email: string, password: string}
 

  const {data, error} = await authClient.signUp.email({
    ...user
  })

  if(data){
    redirect('/')
  
  }

  if(error){
    console.log(error)
  }
}

  return (
    <form
      onSubmit={handleSignUp}
      className="w-full space-y-5"
    >
      {/* Full Name */}
      <div>
        <label htmlFor="name" className={labelClass}>
          Full Name
        </label>

        <div className="relative">
          <UserRound
            size={19}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A8BAC5]"
          />

          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your full name"
            className={inputClass}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email Address
        </label>

        <div className="relative">
          <Mail
            size={19}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A8BAC5]"
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
            className={inputClass}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>

        <div className="relative">
          <Lock
            size={19}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A8BAC5]"
          />

          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a strong password"
            className={inputClass}
          />

          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#A8BAC5] transition hover:bg-white/10 hover:text-[#D6A85F]"
          >
            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        </div>

        <p className="mt-2 text-xs text-[#A8BAC5]">
          Minimum 8 characters, including uppercase and lowercase letters.
        </p>
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirm-password" className={labelClass}>
          Confirm Password
        </label>

        <div className="relative">
          <Lock
            size={19}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A8BAC5]"
          />

          <input
            id="confirm-password"
            name="confirm-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm your password"
            className={inputClass}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#D6A85F] px-5 py-4 font-semibold text-[#172A35] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E7BE7D]"
      >
        Create Account

        <ArrowRight
          size={19}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>

      {/* Security */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <ShieldCheck size={16} className="text-[#D6A85F]" />

        <p className="text-xs text-[#A8BAC5]">
          Your information is securely protected.
        </p>
      </div>
    </form>
  );
}
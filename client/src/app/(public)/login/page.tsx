"use client";

import React, { useState } from "react";
import { ArrowRight, Lock, Eye, EyeOff, Loader2, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/features/auth/auth.api";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Password is required");
      return;
    }

    setError("");

    try {
      await login({ password }).unwrap();
      router.replace("admin/dashboard");
    } catch (err) {
      toast.error("Invalid administrative token code");
    }
  };

  return (
    <main className="h-dvh bg-muted/60 text-foreground flex items-center justify-center px-8">
      <div className="w-full -mt-32 max-w-sm space-y-6">

        {/* HEADER PLATFORM BRANDING */}
        <div className="text-center space-y-2">
          <div className="flex h-10 sm:h-12 mx-auto w-10 sm:w-12 items-center justify-center rounded-sm bg-primary/10 text-primary">
            <Shield className="size-6 sm:size-8" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground">
              Admin Gatekeeper
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Enter administrative key passphrase to continue.
            </p>
          </div>
        </div>

        {/* 🔐 PASSWORD SUBMISSION BLOCK */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground block">
              Security Key
            </label>

            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4.5 sm:size-5 text-muted-foreground group-focus-within:text-primary" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                disabled={isLoading}
                className="w-full rounded-sm border border-border bg-background pl-10 sm:pl-11 pr-10 sm:pr-11 py-2.5 text-sm sm:text-base font-medium text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:opacity-60 transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                title={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-muted-foreground transition-colors p-0.5"
              >
                {showPassword ? <EyeOff className="size-4.5 sm:size-5" /> : <Eye className="size-4.5 sm:size-5" />}
              </button>
            </div>
          </div>

          {/* ERROR DISPATCH CALL */}
          {error && (
            <p className="text-[11px] sm:text-xs font-medium text-destructive bg-destructive/10 border border-destructive/20 p-2 rounded-sm leading-normal">
              {error}
            </p>
          )}

          {/* SUBMIT BUTTON WITH PRIMARY VARIABLES */}
          <button
            type="submit"
            disabled={isLoading}
            className="group w-full relative inline-flex items-center justify-center gap-1.5 rounded-sm bg-primary px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-primary-foreground shadow-xs transition-all duration-200 hover:bg-primary/90 active:scale-[0.99] disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4.5 sm:size-5 animate-spin text-primary-foreground/70" />
                <span>Verifying Token...</span>
              </>
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight className="size-4.5 sm:size-5 transform transition-transform duration-300 group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>

        {/* FOOTER ANCHOR LINK */}
        <div className="text-center">
          <a
            href="/"
            className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-2 font-medium"
          >
            Return to Public Library
          </a>
        </div>

      </div>
    </main>
  );
}
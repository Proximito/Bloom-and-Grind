"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const input =
  "w-full rounded-lg border border-line bg-paper px-3 py-2 text-base outline-none focus:border-roast";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const callbackUrl = useSearchParams().get("callbackUrl") || "/";
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    if (mode === "register") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.get("name"), email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrors(data.errors ?? { form: "Something went wrong. Try again." });
        setBusy(false);
        return;
      }
    }

    const result = await signIn("credentials", { email, password, redirect: false });
    if (!result || result.error) {
      setErrors({ form: "Wrong email or password." });
      setBusy(false);
      return;
    }
    router.push(callbackUrl.startsWith("/") ? callbackUrl : "/");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {mode === "register" && (
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Full name</span>
          <input name="name" autoComplete="name" required className={input} />
          {errors.name && <span className="text-sm text-red-800">{errors.name}</span>}
        </label>
      )}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Email</span>
        <input name="email" type="email" autoComplete="email" required className={input} />
        {errors.email && <span className="text-sm text-red-800">{errors.email}</span>}
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Password</span>
        <input
          name="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
          className={input}
        />
        {mode === "register" && !errors.password && <span className="text-sm text-muted">At least 8 characters</span>}
        {errors.password && <span className="text-sm text-red-800">{errors.password}</span>}
      </label>
      {errors.form && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          {errors.form}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="rounded-lg bg-espresso px-4 py-3 font-semibold text-cream hover:bg-bean disabled:opacity-60"
      >
        {busy ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
      </button>
      <p className="text-sm text-muted">
        {mode === "login" ? (
          <>
            New here?{" "}
            <Link href="/register" className="font-medium text-roast">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-roast">
              Log in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

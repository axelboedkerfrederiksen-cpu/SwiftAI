"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (submitError) {
      setError((submitError as Error).message);
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900/70 p-6 shadow-2xl"
      >
        <h1 className="text-2xl font-semibold text-white">Admin Login</h1>
        <p className="mt-2 text-sm text-gray-400">Log ind for at åbne Virksomheder, Analytics og Driftstatus.</p>

        <div className="mt-6 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100 outline-none ring-blue-400 transition focus:ring"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100 outline-none ring-blue-400 transition focus:ring"
          />
        </div>

        {error && <p className="mt-4 rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logger ind..." : "Log ind"}
        </button>
      </form>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      callbackURL: "/dashboard"
    });

    if (res.error) {
      setError(res.error.message || "Credenciales incorrectas");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Bienvenido</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Ingresa a tu cuenta para continuar</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium px-1">Email</label>
          <input
            name="email"
            type="email"
            placeholder="ejemplo@correo.com"
            required
            className="w-full rounded-xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium px-1">Contraseña</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            required
            className="w-full rounded-xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold rounded-xl px-4 py-3 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Iniciando sesión..." : "Ingresar"}
        </button>
      </form>

      <div className="text-center text-sm">
        <span className="text-zinc-500 dark:text-zinc-400">¿No tienes cuenta? </span>
        <Link href="/sign-up" className="text-violet-500 hover:underline font-medium">
          Regístrate gratis
        </Link>
      </div>
    </>
  );
}
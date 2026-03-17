import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      
      {/* Navbar con Zinc neutro */}
      <nav className="w-full py-5 px-6 md:px-12 flex justify-start items-center border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="w-10 h-10 drop-shadow-md dark:drop-shadow-[0_0_12px_rgba(124,58,237,0.4)] group-hover:scale-105 transition-transform" />
          <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
            Vault
          </span>
        </Link>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Glow de fondo ajustado a violeta (color de tu logo) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-violet-500/10 dark:bg-violet-900/10 blur-[120px] rounded-full -z-10" />

        {/* Card: Ahora usa Zinc-900 en lugar del tono azulado anterior */}
        <div className="w-full max-w-md space-y-8 bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {children}
        </div>
      </main>

      <footer className="py-8 text-center text-zinc-400 dark:text-zinc-600 text-xs">
        &copy; {new Date().getFullYear()} Vault — Administra tus suscripciones
      </footer>
    </div>
  );
}
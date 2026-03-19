"use client";

import Link from "next/link";
import { Github, Heart } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Producto: [
            { name: "Características", href: "#features" },
            { name: "Cómo funciona", href: "#how-it-works" },
            { name: "Dashboard", href: "/dashboard" },
        ],
        Comunidad: [
            { name: "GitHub", href: "https://github.com/erick-brsa/vault-next" },
        ],
        Legal: [
            { name: "Privacidad", href: "#" },
            { name: "Términos", href: "#" },
        ],
    };

    return (
        <footer className="w-full bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-8 px-6 md:px-16 lg:px-24 xl:px-32">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 ">

                    {/* Columna de Marca */}
                    <div className="col-span-2 space-y-6">
                        <Link href="#home" className="flex items-center gap-3 group">
                            <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
                                <span className="font-black text-xl">V</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                Vault
                            </span>
                        </Link>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed max-w-xs">
                            Gestiona tus suscripciones de forma inteligente.
                            Privacidad primero, control total siempre.
                            Hecho con Next.js y Prisma.
                        </p>
                    </div>

                    {/* Columnas de Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category} className="space-y-4">
                            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-widest">
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-zinc-500 hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400 transition-colors font-medium"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center text-zinc-400 dark:text-zinc-400 text-xs">
                    &copy; {new Date().getFullYear()} Vault — Administra tus suscripciones
                </div>
            </div>
        </footer>
    );
}
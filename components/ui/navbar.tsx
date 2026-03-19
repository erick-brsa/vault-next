"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "../Logo";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: "Inicio", href: "/#home" },
        { name: "Características", href: "#features" },
        { name: "Cómo funciona", href: "#how-it-works" },
        { name: "Github", href: "https://github.com/erick-brsa/vault-next" },
    ];

    return (
        <header className="w-full sticky top-0 z-50">
            <nav className="h-18 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-all shadow-sm">
                {/* Logo unificado */}
                <Link href="/" className="flex items-center gap-3 group">
                    <Logo className="w-9 h-9 drop-shadow-md dark:drop-shadow-[0_0_12px_rgba(124,58,237,0.4)] transition-transform group-hover:scale-110" />
                    <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                        Vault
                    </span>
                </Link>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="text-sm text-zinc-500 hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400 font-medium transition-colors"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Button */}
                <Link
                    href="/dashboard"
                    className="hidden md:inline-block bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-full text-sm font-bold active:scale-95 transition-all"
                >
                    Empezar ahora
                </Link>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    className="md:hidden p-2 text-zinc-900 dark:text-zinc-50"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Dropdown - Ajustado a h-18 */}
                <div className={`
                    absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shadow-xl p-8 space-y-6 md:hidden transition-all duration-300
                    ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
                    `}>
                    <ul className="flex flex-col space-y-5">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-semibold block"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white font-bold h-12 rounded-full"
                    >
                        Empezar ahora
                    </Link>
                    
                </div>
            </nav>
        </header>
    );
}
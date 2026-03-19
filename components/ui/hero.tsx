"use client";

import Link from "next/link";
import { ShieldCheck, Sparkles, BarChart3 } from "lucide-react";

export function Hero() {
    return (
        <section className="min-h-dvh relative pb-20 pt-32 lg:pt-32 lg:pb-32 overflow-hidden">
            {/* Efectos de fondo (Glow) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                <div className="absolute top-[-10%] left-[10%] w-75 h-75 bg-violet-500/25 dark:bg-violet-500/60 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[10%] w-62.5 h-65.2 bg-orange-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
                {/* Badge de confianza */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-bold animate-fade-in">
                    <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                    <span>Gestión inteligente de suscripciones</span>
                </div>

                {/* Título Principal */}
                <h1 className="text-5xl md:text-7xl lg:text-7xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[0.9]">
                    Toma el control de <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-[#E0724A]">
                        tus finanzas
                    </span>
                </h1>

                {/* Subtítulo */}
                <p className="max-w-2xl mx-auto text-zinc-500 dark:text-zinc-400 text-lg md:text-xl font-medium leading-relaxed">
                    Vault te ayuda a rastrear, analizar y optimizar tus suscripciones mensuales. 
                    Sin costos ocultos, 100% privado y de código abierto.
                </p>

                {/* Botones de Acción */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link 
                        href="/dashboard"
                        className="w-full sm:w-auto px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-full shadow-xl shadow-violet-500/25 transition-all flex items-center justify-center gap-2 group active:scale-95"
                    >
                        Empezar ahora
                    </Link>
                    <Link 
                        href="https://github.com/erick-brsa/vault-next"
                        target="_blank"
                        className="w-full sm:w-auto px-8 py-4 bg-zinc-100 dark:bg-zinc-700/80 hover:bg-zinc-200 dark:hover:bg-zinc-700/60 text-zinc-900 dark:text-zinc-100 font-bold rounded-full transition-all border border-zinc-200 dark:border-zinc-800 active:scale-95"
                    >
                        Ver en GitHub
                    </Link>
                </div>

                {/* Mini Features debajo del Hero */}
                <div className="pt-20 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-zinc-200 dark:border-zinc-700/80 mt-20">
                    <div className="flex flex-col items-center gap-2">
                        <div className="p-2 bg-violet-500/10 rounded-lg text-violet-600">
                            <ShieldCheck size={20} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">100% Privado</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="p-2 bg-orange-500/10 rounded-lg text-orange-600">
                            <BarChart3 size={20} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Análisis Real</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 col-span-2 md:col-span-1">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
                            <Sparkles size={20} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Sin Comisiones</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
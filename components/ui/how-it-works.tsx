"use client";

import { Search, Bell, BarChart2, ArrowRight } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Agrega tus servicios",
        description: "Busca entre cientos de servicios populares o agrega los tuyos manualmente en segundos.",
        icon: <Search className="w-6 h-6 text-violet-600" />,
        color: "bg-violet-500/10"
    },
    {
        number: "02",
        title: "Configura alertas",
        description: "Elige cuándo quieres ser notificado. Vault te avisará antes de que se procese el siguiente cobro.",
        icon: <Bell className="w-6 h-6 text-orange-500" />,
        color: "bg-orange-500/10"
    },
    {
        number: "03",
        title: "Analiza y ahorra",
        description: "Visualiza tus gastos mensuales y detecta suscripciones que ya no usas para optimizar tu dinero.",
        icon: <BarChart2 className="w-6 h-6 text-emerald-500" />,
        color: "bg-emerald-500/10"
    }
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800/50">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                        El Proceso
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                        Tres pasos para el <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-[#E0724A]">
                            control total
                        </span>
                    </h3>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Línea conectora (solo desktop) */}
                    <div className="hidden md:block absolute top-1/4 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="dark:bg-neutral-800 py-8 flex flex-col items-center text-center space-y-6 group rounded">
                            {/* Icon Container */}
                            <div className={`w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center relative transition-transform group-hover:scale-110 duration-300 shadow-sm border border-white/50 dark:border-zinc-800`}>
                                <span className="absolute -top-3 -right-3 w-8 h-8 bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center text-xs font-black text-zinc-400">
                                    {step.number}
                                </span>
                                {step.icon}
                            </div>

                            {/* Text */}
                            <div className="space-y-3">
                                <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                                    {step.title}
                                </h4>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium max-w-62.5 mx-auto">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
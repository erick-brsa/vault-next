"use client";

import { 
  BellRing, 
  PieChart, 
  ShieldCheck, 
  Cloud
} from "lucide-react";

const features = [
  {
    title: "Recordatorios Inteligentes",
    description: "Recibe notificaciones automáticas antes de cada cobro. Configura alertas 24h o 48h antes para decidir si quieres renovar.",
    icon: <BellRing className="w-6 h-6 text-violet-500" />,
    className: "md:col-span-2",
    bg: "bg-violet-500/5"
  },
  {
    title: "Análisis de Gastos",
    description: "Visualiza tus gastos mensuales por categorías con gráficos intuitivos.",
    icon: <PieChart className="w-6 h-6 text-orange-500" />,
    className: "md:col-span-1",
    bg: "bg-orange-500/5"
  },
  {
    title: "100% Privado",
    description: "Tus datos financieros nunca salen de tu dispositivo. Vault prioriza tu privacidad por encima de todo.",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
    className: "md:col-span-1",
    bg: "bg-emerald-500/5"
  },
  {
    title: "Sincronización Cloud",
    description: "Accede a tus suscripciones desde cualquier lugar. Sincronización segura y encriptada en la nube.",
    icon: <Cloud className="w-6 h-6 text-blue-500" />,
    className: "md:col-span-2",
    bg: "bg-blue-500/5"
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 md:px-16 lg:px-24 xl:px-32 dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header de la sección */}
        <div className="text-left space-y-4 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            Diseñado para el <br />
            <span className="text-violet-600">orden financiero</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg">
            Todo lo que necesitas para dejar de perder dinero en servicios que ya no utilizas. 
            Simple, rápido y efectivo.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 
                hover:border-violet-500/50 dark:hover:border-violet-500/50 
                transition-all duration-300 group bg-zinc-50 dark:bg-neutral-900
                ${feature.className} ${feature.bg}
              `}
            >
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-700 shadow-sm border border-zinc-100 dark:border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
                {feature.title}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
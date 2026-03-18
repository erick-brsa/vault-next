"use client";

import { useSession } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();

  if (isPending) return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user) return <p className="text-center mt-8 text-white">Redirecting...</p>;

  const { user } = session; 

  return (
    <div className="space-y-8">
      {/* Header de Bienvenida */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Panel de Control
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Hola, <span className="text-violet-500 font-medium">{user.name}</span>. Esto es lo que está pasando en Vault hoy.
        </p>
      </section>

      {/* Grid de Stats (Placeholder para lo que viene) */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Gasto Mensual", value: "$0.00", sub: "Este mes" },
          { label: "Suscripciones", value: "0", sub: "Activas ahora" },
          { label: "Próximo Pago", value: "--", sub: "N/A" },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm"
          >
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1 text-zinc-900 dark:text-zinc-50">{stat.value}</h3>
            <p className="text-xs text-zinc-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Sección vacía para servicios */}
      <div className="h-64 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
        <p className="text-zinc-400 text-sm italic">Aún no has agregado suscripciones.</p>
      </div>
    </div>
  );
}
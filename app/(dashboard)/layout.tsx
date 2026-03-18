import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Sidebar fijo para desktop */}
      <aside className="hidden md:flex w-64 flex-col">
        <Sidebar />
      </aside>

      {/* Área de contenido */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Aquí podrías añadir un MobileHeader para pantallas pequeñas */}
        <main className="flex-1 overflow-y-auto bg-zinc-50/50 dark:bg-zinc-900/30 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
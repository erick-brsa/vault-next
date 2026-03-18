"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    CreditCard,
    PieChart,
    Settings,
    LogOut,
    PlusCircle
} from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const menuItems = [
    { name: "Resumen", href: "/dashboard", icon: LayoutDashboard },
    { name: "Suscripciones", href: "/dashboard/subscriptions", icon: CreditCard },
    { name: "Reportes", href: "/dashboard/reports", icon: PieChart },
    { name: "Ajustes", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleSignOut = () => {
        signOut({ fetchOptions: { onSuccess: () => { router.push("/sign-in") } } })
    };

    return (
        <div className="flex h-full flex-col bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800">
            {/* Header del Sidebar */}
            <div className="p-6">
                <Link href="/dashboard" className="flex items-center gap-3 group">
                    <Logo className="w-8 h-8 transition-transform group-hover:scale-110" />
                    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                        Vault
                    </span>
                </Link>
            </div>

            {/* Navegación Principal */}
            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
                                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
                            )}
                        >
                            <item.icon size={18} className={cn(isActive ? "text-violet-500" : "text-current")} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Botón de Acción Rápida & Logout */}
            <div className="p-4 mt-auto border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                <button className="cursor-pointer w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-violet-500/20">
                    <PlusCircle size={18} />
                    Nueva Suscripción
                </button>

                <button
                    className="cursor-pointer w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-red-500 dark:hover:bg-zinc-400/20 hover:text-red-600 dark:hover:text-zinc-400 transition-all duration-200 group"
                    onClick={handleSignOut}
                >
                    <LogOut size={18} />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}
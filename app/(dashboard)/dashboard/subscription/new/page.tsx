"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Globe, Tag, DollarSign, Calendar, Layers, ChevronRight, Check, X } from "lucide-react";
import { useCatalogStore } from "@/store/use-catalog-store";

export default function SubscriptionStepperForm() {
    const [step, setStep] = useState(1);
    // Extraemos billingPeriods del store, ya no del archivo estático de prisma
    const { services, categories, billingPeriods, fetchCatalog } = useCatalogStore();

    const dropdownRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(-1);

    // Estado del Paso 1: Servicio
    const [serviceData, setServiceData] = useState({
        id: "",
        name: "",
        website: "",
        categoryId: "" // Ahora usamos el ID
    });

    // Estado del Paso 2: Suscripción
    const [subData, setSubData] = useState({
        plan: "Individual",
        price: "",
        startDate: new Date().toISOString().split('T')[0],
        billingPeriodId: "", 
        currency: "MXN",
    });

    useEffect(() => {
        fetchCatalog();
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setActiveIndex(-1);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [fetchCatalog]);

    const nextStep = () => setStep(2);
    const prevStep = () => setStep(1);

    const filteredServices = serviceData.name.length > 1 && !serviceData.id
        ? services.filter(s => s.name.toLowerCase().includes(serviceData.name.toLowerCase())).slice(0, 5)
        : [];

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (filteredServices.length === 0) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex(prev => (prev < filteredServices.length - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
        } else if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault();
            selectService(filteredServices[activeIndex]);
        } else if (e.key === "Escape") {
            setActiveIndex(-1);
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setSubData({ ...subData, price: value });
        }
    };

    const blockInvalidPriceChar = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
    };

    const selectService = (s: any) => {
        // Buscamos el ID de la categoría que coincida con el nombre que trae el servicio
        const categoryMatch = categories.find(c => c.name === s.categoryName);
        
        setServiceData({
            id: s.id || "exists",
            name: s.name,
            website: s.website || "",
            categoryId: categoryMatch?.id || "" // Sincronizamos el Select automáticamente
        });
        setActiveIndex(-1);
    };

    const inputStyles = `w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:ring-2 focus:ring-violet-500 transition-all`;

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            {/* Stepper Header */}
            <div className="flex items-center justify-center gap-4">
                {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${step === i ? "bg-violet-600 text-white scale-110" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"}`}>
                            {i}
                        </div>
                        <span className={`text-sm font-medium ${step === i ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500"}`}>
                            {i === 1 ? "Servicio" : "Detalles"}
                        </span>
                        {i === 1 && <div className="w-12 h-0.5 bg-zinc-200 dark:bg-zinc-800 mx-2" />}
                    </div>
                ))}
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm min-h-105 flex flex-col relative overflow-visible">

                {/* PASO 1: SERVICIO */}
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 flex-1 flex flex-col">
                        <div className="space-y-2 relative" ref={dropdownRef}>
                            <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">¿Qué servicio vas a agregar?</label>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                <input
                                    autoComplete="off"
                                    value={serviceData.name}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => {
                                        setServiceData({ ...serviceData, name: e.target.value, id: "" });
                                        setActiveIndex(-1);
                                    }}
                                    placeholder="Busca o escribe el nombre..."
                                    className={`pl-11 ${inputStyles}`}
                                />
                                {serviceData.name && (
                                    <button
                                        onClick={() => setServiceData({ id: "", name: "", website: "", categoryId: "" })}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Dropdown de Sugerencias */}
                            {filteredServices.length > 0 && (
                                <div className="absolute z-100 w-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
                                    {filteredServices.map((s, index) => (
                                        <button
                                            key={s.name}
                                            type="button"
                                            onMouseEnter={() => setActiveIndex(index)}
                                            onClick={() => selectService(s)}
                                            className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors border-b border-zinc-100 dark:border-zinc-800 last:border-none ${activeIndex === index ? "bg-violet-500/10" : ""}`}
                                        >
                                            <div>
                                                <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{s.name}</p>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.categoryName}</p>
                                            </div>
                                            {activeIndex === index && <Check className="w-4 h-4 text-violet-500" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                                    <Globe className="w-3 h-3 text-violet-500" /> Sitio Web
                                </label>
                                <input
                                    value={serviceData.website}
                                    onChange={(e) => setServiceData({ ...serviceData, website: e.target.value })}
                                    placeholder="https://ejemplo.com"
                                    className={inputStyles}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                                    <Tag className="w-3 h-3 text-violet-500" /> Categoría
                                </label>
                                <div className="relative">
                                    <select
                                        value={serviceData.categoryId}
                                        onChange={(e) => setServiceData({ ...serviceData, categoryId: e.target.value })}
                                        className={`${inputStyles} appearance-none cursor-pointer pr-10`}
                                    >
                                        <option value="" className="text-zinc-500">Selecciona categoría</option>
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id} className="dark:bg-zinc-900">
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rotate-90 text-zinc-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={nextStep}
                            disabled={!serviceData.name || !serviceData.categoryId}
                            className="mt-auto w-full py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl shadow-lg shadow-violet-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                            Siguiente paso <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* PASO 2: DETALLES */}
                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-violet-500/5 border border-violet-500/10">
                            <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center text-white font-black text-xl">
                                {serviceData.name[0]}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{serviceData.name}</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                                    {categories.find(c => c.id === serviceData.categoryId)?.name}
                                </p>
                            </div>
                            <button onClick={prevStep} className="ml-auto text-xs font-bold text-violet-500 px-3 py-1.5 rounded-full hover:bg-violet-500/10">
                                Cambiar
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2"><Layers className="w-3 h-3 text-violet-500" /> Plan</label>
                                <input
                                    value={subData.plan}
                                    onChange={(e) => setSubData({ ...subData, plan: e.target.value })}
                                    placeholder="Ej. Premium, Pro..."
                                    className={inputStyles}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2"><DollarSign className="w-3 h-3 text-violet-500" /> Precio</label>
                                <input
                                    type="number"
                                    value={subData.price}
                                    placeholder="0.00"
                                    className={inputStyles}
                                    onKeyDown={blockInvalidPriceChar}
                                    onChange={handlePriceChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-500 flex items-center gap-2">
                                <Calendar className="w-3 h-3 text-violet-500" /> Fecha de Inicio
                            </label>
                            <input
                                type="date"
                                value={subData.startDate}
                                onChange={(e) => setSubData({ ...subData, startDate: e.target.value })}
                                className={inputStyles}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Ciclo de Cobro</label>
                                <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl">
                                    {billingPeriods.map((period) => (
                                        <button
                                            key={period.id}
                                            type="button"
                                            onClick={() => setSubData({ ...subData, billingPeriodId: period.id })}
                                            className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${subData.billingPeriodId === period.id
                                                ? "bg-white dark:bg-zinc-700 text-violet-600 shadow-sm"
                                                : "text-zinc-500"}`}
                                        >
                                            {period.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Moneda</label>
                                <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl">
                                    {['MXN', 'USD', 'EUR'].map((curr) => (
                                        <button
                                            key={curr}
                                            type="button"
                                            onClick={() => setSubData({ ...subData, currency: curr })}
                                            className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${subData.currency === curr
                                                ? "bg-white dark:bg-zinc-700 text-violet-600 shadow-sm"
                                                : "text-zinc-500"}`}
                                        >
                                            {curr}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button className="mt-auto w-full py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl shadow-lg shadow-violet-500/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                            Completar Registro <Check className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
import { useState, useRef } from "react";
import { useCatalogStore, Service } from "@/store/use-catalog-store";

export function useSubscriptionForm() {
    const [step, setStep] = useState(1);
    const [activeIndex, setActiveIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { categories } = useCatalogStore();

    const [serviceData, setServiceData] = useState({
        id: "", name: "", website: "", categoryId: ""
    });

    const [subData, setSubData] = useState({
        plan: "Individual",
        price: "",
        startDate: new Date().toISOString().split('T')[0],
        billingPeriodId: "",
        currency: "MXN",
    });

    const selectService = (s: Service) => {
        const categoryMatch = categories.find(c => c.name === s.categoryName);
        setServiceData({
            id: s.id,
            name: s.name,
            website: s.website || "",
            categoryId: categoryMatch?.id || ""
        });
        setActiveIndex(-1);
    };

    const handlePriceChange = (val: string) => {
        if (/^\d*\.?\d*$/.test(val)) {
            setSubData(prev => ({ ...prev, price: val }));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, filteredLength: number, onSelect: (s: any) => void, filtered: any[]) => {
        if (filteredLength === 0) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex(prev => (prev < filteredLength - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
        } else if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault();
            onSelect(filtered[activeIndex]);
        } else if (e.key === "Escape") {
            setActiveIndex(-1);
        }
    };

    return {
        step, setStep,
        serviceData, setServiceData,
        subData, setSubData,
        activeIndex, setActiveIndex,
        dropdownRef,
        selectService,
        handlePriceChange,
        handleKeyDown
    };
}
import { create } from 'zustand';

export interface Service {
  id: string;
  name: string;
  description?: string;
  website: string;
  categoryName: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface BillingPeriod {
  id: string;
  name: string;
  durationDays: number;
}

interface CatalogState {
  services: Service[];
  categories: Category[];
  billingPeriods: BillingPeriod[];
  isLoading: boolean;
  error: string | null;
  fetchCatalog: () => Promise<void>;
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  services: [],
  categories: [],
  billingPeriods: [],
  isLoading: false,
  error: null,
  fetchCatalog: async () => {
    if (get().categories.length > 0) return;

    set({ isLoading: true, error: null });
    try {
      const [resServ, resCat, resBill] = await Promise.all([
        fetch('/api/services'),
        fetch('/api/categories'),
        fetch('/api/billing-periods')
      ]);

      if (!resServ.ok || !resCat.ok || !resBill.ok) throw new Error("Error al obtener catálogo");

      set({ 
        services: await resServ.json(),
        categories: await resCat.json(),
        billingPeriods: await resBill.json(),
        isLoading: false 
      });
    } catch (err) {
      set({ error: "Error de conexión", isLoading: false });
    }
  },
}));
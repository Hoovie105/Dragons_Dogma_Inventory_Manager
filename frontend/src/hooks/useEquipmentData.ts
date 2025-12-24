import { useState, useEffect } from 'react';
import { ArmorItem, WeaponItem, PaginatedResponse } from '@/types/equipment';
const API_URL = import.meta.env.VITE_API_LOCAL_URL;

export function useEquipmentData() {
  const [armor, setArmor] = useState<ArmorItem[]>([]);
  const [weapons, setWeapons] = useState<WeaponItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Helper to fetch all pages for a resource, respecting backend limit
        async function fetchAll<T>(resource: string) {
          const all: T[] = [];
          let page = 1;
          const limit = 100; // backend enforces <=100
          while (true) {
            const res = await fetch(`${API_URL}/${resource}?page=${page}&limit=${limit}`);
            if (!res.ok) throw new Error(`Failed to load ${resource} page ${page}`);
            const data: PaginatedResponse<T> = await res.json();
            all.push(...data.items);
            if (page >= data.pages) break;
            page += 1;
          }
          return all;
        }

        const [allArmor, allWeapons] = await Promise.all([
          fetchAll<ArmorItem>('armor'),
          fetchAll<WeaponItem>('weapons'),
        ]);

        setArmor(allArmor);
        setWeapons(allWeapons);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { armor, weapons, loading, error };
}

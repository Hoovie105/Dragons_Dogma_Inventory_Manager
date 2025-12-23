import { useState, useEffect } from 'react';
import { ArmorItem, WeaponItem, PaginatedResponse } from '@/types/equipment';
const API_URL = import.meta.env.VITE_API_URL;

export function useEquipmentData(page: number = 1, limit: number = 50) {
  const [armor, setArmor] = useState<PaginatedResponse<ArmorItem> | null>(null);
  const [weapons, setWeapons] = useState<PaginatedResponse<WeaponItem> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [armorRes, weaponsRes] = await Promise.all([
          fetch(`${API_URL}/armor?page=${page}&limit=${limit}`),
          fetch(`${API_URL}/weapons?page=${page}&limit=${limit}`),
        ]);

        if (!armorRes.ok || !weaponsRes.ok) {
          throw new Error('Failed to load equipment data');
        }

        const armorData: PaginatedResponse<ArmorItem> = await armorRes.json();
        const weaponsData: PaginatedResponse<WeaponItem> = await weaponsRes.json();

        setArmor(armorData);
        setWeapons(weaponsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [page, limit]);

  return { armor, weapons, loading, error };
}

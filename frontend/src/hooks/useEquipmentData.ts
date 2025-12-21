import { useState, useEffect } from 'react';
import { ArmorItem, WeaponItem } from '@/types/equipment';
const API_URL = import.meta.env.VITE_API_URL;

export function useEquipmentData() {
  const [armor, setArmor] = useState<ArmorItem[]>([]);
  const [weapons, setWeapons] = useState<WeaponItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [armorRes, weaponsRes] = await Promise.all([
          fetch(`${API_URL}/data/armor`),
          fetch(`${API_URL}/data/weapons`),
        ]);

        if (!armorRes.ok || !weaponsRes.ok) {
          throw new Error('Failed to load equipment data');
        }

        const armorData = await armorRes.json();
        const weaponsData = await weaponsRes.json();

        setArmor(armorData);
        setWeapons(weaponsData);
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

import React, { createContext, useContext, useState } from 'react';
import { EquipmentItem, EquippedLoadout, ArmorItem, WeaponItem, isWeapon, isArmor } from '@/types/equipment';

interface EquipmentContextType {
  selectedItem: EquipmentItem | null;
  setSelectedItem: (item: EquipmentItem | null) => void;
  equippedLoadout: EquippedLoadout;
  equipItem: (item: EquipmentItem) => void;
  unequipItem: (slot: keyof EquippedLoadout) => void;
}

const EquipmentContext = createContext<EquipmentContextType | undefined>(undefined);

export function EquipmentProvider({ children }: { children: React.ReactNode }) {
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null);
  const [equippedLoadout, setEquippedLoadout] = useState<EquippedLoadout>({});

  const equipItem = (item: EquipmentItem) => {
    setEquippedLoadout((prev) => {
      if (isWeapon(item)) {
        return { ...prev, weapon: item };
      }
      if (isArmor(item)) {
        const armorType = item.stats?.["Armor Type"];
        switch (armorType) {
          case "Head Armor":
            return { ...prev, head: item };
          case "Torso Armor":
            return { ...prev, torso: item };
          case "Arm Armor":
            return { ...prev, arms: item };
          case "Leg Armor":
            return { ...prev, legs: item };
          case "Cloak":
            return { ...prev, cloak: item };
          default:
            return prev;
        }
      }
      return prev;
    });
  };

  const unequipItem = (slot: keyof EquippedLoadout) => {
    setEquippedLoadout((prev) => {
      const newLoadout = { ...prev };
      delete newLoadout[slot];
      return newLoadout;
    });
  };

  return (
    <EquipmentContext.Provider
      value={{
        selectedItem,
        setSelectedItem,
        equippedLoadout,
        equipItem,
        unequipItem,
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
}

export function useEquipment() {
  const context = useContext(EquipmentContext);
  if (context === undefined) {
    throw new Error('useEquipment must be used within an EquipmentProvider');
  }
  return context;
}

export interface ArmorItem {
  id: number;
  wiki_link?: string;
  name: string;
  description?: string;
  image_path?: string;
  locations?: string[];
  stats?: {
    Weight?: string;
    Defense?: string;
    "Magick Defense"?: string;
    Value?: string;
    "Armor Type"?: string;
  };
  elemental_res?: Record<string, string>;
  debilitation_res?: Record<string, string>;
  vocations?: string[];
}

export interface WeaponItem {
  id: number;
  wiki_link?: string;
  name: string;
  description?: string;
  image_path?: string;
  locations?: string[];
  stats?: {
    Value?: string;
    Weight?: string;
    "Weapon Type"?: string;
    Strength?: string;
    Magick?: string;
    "Slash Strength"?: string;
    "Bludgeoning Strength"?: string;
    "Stagger Power"?: string;
    "Knockdown Power"?: string;
    Elemental?: string;
    "Debilitation Strength"?: string;
  };
  vocations?: string[];
}

export type EquipmentItem = ArmorItem | WeaponItem;

export interface EquippedLoadout {
  weapon?: WeaponItem;
  secondaryWeapon?: WeaponItem;
  head?: ArmorItem;
  torso?: ArmorItem;
  arms?: ArmorItem;
  legs?: ArmorItem;
  cloak?: ArmorItem;
}

export const VOCATIONS = [
  "Fighter",
  "Strider",
  "Mage",
  "Warrior",
  "Ranger",
  "Sorcerer",
  "Mystic Knight",
  "Assassin",
  "Magick Archer",
] as const;

export type Vocation = typeof VOCATIONS[number];

export const ARMOR_TYPES = [
  "Head Armor",
  "Torso Armor",
  "Arm Armor",
  "Leg Armor",
  "Cloak",
] as const;

export type ArmorType = typeof ARMOR_TYPES[number];

export function isWeapon(item: EquipmentItem): item is WeaponItem {
  return 'stats' in item && 'Weapon Type' in item.stats;
}

export function isArmor(item: EquipmentItem): item is ArmorItem {
  return 'stats' in item && 'Armor Type' in item.stats;
}

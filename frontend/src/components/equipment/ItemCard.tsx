import { EquipmentItem, isWeapon, isArmor } from '@/types/equipment';
import { useEquipment } from '@/context/EquipmentContext';
import { Shield, Sword, Flame, Snowflake, Zap, Sun, Moon } from 'lucide-react';

interface ItemCardProps {
  item: EquipmentItem;
}

function getElementalIcon(element: string) {
  const lower = element.toLowerCase();
  if (lower.includes('fire')) return <Flame className="w-3 h-3 stat-fire" />;
  if (lower.includes('ice')) return <Snowflake className="w-3 h-3 stat-ice" />;
  if (lower.includes('lightning') || lower.includes('thunder')) return <Zap className="w-3 h-3 stat-lightning" />;
  if (lower.includes('holy') || lower.includes('light')) return <Sun className="w-3 h-3 stat-holy" />;
  if (lower.includes('dark')) return <Moon className="w-3 h-3 stat-dark" />;
  return null;
}

function getElementFromItem(item: EquipmentItem): string | null {
  if (isWeapon(item)) {
    const elemental = item.stats?.Elemental;
    if (elemental && elemental !== 'None' && elemental !== '-') {
      return elemental;
    }
  }
  if (isArmor(item) && item.elemental_res) {
    const entries = Object.entries(item.elemental_res);
    if (entries.length > 0) {
      const positiveRes = entries.filter(([_, val]) => !val.startsWith('-'));
      if (positiveRes.length > 0) {
        return positiveRes[0][0];
      }
    }
  }
  return null;
}

export function ItemCard({ item }: ItemCardProps) {
  const { selectedItem, setSelectedItem } = useEquipment();
  const isSelected = selectedItem?.id === item.id && selectedItem?.name === item.name;
  
  const element = getElementFromItem(item);
  const elementIcon = element ? getElementalIcon(element) : null;

  const mainStat = isWeapon(item) 
    ? { label: 'STR', value: item.stats?.Strength || '0' }
    : { label: 'DEF', value: item.stats?.Defense || '0' };

  const secondaryStat = isWeapon(item)
    ? { label: 'MAG', value: item.stats?.Magick || '0' }
    : { label: 'MDEF', value: item.stats?.["Magick Defense"] || '0' };

  const typeLabel = isWeapon(item) 
    ? item.stats["Weapon Type"]
    : item.stats["Armor Type"];

  return (
    <button
      onClick={() => setSelectedItem(item)}
      className={`
        w-full medieval-border bg-card p-3 text-left item-card-hover rounded-sm
        ${isSelected ? 'ring-2 ring-primary animate-glow' : ''}
      `}
    >
      <div className="flex gap-3">
        {/* Item Image */}
        <div className="w-16 h-16 bg-secondary/50 rounded-sm flex items-center justify-center flex-shrink-0 overflow-hidden">
          {isWeapon(item) ? (
            <Sword className="w-8 h-8 text-muted-foreground" />
          ) : (
            <Shield className="w-8 h-8 text-muted-foreground" />
          )}
        </div>

        {/* Item Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-sm gold-text truncate leading-tight">
              {item.name}
            </h3>
            {elementIcon && (
              <div className="flex-shrink-0">{elementIcon}</div>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {typeLabel}
          </p>

          {/* Stats */}
          <div className="flex gap-4 mt-2">
            <div className="text-xs">
              <span className="text-muted-foreground">{mainStat.label}: </span>
              <span className="text-parchment font-medium">{mainStat.value}</span>
            </div>
            <div className="text-xs">
              <span className="text-muted-foreground">{secondaryStat.label}: </span>
              <span className="text-parchment font-medium">{secondaryStat.value}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

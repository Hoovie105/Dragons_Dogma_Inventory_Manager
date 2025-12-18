import { useEquipment } from '@/context/EquipmentContext';
import { EquipmentSlot, getSlotIcon } from './EquipmentSlot';

const EQUIPMENT_SLOTS = [
  { key: 'weapon', name: 'Primary Weapon' },
  { key: 'secondaryWeapon', name: 'Secondary Weapon' },
  { key: 'head', name: 'Head' },
  { key: 'torso', name: 'Torso' },
  { key: 'arms', name: 'Arms' },
  { key: 'legs', name: 'Legs' },
  { key: 'cloak', name: 'Cloak' },
];

export function EquippedTab() {
  const { equippedLoadout, selectedItem } = useEquipment();

  const totalStats = {
    defense: 0,
    magickDefense: 0,
    weight: 0,
  };

  Object.values(equippedLoadout).forEach((item) => {
    if (item && 'stats' in item) {
      if ('Defense' in item.stats) {
        totalStats.defense += parseInt(item.stats.Defense) || 0;
        totalStats.magickDefense += parseInt(item.stats["Magick Defense"]) || 0;
      }
      totalStats.weight += parseFloat(item.stats.Weight) || 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="medieval-border bg-card p-4 rounded-sm">
        <h3 className="font-display text-lg gold-text mb-3">Total Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-display text-parchment">{totalStats.defense}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Defense</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-display text-parchment">{totalStats.magickDefense}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">M. Defense</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-display text-parchment">{totalStats.weight.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Weight</p>
          </div>
        </div>
      </div>

      {/* Equipment Slots */}
      <div className="space-y-3">
        <h3 className="font-display text-lg gold-text">Equipped Gear</h3>
        <div className="grid gap-3">
          {EQUIPMENT_SLOTS.map((slot) => (
            <EquipmentSlot
              key={slot.key}
              slotName={slot.name}
              slotKey={slot.key}
              item={equippedLoadout[slot.key as keyof typeof equippedLoadout]}
              icon={getSlotIcon(slot.key)}
            />
          ))}
        </div>
      </div>

      {/* Location Info for All Equipped Items */}
      {Object.entries(equippedLoadout).some(([_, item]) => item?.locations?.length) && (
        <div className="medieval-border bg-card p-4 rounded-sm animate-fade-in">
          <h3 className="font-display text-lg gold-text mb-3">Where to Find</h3>
          <div className="space-y-4">
            {Object.entries(equippedLoadout).map(([slot, item]) => {
              if (!item?.locations?.length) return null;
              return (
                <div key={slot}>
                  <p className="text-sm font-display text-primary mb-2">{item.name}</p>
                  <ul className="space-y-1">
                    {item.locations.map((location, index) => (
                      <li key={index} className="text-sm text-parchment flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{location}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

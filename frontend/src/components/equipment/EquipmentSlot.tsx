import { EquipmentItem, isWeapon } from '@/types/equipment';
import { useEquipment } from '@/context/EquipmentContext';
import { X, Sword, Shield, Crown, Shirt, Hand, Footprints, Scroll } from 'lucide-react';
import { getImageSrc } from '@/lib/utils';

interface EquipmentSlotProps {
  slotName: string;
  slotKey: string;
  item?: EquipmentItem;
  icon: React.ReactNode;
}


export function EquipmentSlot({ slotName, slotKey, item, icon }: EquipmentSlotProps) {
  const { setSelectedItem, unequipItem } = useEquipment();

  const handleClick = () => {
    if (item) {
      setSelectedItem(item);
    }
  };

  const handleUnequip = (e: React.MouseEvent) => {
    e.stopPropagation();
    unequipItem(slotKey as any);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        medieval-border bg-card p-4 rounded-sm cursor-pointer transition-all duration-200 
        ${item ? 'hover:ring-1 hover:ring-primary' : 'opacity-60'}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="w-12 h-12 bg-secondary/50 rounded-sm flex items-center justify-center flex-shrink-0">
          {item?.image_path ? (
            <img
              src={getImageSrc(item.image_path)}
              alt={item.name}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          ) : (
            icon
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{slotName}</p>
          
          {item ? (
            <>
              <h4 className="font-display text-sm gold-text truncate mt-1">
                {item.name}
              </h4>
              <div className="flex gap-3 mt-1 text-xs">
                {isWeapon(item) ? (
                  <>
                    <span className="text-muted-foreground">
                      STR: <span className="text-parchment">{item.stats.Strength}</span>
                    </span>
                    <span className="text-muted-foreground">
                      MAG: <span className="text-parchment">{item.stats.Magick}</span>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-muted-foreground">
                      DEF: <span className="text-parchment">{item.stats.Defense}</span>
                    </span>
                    <span className="text-muted-foreground">
                      MDEF: <span className="text-parchment">{item.stats["Magick Defense"]}</span>
                    </span>
                  </>
                )}
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground mt-1 italic">Empty</p>
          )}
        </div>

        {/* Unequip Button */}
        {item && (
          <button
            onClick={handleUnequip}
            className="p-1 text-muted-foreground hover:text-accent transition-colors"
            title="Unequip"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export function getSlotIcon(slotKey: string) {
  switch (slotKey) {
    case 'weapon':
      return <Sword className="w-6 h-6 text-gold-dim" />;
    case 'secondaryWeapon':
      return <Sword className="w-6 h-6 text-gold-dim" />;
    case 'head':
      return <Crown className="w-6 h-6 text-gold-dim" />;
    case 'torso':
      return <Shirt className="w-6 h-6 text-gold-dim" />;
    case 'arms':
      return <Hand className="w-6 h-6 text-gold-dim" />;
    case 'legs':
      return <Footprints className="w-6 h-6 text-gold-dim" />;
    case 'cloak':
      return <Scroll className="w-6 h-6 text-gold-dim" />;
    default:
      return <Shield className="w-6 h-6 text-gold-dim" />;
  }
}

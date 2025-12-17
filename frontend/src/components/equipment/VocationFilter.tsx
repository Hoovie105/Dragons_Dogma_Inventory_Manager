import { VOCATIONS, Vocation } from '@/types/equipment';
import { cn } from '@/lib/utils';

interface VocationFilterProps {
  selectedVocation: Vocation | 'all';
  onVocationChange: (vocation: Vocation | 'all') => void;
}

const vocationColors: Record<Vocation, string> = {
  Fighter: 'hover:border-crimson hover:text-crimson',
  Strider: 'hover:border-gold hover:text-gold',
  Mage: 'hover:border-ice hover:text-ice',
  Warrior: 'hover:border-crimson hover:text-crimson',
  Ranger: 'hover:border-forest hover:text-forest',
  Sorcerer: 'hover:border-dark hover:text-purple-400',
  'Mystic Knight': 'hover:border-holy hover:text-holy',
  Assassin: 'hover:border-iron hover:text-gray-400',
  'Magick Archer': 'hover:border-lightning hover:text-lightning',
};

const selectedColors: Record<Vocation, string> = {
  Fighter: 'border-crimson text-crimson bg-crimson/10',
  Strider: 'border-gold text-gold bg-gold/10',
  Mage: 'border-ice text-ice bg-ice/10',
  Warrior: 'border-crimson text-crimson bg-crimson/10',
  Ranger: 'border-forest text-green-400 bg-forest/10',
  Sorcerer: 'border-dark text-purple-400 bg-dark/10',
  'Mystic Knight': 'border-holy text-holy bg-holy/10',
  Assassin: 'border-iron text-gray-400 bg-iron/10',
  'Magick Archer': 'border-lightning text-lightning bg-lightning/10',
};

export function VocationFilter({ selectedVocation, onVocationChange }: VocationFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onVocationChange('all')}
        className={cn(
          'px-3 py-1.5 text-xs font-display border rounded-sm transition-all duration-200',
          selectedVocation === 'all'
            ? 'border-primary text-primary bg-primary/10'
            : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
        )}
      >
        All
      </button>
      {VOCATIONS.map((vocation) => (
        <button
          key={vocation}
          onClick={() => onVocationChange(vocation)}
          className={cn(
            'px-3 py-1.5 text-xs font-display border rounded-sm transition-all duration-200',
            selectedVocation === vocation
              ? selectedColors[vocation]
              : `border-border text-muted-foreground ${vocationColors[vocation]}`
          )}
        >
          {vocation}
        </button>
      ))}
    </div>
  );
}

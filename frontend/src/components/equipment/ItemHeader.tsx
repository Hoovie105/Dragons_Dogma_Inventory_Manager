import { isWeapon } from '@/types/equipment';

export default function ItemHeader({ item }: { item: any }) {
  return (
    <div className="space-y-2">
      <h2 className="font-display text-2xl gold-text leading-tight">{item.name}</h2>
      <p className="text-sm text-muted-foreground">
        {isWeapon(item) ? item.stats?.['Weapon Type'] || 'Unknown' : item.stats?.['Armor Type'] || 'Unknown'}
      </p>
    </div>
  );
}

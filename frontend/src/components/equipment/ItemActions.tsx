import { Button } from '@/components/ui/button';
import { ExternalLink, Plus } from 'lucide-react';
import { isWeapon } from '@/types/equipment';

export default function ItemActions({ item, onEquip }: { item: any; onEquip: (slot?: 'weapon' | 'secondaryWeapon') => void }) {
  return (
    <div className="flex gap-3 pt-4 border-t border-border">
      {isWeapon(item) ? (
        <>
          <Button onClick={() => onEquip('weapon')} className="flex-1" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Primary
          </Button>
          <Button onClick={() => onEquip('secondaryWeapon')} variant="secondary" className="flex-1" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Secondary
          </Button>
        </>
      ) : (
        <Button onClick={() => onEquip()} className="flex-1">
          <Plus className="w-4 h-4 mr-2" />
          Equip
        </Button>
      )}
      <Button variant="outline" asChild>
        <a href={item.wiki_link} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="w-4 h-4 mr-2" />
          Wiki
        </a>
      </Button>
    </div>
  );
}

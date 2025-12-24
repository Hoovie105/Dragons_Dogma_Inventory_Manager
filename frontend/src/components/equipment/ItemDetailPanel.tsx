import { useEquipment } from '@/context/EquipmentContext';
import ItemHeader from '@/components/equipment/ItemHeader';
import ItemDescription from '@/components/equipment/ItemDescription';
import ItemStatistics from '@/components/equipment/ItemStatistics';
import ItemVocations from '@/components/equipment/ItemVocations';
import ItemLocations from '@/components/equipment/ItemLocations';
import ItemActions from '@/components/equipment/ItemActions';

export function ItemDetailPanel() {
  const { selectedItem, equipItem } = useEquipment();

  if (!selectedItem) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="font-display text-lg">No Item Selected</p>
          <p className="text-sm mt-2">Select an item from the armory to view details</p>
        </div>
      </div>
    );
  }

  const handleEquip = (slot?: 'weapon' | 'secondaryWeapon') => {
    equipItem(selectedItem, slot);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <ItemHeader item={selectedItem} />
      <ItemDescription item={selectedItem} />
      <ItemStatistics item={selectedItem} />
      <ItemVocations item={selectedItem} />
      <ItemLocations item={selectedItem} />
      <ItemActions item={selectedItem} onEquip={handleEquip} />
    </div>
  );
}

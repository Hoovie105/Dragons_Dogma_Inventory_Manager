import { useState, useMemo } from 'react';
import { useEquipmentData } from '@/hooks/useEquipmentData';
import { ItemCard } from './ItemCard';
import { VocationFilter } from './VocationFilter';
import { Vocation, EquipmentItem } from '@/types/equipment';
import { Search, Sword, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

type EquipmentType = 'weapons' | 'armor' | 'all';

export function BrowseTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const { armor, weapons, loading, error } = useEquipmentData(currentPage, 50);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVocation, setSelectedVocation] = useState<Vocation | 'all'>('all');
  const [equipmentType, setEquipmentType] = useState<EquipmentType>('all');

  const filteredItems = useMemo(() => {
    let items: EquipmentItem[] = [];
    
    if (equipmentType === 'weapons' || equipmentType === 'all') {
      items = [...items, ...(weapons?.items || [])];
    }
    if (equipmentType === 'armor' || equipmentType === 'all') {
      items = [...items, ...(armor?.items || [])];
    }

    if (selectedVocation !== 'all') {
      items = items.filter(item => item.vocations?.includes(selectedVocation));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      );
    }

    return items;
  }, [armor?.items, weapons?.items, selectedVocation, equipmentType, searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground font-body">Loading armory...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-accent">Failed to load equipment: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search equipment..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-secondary/50 border border-border rounded-sm pl-10 pr-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary font-body"
        />
      </div>

      {/* Equipment Type Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setEquipmentType('all')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-display border rounded-sm transition-all ${
            equipmentType === 'all'
              ? 'border-primary text-primary bg-primary/10'
              : 'border-border text-muted-foreground hover:border-primary/50'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setEquipmentType('weapons')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-display border rounded-sm transition-all ${
            equipmentType === 'weapons'
              ? 'border-primary text-primary bg-primary/10'
              : 'border-border text-muted-foreground hover:border-primary/50'
          }`}
        >
          <Sword className="w-4 h-4" />
          Weapons
        </button>
        <button
          onClick={() => setEquipmentType('armor')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-display border rounded-sm transition-all ${
            equipmentType === 'armor'
              ? 'border-primary text-primary bg-primary/10'
              : 'border-border text-muted-foreground hover:border-primary/50'
          }`}
        >
          <Shield className="w-4 h-4" />
          Armor
        </button>
      </div>

      {/* Vocation Filter */}
      <VocationFilter
        selectedVocation={selectedVocation}
        onVocationChange={setSelectedVocation}
      />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="gold-text font-medium">{filteredItems.length}</span> items
          {equipmentType === 'all' && (
            <>
              {' '}• Total: <span className="gold-text font-medium">
                {(armor?.total || 0) + (weapons?.total || 0)}
              </span> items
            </>
          )}
          {equipmentType === 'weapons' && weapons && (
            <>
              {' '}• Total: <span className="gold-text font-medium">{weapons.total}</span> weapons
            </>
          )}
          {equipmentType === 'armor' && armor && (
            <>
              {' '}• Total: <span className="gold-text font-medium">{armor.total}</span> armor pieces
            </>
          )}
        </p>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-1 text-sm border border-border rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          
          <span className="text-sm text-muted-foreground px-2">
            Page {currentPage}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={
              (equipmentType === 'weapons' && weapons && currentPage >= weapons.pages) ||
              (equipmentType === 'armor' && armor && currentPage >= armor.pages) ||
              (equipmentType === 'all' && weapons && armor && currentPage >= Math.max(weapons.pages, armor.pages))
            }
            className="flex items-center gap-1 px-3 py-1 text-sm border border-border rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/50 transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[calc(100vh-400px)] overflow-y-auto scrollbar-medieval pr-2">
        {filteredItems.map((item) => (
          <ItemCard key={`${item.name}-${item.id}`} item={item} />
        ))}
      </div>
    </div>
  );
}

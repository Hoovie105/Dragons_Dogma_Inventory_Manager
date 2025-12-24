import { useState, useMemo, useEffect } from 'react';
import { useEquipmentData } from '@/hooks/useEquipmentData';
import { ItemCard } from './ItemCard';
import { VocationFilter } from './VocationFilter';
import { Vocation, EquipmentItem } from '@/types/equipment';
import { Search, Sword, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

type EquipmentType = 'weapons' | 'armor' | 'all';

const ITEMS_PER_PAGE = 50;

export function BrowseTab() {
  const { armor, weapons, loading, error } = useEquipmentData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVocation, setSelectedVocation] = useState<Vocation | 'all'>('all');
  const [equipmentType, setEquipmentType] = useState<EquipmentType>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    let items: EquipmentItem[] = [];
    
    if (equipmentType === 'weapons' || equipmentType === 'all') {
      items = [...items, ...weapons];
    }
    if (equipmentType === 'armor' || equipmentType === 'all') {
      items = [...items, ...armor];
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
  }, [armor, weapons, selectedVocation, equipmentType, searchQuery]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, currentPage]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedVocation, equipmentType]);

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
      <p className="text-sm text-muted-foreground">
        Showing <span className="gold-text font-medium">{paginatedItems.length}</span> of <span className="gold-text font-medium">{filteredItems.length}</span> items
      </p>

      {/* Item Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[calc(100vh-400px)] overflow-y-auto scrollbar-medieval pr-2">
        {paginatedItems.map((item) => (
          <ItemCard key={`${item.name}-${item.id}`} item={item} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-4 relative">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="absolute left-0 flex items-center gap-2 px-3 py-2 text-sm font-display border rounded-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed border-border text-muted-foreground hover:border-primary/50 enabled:hover:text-primary"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          
          <div className="flex items-center gap-2 -translate-x-3">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="absolute right-0 flex items-center gap-2 px-3 py-2 text-sm font-display border rounded-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed border-border text-muted-foreground hover:border-primary/50 enabled:hover:text-primary"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

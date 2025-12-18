import { useEquipment } from '@/context/EquipmentContext';
import { isWeapon, isArmor } from '@/types/equipment';
import { Button } from '@/components/ui/button';
import { ExternalLink, Plus, Flame, Snowflake, Zap, Sun, Moon } from 'lucide-react';

function ElementalIcon({ element }: { element: string }) {
  const lower = element.toLowerCase();
  if (lower.includes('fire')) return <Flame className="w-4 h-4 stat-fire" />;
  if (lower.includes('ice')) return <Snowflake className="w-4 h-4 stat-ice" />;
  if (lower.includes('lightning') || lower.includes('thunder')) return <Zap className="w-4 h-4 stat-lightning" />;
  if (lower.includes('holy') || lower.includes('light')) return <Sun className="w-4 h-4 stat-holy" />;
  if (lower.includes('dark')) return <Moon className="w-4 h-4 stat-dark" />;
  return null;
}

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

  const handleEquip = () => {
    equipItem(selectedItem);
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="font-display text-2xl gold-text leading-tight">
          {selectedItem.name}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isWeapon(selectedItem) 
            ? selectedItem.stats?.["Weapon Type"] || 'Unknown'
            : selectedItem.stats?.["Armor Type"] || 'Unknown'}
        </p>
      </div>

      {/* Description */}
      {selectedItem.description && (
        <p className="text-parchment leading-relaxed text-sm italic border-l-2 border-gold-dim pl-4">
          "{selectedItem.description}"
        </p>
      )}

      {/* Main Stats */}
      <div className="medieval-border bg-secondary/30 p-4 rounded-sm">
        <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Statistics
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {isWeapon(selectedItem) ? (
            <>
              <StatRow label="Strength: " value={selectedItem.stats?.Strength || '0'} />
              <StatRow label="Magick: " value={selectedItem.stats?.Magick || '0'} />
              <StatRow label="Stagger Power: " value={selectedItem.stats?.["Stagger Power"] || '0'} />
              <StatRow label="Knockdown: " value={selectedItem.stats?.["Knockdown Power"] || '0'} />
              <StatRow label="Weight: " value={selectedItem.stats?.Weight || '0'} />
              <StatRow label="Value: " value={selectedItem.stats?.Value || '0'} />
            </>
          ) : (
            <>
              <StatRow label="Defense: " value={selectedItem.stats?.Defense || '0'} />
              <StatRow label="Magick Defense: " value={selectedItem.stats?.["Magick Defense"] || '0'} />
              <StatRow label="Weight: " value={selectedItem.stats?.Weight || '0'} />
              <StatRow label="Value: " value={selectedItem.stats?.Value || '0'} />
            </>
          )}
        </div>
      </div>

      {/* Elemental */}
      {isWeapon(selectedItem) && selectedItem.stats?.Elemental && selectedItem.stats.Elemental !== 'None' && (
        <div className="medieval-border bg-secondary/30 p-4 rounded-sm">
          <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-3">
            Elemental
          </h3>
          <div className="flex items-center gap-2">
            <ElementalIcon element={selectedItem.stats.Elemental} />
            <span className="text-parchment">{selectedItem.stats.Elemental}</span>
          </div>
        </div>
      )}

      {/* Elemental Resistances for Armor */}
      {isArmor(selectedItem) &&
        selectedItem.elemental_res &&
        Object.keys(selectedItem.elemental_res).length > 0 && (
          <div className="medieval-border bg-secondary/30 p-4 rounded-sm">
            <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-3">
              Elemental Resistances
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {Object.entries(selectedItem.elemental_res).map(([element, value]) => (
                <div key={element} className="flex items-center gap-2">
                  <ElementalIcon element={element} />
                  <span className="text-sm text-muted-foreground">
                    {element}:
                  </span>
                  <span
                    className={`text-sm ${
                      value.trim().startsWith('-')
                        ? 'text-accent'
                        : 'text-green-400'
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Debilitation Resistances for Armor */}
      {isArmor(selectedItem) && selectedItem.debilitation_res && Object.keys(selectedItem.debilitation_res).length > 0 && (
        <div className="medieval-border bg-secondary/30 p-4 rounded-sm">
          <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-3">
            Debilitation Resistances
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(selectedItem.debilitation_res).map(([debilitation, value]) => (
              <div key={debilitation}>
                <span className="text-sm text-muted-foreground mr-1">{debilitation}:</span>
                <span className="text-sm text-green-400">
                  {typeof value === 'string' ? value.replace(/,$/, '') : value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vocations */}
      <div className="space-y-2">
        <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground">
          Usable By
        </h3>
        <div className="flex flex-wrap gap-2">
          {selectedItem.vocations.map((vocation) => (
            <span
              key={vocation}
              className="px-2 py-1 text-xs bg-secondary border border-border rounded-sm text-parchment"
            >
              {vocation}
            </span>
          ))}
        </div>
      </div>

      {/* Locations */}
      {selectedItem.locations && selectedItem.locations.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground">
            Where to Find
          </h3>
          <ul className="space-y-2">
            {selectedItem.locations.map((location, index) => (
              <li key={index} className="text-sm text-parchment flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{location}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-border">
        <Button onClick={handleEquip} className="flex-1">
          <Plus className="w-4 h-4 mr-2" />
          Equip
        </Button>
        <Button variant="outline" asChild>
          <a href={selectedItem.wiki_link} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            Wiki
          </a>
        </Button>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm text-parchment font-medium">{value || '-'}</span>
    </div>
  );
}

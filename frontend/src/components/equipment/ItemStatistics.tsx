import { isWeapon, isArmor } from '@/types/equipment';

function ElementalIcon({ element }: { element: string }) {
  const lower = element.toLowerCase();
  if (lower.includes('fire')) return <span className="inline-block w-4 h-4 stat-fire">🔥</span>;
  if (lower.includes('ice')) return <span className="inline-block w-4 h-4 stat-ice">❄️</span>;
  if (lower.includes('lightning') || lower.includes('thunder')) return <span className="inline-block w-4 h-4 stat-lightning">⚡</span>;
  if (lower.includes('holy') || lower.includes('light')) return <span className="inline-block w-4 h-4 stat-holy">☀️</span>;
  if (lower.includes('dark')) return <span className="inline-block w-4 h-4 stat-dark">🌑</span>;
  return null;
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm text-parchment font-medium">{value || '-'}</span>
    </div>
  );
}

export default function ItemStatistics({ item }: { item: any }) {
  return (
    <>
      <div className="medieval-border bg-secondary/30 p-4 rounded-sm">
        <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-3">Statistics</h3>
        <div className="grid grid-cols-2 gap-3">
          {isWeapon(item) ? (
            <>
              <StatRow label="Strength: " value={item.stats?.Strength || '0'} />
              <StatRow label="Magick: " value={item.stats?.Magick || '0'} />
              <StatRow label="Stagger Power: " value={item.stats?.['Stagger Power'] || '0'} />
              <StatRow label="Knockdown: " value={item.stats?.['Knockdown Power'] || '0'} />
              <StatRow label="Weight: " value={item.stats?.Weight || '0'} />
              <StatRow label="Value: " value={item.stats?.Value || '0'} />
            </>
          ) : (
            <>
              <StatRow label="Defense: " value={item.stats?.Defense || '0'} />
              <StatRow label="Magick Defense: " value={item.stats?.['Magick Defense'] || '0'} />
              <StatRow label="Weight: " value={item.stats?.Weight || '0'} />
              <StatRow label="Value: " value={item.stats?.Value || '0'} />
            </>
          )}
        </div>
      </div>

      {/* Elemental for weapons */}
      {isWeapon(item) && item.stats?.Elemental && item.stats.Elemental !== 'None' && (
        <div className="medieval-border bg-secondary/30 p-4 rounded-sm">
          <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-3">Elemental</h3>
          <div className="flex items-center gap-2">
            <ElementalIcon element={item.stats.Elemental} />
            <span className="text-parchment">{item.stats.Elemental}</span>
          </div>
        </div>
      )}

      {/* Armor element/resistances */}
      {isArmor(item) && item.elemental_res && Object.keys(item.elemental_res).length > 0 && (
        <div className="medieval-border bg-secondary/30 p-4 rounded-sm">
          <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-3">Elemental Resistances</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(item.elemental_res).map(([element, value]) => (
              <div key={element} className="flex items-center gap-2">
                <ElementalIcon element={element} />
                <span className="text-sm text-muted-foreground">{element}:</span>
                <span className={`text-sm ${value.trim().startsWith('-') ? 'text-accent' : 'text-green-400'}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {isArmor(item) && item.debilitation_res && Object.keys(item.debilitation_res).length > 0 && (
        <div className="medieval-border bg-secondary/30 p-4 rounded-sm">
          <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-3">Debilitation Resistances</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(item.debilitation_res).map(([debilitation, value]) => (
              <div key={debilitation}>
                <span className="text-sm text-muted-foreground mr-1">{debilitation}:</span>
                <span className="text-sm text-green-400">{typeof value === 'string' ? value.replace(/,$/, '') : value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function ItemVocations({ item }: { item: any }) {
  return (
    <div className="space-y-2">
      <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground">Usable By</h3>
      <div className="flex flex-wrap gap-2">
        {item.vocations.map((vocation: string) => (
          <span key={vocation} className="px-2 py-1 text-xs bg-secondary border border-border rounded-sm text-parchment">
            {vocation}
          </span>
        ))}
      </div>
    </div>
  );
}

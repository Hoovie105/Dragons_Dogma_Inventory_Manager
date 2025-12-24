export default function ItemLocations({ item }: { item: any }) {
  if (!item.locations || item.locations.length === 0) return null;
  return (
    <div className="space-y-2">
      <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground">Where to Find</h3>
      <ul className="space-y-2">
        {item.locations.map((location: string, index: number) => (
          <li key={index} className="text-sm text-parchment flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>{location}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

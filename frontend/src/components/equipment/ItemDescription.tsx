export default function ItemDescription({ item }: { item: any }) {
  if (!item.description) return null;
  return (
    <p className="text-parchment leading-relaxed text-sm italic border-l-2 border-gold-dim pl-4">
      "{item.description}"
    </p>
  );
}

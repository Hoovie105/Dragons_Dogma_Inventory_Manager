import React from 'react'

export default function ItemCard({ item, onSelect }) {
  const statPreview = item.stats ? Object.entries(item.stats).slice(0, 3).map(([k, v]) => `${k}: ${v}`).join(' • ') : ''
  return (
    <div className="item-card" onClick={onSelect}>
      <div className="icon">🛡️</div>
      <div className="meta">
        <div className="name">{item.name}</div>
        <div className="type">{item.description || ''}</div>
        <div className="preview">{statPreview}</div>
      </div>
    </div>
  )
}

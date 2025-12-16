import React from 'react'

export default function ItemDetail({ item }) {
  return (
    <div className="detail">
      <h2 className="detail-title">{item.name}</h2>
      <div className="detail-desc">{item.description}</div>

      <div className="panel">
        <h3>Statistics</h3>
        {item.stats ? (
          <ul>
            {Object.entries(item.stats).map(([k, v]) => (
              <li key={k}><strong>{k}</strong>: {String(v)}</li>
            ))}
          </ul>
        ) : (
          <div className="muted">No stats</div>
        )}
      </div>

      {item.elemental_res && (
        <div className="panel">
          <h3>Elemental</h3>
          <ul>
            {Object.entries(item.elemental_res).map(([k, v]) => (
              <li key={k}>{k}: {String(v)}</li>
            ))}
          </ul>
        </div>
      )}

      {item.debilitation_res && (
        <div className="panel">
          <h3>Debilitation</h3>
          <ul>
            {Object.entries(item.debilitation_res).map(([k, v]) => (
              <li key={k}>{k}: {String(v)}</li>
            ))}
          </ul>
        </div>
      )}

      {item.locations && (
        <div className="panel">
          <h3>Where to Find</h3>
          <ul>
            {item.locations.map((l, idx) => <li key={idx}>{l}</li>)}
          </ul>
        </div>
      )}

      <div className="actions">
        <button className="btn primary">+ Equip</button>
        {item.wiki_link && <a className="btn" href={item.wiki_link} target="_blank" rel="noreferrer">Wiki</a>}
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ItemCard from './components/ItemCard'
import ItemDetail from './components/ItemDetail'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export default function App() {
  const [tab, setTab] = useState('weapons')
  const [weapons, setWeapons] = useState([])
  const [armor, setArmor] = useState([])
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchLists()
  }, [])

  async function fetchLists() {
    try {
      const [wRes, aRes] = await Promise.all([
        axios.get(`${API_BASE}/weapons`),
        axios.get(`${API_BASE}/armor`),
      ])
      setWeapons(wRes.data || [])
      setArmor(aRes.data || [])
    } catch (err) {
      console.error('Failed to fetch lists', err)
    }
  }

  const items = tab === 'weapons' ? weapons : armor
  const filtered = items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="app-root">
      <header className="topbar">
        <div className="title">Dragon's Dogma</div>
        <div className="sub">Equipment Manager — Dark Arisen</div>
      </header>

      <main className="container">
        <section className="left">
          <div className="controls">
            <div className="search">
              <input placeholder="Search equipment..." value={query} onChange={e => setQuery(e.target.value)} />
            </div>
            <div className="tabs">
              <button className={tab === 'weapons' ? 'active' : ''} onClick={() => { setTab('weapons'); setSelected(null) }}>Weapons</button>
              <button className={tab === 'armor' ? 'active' : ''} onClick={() => { setTab('armor'); setSelected(null) }}>Armor</button>
            </div>
            <div className="count">Showing {filtered.length} items</div>
          </div>

          <div className="list">
            {filtered.map(item => (
              <ItemCard key={item.id} item={item} onSelect={() => setSelected(item)} />
            ))}
          </div>
        </section>

        <aside className="right">
          {selected ? (
            <ItemDetail item={selected} />
          ) : (
            <div className="placeholder">Select an item to view details</div>
          )}
        </aside>
      </main>
    </div>
  )
}

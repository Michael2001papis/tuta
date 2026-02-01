import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './BeforeAfter.css'

const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect fill="%23e0e0e0" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="14"%3Eלפני / אחרי%3C/text%3E%3C/svg%3E'

function loadBeforeAfter() {
  try {
    const s = localStorage.getItem('sophia_before_after')
    return s ? JSON.parse(s) : []
  } catch {
    return []
  }
}

function saveBeforeAfter(data) {
  localStorage.setItem('sophia_before_after', JSON.stringify(data))
}

export default function BeforeAfter() {
  const { isLoggedIn } = useAuth()
  const [items, setItems] = useState(loadBeforeAfter)
  const [adding, setAdding] = useState(false)
  const [newItem, setNewItem] = useState({ before: '', after: '', title: '' })

  const addItem = () => {
    if (!newItem.before && !newItem.after) return
    const next = [...items, { id: Date.now(), ...newItem }]
    setItems(next)
    saveBeforeAfter(next)
    setNewItem({ before: '', after: '', title: '' })
    setAdding(false)
  }

  const removeItem = (id) => {
    const next = items.filter(i => i.id !== id)
    setItems(next)
    saveBeforeAfter(next)
  }

  if (items.length === 0 && !isLoggedIn) {
    return (
      <div className="before-after-page">
        <h1>עבודות לפני ואחרי</h1>
        <p>יצירות נבחרות של Sofia Beauty Clinic. צפייה נעימה לעין.</p>
        <p className="empty-state">טרם נוספו עבודות. Sofia Beauty Clinic תעדכן בהקדם.</p>
      </div>
    )
  }

  return (
    <div className="before-after-page">
      <h1>עבודות לפני ואחרי</h1>
      <p>תוצאות מרשימות – לפני טיפול ואחרי טיפול.</p>

      {isLoggedIn && (
        <div className="add-section">
          {!adding ? (
            <button onClick={() => setAdding(true)}>הוסף עבודה</button>
          ) : (
            <div className="add-form">
              <input
                placeholder="כותרת (אופציונלי)"
                value={newItem.title}
                onChange={e => setNewItem(f => ({ ...f, title: e.target.value }))}
              />
              <input
                placeholder="קישור לתמונה לפני"
                value={newItem.before}
                onChange={e => setNewItem(f => ({ ...f, before: e.target.value }))}
              />
              <input
                placeholder="קישור לתמונה אחרי"
                value={newItem.after}
                onChange={e => setNewItem(f => ({ ...f, after: e.target.value }))}
              />
              <button onClick={addItem}>הוסף</button>
              <button onClick={() => setAdding(false)}>ביטול</button>
            </div>
          )}
        </div>
      )}

      <div className="before-after-grid">
        {items.map((item) => (
          <div key={item.id} className="ba-card">
            {item.title && <h3>{item.title}</h3>}
            <div className="ba-images">
              <div className="ba-box">
                <span className="ba-label">לפני</span>
                <img src={item.before || PLACEHOLDER_IMAGE} alt="לפני" />
              </div>
              <div className="ba-box">
                <span className="ba-label">אחרי</span>
                <img src={item.after || PLACEHOLDER_IMAGE} alt="אחרי" />
              </div>
            </div>
            {isLoggedIn && (
              <button className="remove-btn" onClick={() => removeItem(item.id)}>מחק</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

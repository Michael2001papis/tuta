import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useSettings } from '../context/SettingsContext'
import './Products.css'

const INITIAL_PRODUCTS = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `מוצר ${i + 1}`,
  price: 0,
  withVat: true,
  description: '',
}))

function loadProducts() {
  try {
    const s = localStorage.getItem('sophia_products')
    if (s) return JSON.parse(s)
  } catch {}
  return INITIAL_PRODUCTS
}

function saveProducts(data) {
  localStorage.setItem('sophia_products', JSON.stringify(data))
}

export default function Products() {
  const { isLoggedIn } = useAuth()
  const { siteSettings, updateSiteSettings } = useSettings()
  const [products, setProducts] = useState(loadProducts)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})

  const startEdit = (p) => {
    setEditingId(p.id)
    setEditForm({
      name: p.name,
      price: p.price,
      withVat: p.withVat,
      description: (p.description || '').split(/\s+/).slice(0, 30).join(' '),
    })
  }

  const saveEdit = () => {
    if (!editingId) return
    const next = products.map(p =>
      p.id === editingId
        ? {
            ...p,
            name: editForm.name,
            price: Number(editForm.price) || 0,
            withVat: editForm.withVat,
            description: (editForm.description || '').split(/\s+/).filter(Boolean).slice(0, 30).join(' '),
          }
        : p
    )
    setProducts(next)
    saveProducts(next)
    setEditingId(null)
  }

  const displayProducts = products.map(p =>
    p.id === editingId ? { ...p, ...editForm } : p
  )

  return (
    <div className="products-page">
      <h1>מוצרים</h1>

      {!isLoggedIn && siteSettings.productsEditing && (
        <div className="editing-notice">סופיה מעדכנת כרגע את רשימת המוצרים. התצוגה תתעדכן בהקדם.</div>
      )}

      <p className="products-desc">
        {isLoggedIn ? 'ניתן לערוך פרטי מוצרים.' : 'רשימת המוצרים – תצוגה בלבד.'}
      </p>

      {isLoggedIn && (
        <div className="edit-actions">
          <button
            onClick={() => updateSiteSettings({ productsEditing: !siteSettings.productsEditing })}
            className="edit-toggle"
          >
            {siteSettings.productsEditing ? 'סיום עריכה' : 'מצב עריכה'}
          </button>
        </div>
      )}

      {isLoggedIn && siteSettings.productsEditing && (
        <p className="edit-hint">לחצי על "עריכה" במוצר כדי לעדכן פרטים.</p>
      )}

      <div className="products-grid">
        {displayProducts.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-serial">#{p.id}</div>
            {editingId === p.id ? (
              <div className="product-edit">
                <input
                  value={editForm.name}
                  onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="שם מוצר"
                />
                <input
                  type="number"
                  value={editForm.price}
                  onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))}
                  placeholder="מחיר"
                />
                <label>
                  <input
                    type="checkbox"
                    checked={editForm.withVat}
                    onChange={e => setEditForm(f => ({ ...f, withVat: e.target.checked }))}
                  />
                  כולל מעמ
                </label>
                <textarea
                  value={editForm.description}
                  onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="הסבר (עד 30 מילים)"
                  rows={2}
                />
                <span className="char-count">{editForm.description.split(/\s+/).filter(Boolean).length}/30 מילים</span>
                <button onClick={saveEdit}>שמור</button>
              </div>
            ) : (
              <>
                <h3>{p.name}</h3>
                <p className="price">
                  ₪{p.price} {p.withVat ? '(כולל מעמ)' : '(ללא מעמ)'}
                </p>
                {p.description && <p className="desc">{p.description}</p>}
                {isLoggedIn && siteSettings.productsEditing && (
                  <button className="edit-btn" onClick={() => startEdit(p)}>עריכה</button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

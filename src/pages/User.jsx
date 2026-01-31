import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSettings } from '../context/SettingsContext'
import { Link } from 'react-router-dom'
import './User.css'

export default function User() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const { siteSettings, updateSiteSettings } = useSettings()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  if (!isLoggedIn) return null

  return (
    <div className="user-page">
      <h1>עמוד משתמש – סופיה</h1>
      <p className="user-intro">מכאן יש לך שליטה מלאה על תצוגת האתר ללקוחות.</p>

      <section className="user-section">
        <h2>עריכת עמוד הבית</h2>
        <p className="section-hint">כותרת, תת-כותרת, והצגה/הסתרה של אלמנטים.</p>
        <Link to="/settings" className="user-link">עבור להגדרות ←</Link>
      </section>

      <section className="user-section">
        <h2>לוח זמנים</h2>
        <p className="section-hint">עריכת שעות עבודה וימי חופש. הלקוחות רואים תצוגה בלבד.</p>
        <Link to="/schedule" className="user-link">עבור ללוח זמנים ←</Link>
      </section>

      <section className="user-section">
        <h2>מוצרים</h2>
        <p className="section-hint">הוספה, עריכה ומחיקה של מוצרים. הלקוחות רואים גרסה סופית בלבד.</p>
        <Link to="/products" className="user-link">עבור למוצרים ←</Link>
      </section>

      <section className="user-section">
        <h2>תצוגה בזמן עריכה</h2>
        <p className="section-hint">כשאת מעדכנת לוח זמנים או מוצרים – הלקוחות יראו הודעה "מעדכן כרגע" עד שתסיימי.</p>
        <div className="toggle-row">
          <label>
            <input
              type="checkbox"
              checked={siteSettings.scheduleEditing}
              onChange={e => updateSiteSettings({ scheduleEditing: e.target.checked })}
            />
            לוח זמנים – במצב עריכה
          </label>
        </div>
        <div className="toggle-row">
          <label>
            <input
              type="checkbox"
              checked={siteSettings.productsEditing}
              onChange={e => updateSiteSettings({ productsEditing: e.target.checked })}
            />
            מוצרים – במצב עריכה
          </label>
        </div>
      </section>
    </div>
  )
}

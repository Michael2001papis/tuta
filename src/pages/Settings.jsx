import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useSettings } from '../context/SettingsContext'
import './Settings.css'

export default function Settings() {
  const { isLoggedIn } = useAuth()
  const {
    language,
    setLanguage,
    fontSize,
    setFontSize,
    colorTheme,
    setColorTheme,
    siteSettings,
    updateSiteSettings,
    t,
  } = useSettings()

  return (
    <div className="settings-page">
      <h1>הגדרות כלליות</h1>

      <section className="settings-section">
        <h2>הגדרות ללקוח</h2>
        <p className="section-desc">הגדרות אלה זמינות לכל המבקרים באתר.</p>

        <div className="setting-item">
          <label>שפה</label>
          <p className="setting-hint">בחר את שפת התצוגה של האתר.</p>
          <select value={language} onChange={e => setLanguage(e.target.value)}>
            <option value="he">עברית</option>
            <option value="ru">רוסית</option>
            <option value="en">אנגלית</option>
            <option value="es">ספרדית</option>
            <option value="de">גרמנית</option>
          </select>
        </div>

        <div className="setting-item">
          <label>גודל אותיות</label>
          <p className="setting-hint">התאמת גודל הטקסט לצרכים שלך.</p>
          <select value={fontSize} onChange={e => setFontSize(e.target.value)}>
            <option value="small">קטן</option>
            <option value="default">ברירת מחדל</option>
            <option value="large">גדול</option>
          </select>
        </div>

        <div className="setting-item">
          <label>צבעים</label>
          <p className="setting-hint">שחור-לבן או היפוך צבעים לנוחות בעיות ראייה.</p>
          <select value={colorTheme} onChange={e => setColorTheme(e.target.value)}>
            <option value="normal">רגיל</option>
            <option value="dark">כהה</option>
            <option value="inverted">היפוך (שחור לבן)</option>
          </select>
        </div>
      </section>

      {isLoggedIn && (
        <section className="settings-section sophia-settings">
          <h2>הגדרות למשתמש (סופיה)</h2>
          <p className="section-desc">שליטה מלאה על תצוגת האתר ללקוחות.</p>

          <div className="setting-item">
            <label>כותרת עמוד הבית</label>
            <p className="setting-hint">הכותרת שמופיעה בראש עמוד הבית.</p>
            <input
              type="text"
              value={siteSettings.homeTitle}
              onChange={e => updateSiteSettings({ homeTitle: e.target.value })}
            />
          </div>

          <div className="setting-item">
            <label>תת-כותרת עמוד הבית</label>
            <p className="setting-hint">טקסט מתחת לכותרת הראשית.</p>
            <input
              type="text"
              value={siteSettings.homeSubtitle}
              onChange={e => updateSiteSettings({ homeSubtitle: e.target.value })}
            />
          </div>

          <div className="setting-item checkbox">
            <label>
              <input
                type="checkbox"
                checked={siteSettings.showSocialLinks}
                onChange={e => updateSiteSettings({ showSocialLinks: e.target.checked })}
              />
              הצג קישורי רשתות חברתיות
            </label>
            <p className="setting-hint">הצג את כפתורי Instagram, Facebook, TikTok.</p>
          </div>

          <div className="setting-item checkbox">
            <label>
              <input
                type="checkbox"
                checked={siteSettings.showCertificates}
                onChange={e => updateSiteSettings({ showCertificates: e.target.checked })}
              />
              הצג סעיף תעודות וניסיון
            </label>
            <p className="setting-hint">הצג את המידע על התעודות והניסיון.</p>
          </div>
        </section>
      )}
    </div>
  )
}

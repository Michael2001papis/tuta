import React, { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext()

const translations = {
  he: {
    home: 'עמוד הבית',
    settings: 'הגדרות כלליות',
    contact: 'יצירת קשר',
    schedule: 'לוח זמנים',
    user: 'עמוד משתמש',
    copyright: 'זכויות יוצרים',
    products: 'מוצרים',
    beforeAfter: 'עבודות לפני ואחרי',
    login: 'כניסה למשתמש',
    logout: 'יציאה',
    // Add more as needed
  },
  ru: { home: 'Главная', settings: 'Настройки', contact: 'Контакты', schedule: 'Расписание', user: 'Пользователь', copyright: 'Авторские права', products: 'Продукты', beforeAfter: 'До и после', login: 'Вход', logout: 'Выход' },
  en: { home: 'Home', settings: 'Settings', contact: 'Contact', schedule: 'Schedule', user: 'User', copyright: 'Copyright', products: 'Products', beforeAfter: 'Before & After', login: 'Login', logout: 'Logout' },
  es: { home: 'Inicio', settings: 'Ajustes', contact: 'Contacto', schedule: 'Horario', user: 'Usuario', copyright: 'Derechos', products: 'Productos', beforeAfter: 'Antes y Después', login: 'Entrar', logout: 'Salir' },
  de: { home: 'Start', settings: 'Einstellungen', contact: 'Kontakt', schedule: 'Zeitplan', user: 'Benutzer', copyright: 'Urheberrecht', products: 'Produkte', beforeAfter: 'Vor und Nach', login: 'Anmelden', logout: 'Abmelden' },
}

export function SettingsProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('sophia_lang') || 'he')
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('sophia_font') || 'default')
  const [colorTheme, setColorTheme] = useState(() => localStorage.getItem('sophia_theme') || 'normal')
  
  // Sophia's site-wide settings (editable only when logged in)
  const [siteSettings, setSiteSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('sophia_site_settings')
      return saved ? JSON.parse(saved) : {
        homeTitle: 'ברוכים הבאים לסופיה - קוסמטיקה קלינית',
        homeSubtitle: 'טיפולים מקצועיים עם ניסיון רב ותעודות',
        showSocialLinks: true,
        showCertificates: true,
        scheduleEditing: false,
        productsEditing: false,
      }
    } catch {
      return {
        homeTitle: 'ברוכים הבאים לסופיה - קוסמטיקה קלינית',
        homeSubtitle: 'טיפולים מקצועיים עם ניסיון רב ותעודות',
        showSocialLinks: true,
        showCertificates: true,
        scheduleEditing: false,
        productsEditing: false,
      }
    }
  })

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr'
  }, [language])

  useEffect(() => {
    document.body.classList.remove('font-small', 'font-default', 'font-large')
    document.body.classList.add(`font-${fontSize}`)
    localStorage.setItem('sophia_font', fontSize)
  }, [fontSize])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorTheme === 'inverted' ? 'inverted' : colorTheme === 'dark' ? 'dark' : '')
    localStorage.setItem('sophia_theme', colorTheme)
  }, [colorTheme])

  useEffect(() => {
    localStorage.setItem('sophia_lang', language)
  }, [language])

  useEffect(() => {
    localStorage.setItem('sophia_site_settings', JSON.stringify(siteSettings))
  }, [siteSettings])

  const updateSiteSettings = (updates) => {
    setSiteSettings(prev => ({ ...prev, ...updates }))
  }

  const t = (key) => translations[language]?.[key] ?? translations.he[key] ?? key

  return (
    <SettingsContext.Provider value={{
      language, setLanguage,
      fontSize, setFontSize,
      colorTheme, setColorTheme,
      siteSettings, updateSiteSettings,
      t, translations
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) throw new Error('useSettings must be used within SettingsProvider')
  return context
}

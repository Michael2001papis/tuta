import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSettings } from '../context/SettingsContext'
import './Header.css'

const navItems = [
  { path: '/', label: 'home' },
  { path: '/settings', label: 'settings' },
  { path: '/contact', label: 'contact' },
  { path: '/schedule', label: 'schedule' },
  { path: '/products', label: 'products' },
  { path: '/before-after', label: 'beforeAfter' },
]

function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="22" fill="url(#logoGrad)" stroke="#fff" strokeWidth="1.5" />
        <path d="M24 14 L28 22 L24 26 L20 22 Z" fill="#fff" opacity="0.95" />
      </svg>
    </span>
  )
}

export default function Header() {
  const { isLoggedIn, login, logout } = useAuth()
  const { t } = useSettings()
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(false)
  const [logoImgFailed, setLogoImgFailed] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setLoginError('')
    if (login(username, password)) {
      setShowLogin(false)
      setUsername('')
      setPassword('')
      navigate('/user')
    } else {
      setLoginError('שם משתמש או סיסמה שגויים. שם המשתמש: SV123456')
    }
  }

  const showImg = !logoImgFailed

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo" aria-label="סופיה - קוסמטיקה קלינית">
          {showImg ? (
            <img
              src="/logo.svg"
              alt="סופיה"
              className="logo-img"
              onError={() => setLogoImgFailed(true)}
            />
          ) : (
            <span className="logo-text">
              <LogoMark />
              <span className="logo-name">סופיה</span>
            </span>
          )}
        </Link>
        <ul className="nav-links">
          {navItems.map(({ path, label }) => (
            <li key={path}>
              <Link to={path}>{t(label)}</Link>
            </li>
          ))}
          {isLoggedIn && (
            <li>
              <Link to="/user">{t('user')}</Link>
            </li>
          )}
        </ul>
        <div className="header-actions">
          <Link to="/copyright" className="btn-copyright">{t('copyright')}</Link>
          {isLoggedIn ? (
            <button className="btn-login" onClick={() => { logout(); navigate('/') }}>{t('logout')}</button>
          ) : (
            <button className="btn-login" onClick={() => setShowLogin(true)}>{t('login')}</button>
          )}
        </div>
      </nav>

      {showLogin && (
        <div className="login-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-modal" onClick={e => e.stopPropagation()}>
            <h3>כניסה למשתמש</h3>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="text"
                placeholder="שם משתמש"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="סיסמה"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              {loginError && <p className="login-error">{loginError}</p>}
              <button type="submit">כניסה</button>
            </form>
            <button className="close-login" onClick={() => setShowLogin(false)}>סגור</button>
          </div>
        </div>
      )}
    </header>
  )
}

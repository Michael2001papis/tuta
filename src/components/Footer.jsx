import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>סופיה</h3>
          <p>קוסמטיקה קלינית מקצועית</p>
          <p className="footer-tagline">ניסיון של למעלה מעשור</p>
        </div>

        <div className="footer-section">
          <h4>קישורים מהירים</h4>
          <nav className="footer-nav">
            <Link to="/">עמוד הבית</Link>
            <Link to="/products">מוצרים</Link>
            <Link to="/schedule">לוח זמנים</Link>
            <Link to="/contact">יצירת קשר</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h4>יצירת קשר</h4>
          <a href="tel:0508535941" className="footer-contact">050-8535941</a>
          <a href="mailto:sophiacosmetics@gmail.com" className="footer-contact">sophiacosmetics@gmail.com</a>
          <a href="https://wa.me/972508535941" target="_blank" rel="noopener noreferrer" className="footer-contact">WhatsApp</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} סופיה - קוסמטיקה קלינית. כל הזכויות שמורות.</p>
        <Link to="/copyright" className="footer-legal">תנאי שימוש וזכויות יוצרים</Link>
      </div>
    </footer>
  )
}

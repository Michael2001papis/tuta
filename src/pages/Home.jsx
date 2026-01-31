import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext'
import './Home.css'

const socialLinks = [
  { name: 'Instagram', icon: '📷', url: 'https://instagram.com' },
  { name: 'Facebook', icon: '📘', url: 'https://facebook.com' },
  { name: 'TikTok', icon: '🎵', url: 'https://tiktok.com' },
]

const services = [
  { title: 'טיפולי פנים מתקדמים', icon: '✨', desc: 'טיפולים מקצועיים המותאמים אישית' },
  { title: 'מניקור ופדיקור', icon: '💅', desc: 'עיצוב ציפורניים ברמה הגבוהה ביותר' },
  { title: 'הסרת שיער', icon: '🌟', desc: 'טכנולוגיות מתקדמות לתוצאות מושלמות' },
  { title: 'טיפולי גוף', icon: '💆', desc: 'חוויית רוגע ופינוק מלאה' },
]

const testimonials = [
  { name: 'שרה כהן', text: 'סופיה פשוט מדהימה! התוצאות עברו את כל הציפיות. מקצועית ברמה אחרת.', rating: 5 },
  { name: 'מיכל לוי', text: 'המקום הכי טוב בעיר. אווירה נעימה, יחס חם ותוצאות מושלמות!', rating: 5 },
  { name: 'רונית אברהם', text: 'ממליצה בחום! עובדת עם סופיה כבר שנתיים ולא מפסיקה להיות מרוצה.', rating: 5 },
]

export default function Home() {
  const { siteSettings } = useSettings()
  const [showCTA, setShowCTA] = useState(true)

  return (
    <div className="home">
      <section className="hero">
        <h1>{siteSettings.homeTitle}</h1>
        <p className="subtitle">{siteSettings.homeSubtitle}</p>
        <div className="hero-cta">
          <Link to="/contact" className="cta-primary">
            <span className="cta-icon">📞</span>
            <span>הזמינו טיפול עכשיו</span>
          </Link>
          <Link to="/schedule" className="cta-secondary">
            <span>לוח זמנים פנוי</span>
          </Link>
        </div>
        <div className="trust-badges">
          <div className="badge">
            <span className="badge-icon">⭐</span>
            <span className="badge-text">500+ לקוחות מרוצים</span>
          </div>
          <div className="badge">
            <span className="badge-icon">🏆</span>
            <span className="badge-text">10+ שנות ניסיון</span>
          </div>
          <div className="badge">
            <span className="badge-icon">✅</span>
            <span className="badge-text">תעודות מקצועיות</span>
          </div>
        </div>
      </section>

      <section className="services-section">
        <h2>השירותים שלנו</h2>
        <p className="section-subtitle">מגוון רחב של טיפולים מקצועיים</p>
        <div className="services-grid">
          {services.map((service, idx) => (
            <div key={idx} className="service-card">
              <span className="service-icon">{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {siteSettings.showCertificates && (
        <section className="certificates">
          <h2>מקצועיות ללא פשרות</h2>
          <p>לסופיה תעודות מקצועיות רבות וניסיון עשיר בתחום הקוסמטיקה הקלינית. לקוחות מרוצים מכל הארץ חוזרים אליה שוב ושוב.</p>
          <Link to="/before-after" className="view-work-btn">
            צפו בעבודות שלנו →
          </Link>
        </section>
      )}

      <section className="testimonials-section">
        <h2>מה הלקוחות שלנו אומרים</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-name">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>מוכנים לחוויה שתשנה הכל?</h2>
          <p>הזמינו עכשיו והצטרפו למאות לקוחות מרוצים</p>
          <div className="cta-buttons">
            <Link to="/contact" className="cta-primary large">
              <span className="cta-icon">📞</span>
              <span>צרו קשר עכשיו</span>
            </Link>
            <a href="tel:0508535941" className="cta-secondary large">
              <span className="cta-icon">☎️</span>
              <span>050-8535941</span>
            </a>
          </div>
          <p className="urgency-text">⏰ מקומות מוגבלים - הזמינו היום!</p>
        </div>
      </section>

      {siteSettings.showSocialLinks && (
        <section className="social-section">
          <h2>עקבו אחרינו ברשתות</h2>
          <p className="section-subtitle">עדכונים, טיפים ומבצעים מיוחדים</p>
          <div className="social-links">
            {socialLinks.map(({ name, icon, url }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="social-btn">
                <span className="social-icon">{icon}</span>
                <span>{name}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {showCTA && (
        <div className="floating-cta">
          <a href="https://wa.me/972508535941" target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
            <span className="whatsapp-icon">💬</span>
            <span className="whatsapp-text">WhatsApp</span>
          </a>
        </div>
      )}
    </div>
  )
}

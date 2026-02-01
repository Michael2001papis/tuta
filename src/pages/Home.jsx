import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext'
import './Home.css'

const socialLinks = [
  { name: 'Instagram', url: 'https://instagram.com/sofia.queen_salon' },
  { name: 'Threads', url: 'https://threads.net/@sofia.queen_salon' },
  { name: 'Facebook – סופיה אלכסייב', url: 'https://www.facebook.com/sofia.queen.salon' },
]

const services = [
  { title: 'טיפולי פנים מתקדמים', desc: 'טכנולוגיות חדשניות לעור מושלם' },
  { title: 'מניקור ופדיקור', desc: 'עיצוב ציפורניים ברמה מקצועית' },
  { title: 'הסרת שיער', desc: 'טיפולים יעילים עם תוצאות לטווח ארוך' },
  { title: 'טיפולי גוף', desc: 'פתרונות מותאמים אישית לכל צורך' },
]

const stats = [
  { number: '500+', label: 'לקוחות מרוצים' },
  { number: '10+', label: 'שנות ניסיון' },
  { number: '15+', label: 'טיפולים מקצועיים' },
]

export default function Home() {
  const { siteSettings } = useSettings()

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>{siteSettings.homeTitle}</h1>
          <p className="subtitle">{siteSettings.homeSubtitle}</p>
          <div className="hero-actions">
            <Link to="/contact" className="btn-primary">הזמינו טיפול</Link>
            <Link to="/schedule" className="btn-secondary">לוח זמנים</Link>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="services-section">
        <div className="section-header">
          <h2>השירותים שלנו</h2>
          <p className="section-intro">מגוון רחב של טיפולים מקצועיים המותאמים לצרכיכם</p>
        </div>
        <div className="services-grid">
          {services.map((service, idx) => (
            <div key={idx} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <Link to="/products" className="service-link">קרא עוד</Link>
            </div>
          ))}
        </div>
      </section>

      {siteSettings.showCertificates && (
        <section className="about-section">
          <div className="about-content">
            <h2>מקצועיות ברמה הגבוהה ביותר</h2>
            <p>Sofia Beauty Clinic מחזיקה בתעודות מקצועיות מובילות בתחום קליניקת היופי ומביאה ניסיון עשיר של למעלה מעשור. כל טיפול מבוצע בדיוק ובקפידה, תוך התאמה אישית לצרכי הלקוח.</p>
            <Link to="/before-after" className="btn-text">צפייה בעבודות שלנו</Link>
          </div>
        </section>
      )}

      <section className="cta-section">
        <div className="cta-wrapper">
          <h2>מעוניינים בייעוץ אישי?</h2>
          <p>צרו קשר לקביעת פגישה או לקבלת מידע נוסף</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn-primary large">יצירת קשר</Link>
            <a href="tel:0535305330" className="btn-secondary large">053-5305330</a>
          </div>
        </div>
      </section>

      {siteSettings.showSocialLinks && (
        <section className="social-section">
          <h2>עקבו אחרינו</h2>
          <div className="social-links">
            {socialLinks.map(({ name, url }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="social-link">
                {name}
              </a>
            ))}
          </div>
        </section>
      )}

      <a href="https://wa.me/972535305330" target="_blank" rel="noopener noreferrer" className="floating-contact">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor"/>
        </svg>
      </a>
    </div>
  )
}

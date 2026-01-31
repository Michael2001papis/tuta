import React from 'react'
import { useSettings } from '../context/SettingsContext'
import './Home.css'

const socialLinks = [
  { name: 'Instagram', icon: '📷', url: 'https://instagram.com' },
  { name: 'Facebook', icon: '📘', url: 'https://facebook.com' },
  { name: 'TikTok', icon: '🎵', url: 'https://tiktok.com' },
]

export default function Home() {
  const { siteSettings } = useSettings()

  return (
    <div className="home">
      <section className="hero">
        <h1>{siteSettings.homeTitle}</h1>
        <p className="subtitle">{siteSettings.homeSubtitle}</p>
      </section>

      {siteSettings.showCertificates && (
        <section className="certificates">
          <h2>תעודות וניסיון</h2>
          <p>לסופיה תעודות מקצועיות רבות וניסיון עשיר בתחום הקוסמטיקה הקלינית. לקוחות מרוצים מכל הארץ.</p>
        </section>
      )}

      <section className="work-preview">
        <h2>עבודות נבחרות</h2>
        <p>סופיה מציעה טיפולים מקצועיים ואיכותיים. צפו בעמוד "עבודות לפני ואחרי" לתוצאות מרשימות.</p>
      </section>

      {siteSettings.showSocialLinks && (
        <section className="social-section">
          <h2>עקבו אחרינו ברשתות</h2>
          <div className="social-links">
            {socialLinks.map(({ name, icon, url }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="social-btn">
                <span className="social-icon">{icon}</span>
                {name}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

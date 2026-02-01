import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Contact.css'

const RATING_LABELS = {
  service: 'שירות',
  advice: 'הדרכה',
  treatment: 'יחס',
  payment: 'תשלום',
  atmosphere: 'אווירה',
}

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_ID || ''
const FORMSPREE_ENDPOINT = FORMSPREE_FORM_ID ? `https://formspree.io/f/${FORMSPREE_FORM_ID}` : ''
const BUSINESS_EMAIL = 'dvnka2@gmail.com'

export default function Contact() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    location: '',
    convenientTimes: '',
    ratings: { service: 5, advice: 5, treatment: 5, payment: 5, atmosphere: 5 },
    review: '',
  })
  const [success, setSuccess] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setSubmitError('')
  }

  const handleRatingChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      ratings: { ...prev.ratings, [key]: parseInt(value, 10) },
    }))
  }

  const buildMailtoBody = () => {
    const r = formData.ratings
    const ratingsText = `דירוג: שירות ${r.service}, הדרכה ${r.advice}, יחס ${r.treatment}, תשלום ${r.payment}, אווירה ${r.atmosphere}`
    return [
      `שם: ${formData.firstName} ${formData.lastName}`,
      `טלפון: ${formData.phone}`,
      formData.email ? `אימייל: ${formData.email}` : null,
      formData.location ? `מיקום: ${formData.location}` : null,
      `זמנים נוחים: ${formData.convenientTimes}`,
      ratingsText,
      formData.review ? `ביקורת: ${formData.review}` : null,
    ].filter(Boolean).join('\n')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    setSending(true)

    if (FORMSPREE_ENDPOINT) {
      try {
        const body = {
          _replyto: formData.email || undefined,
          _subject: `פנייה מהאתר – ${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email || '(לא צוין)',
          location: formData.location || '(לא צוין)',
          convenientTimes: formData.convenientTimes,
          ratings: `שירות: ${formData.ratings.service}, הדרכה: ${formData.ratings.advice}, יחס: ${formData.ratings.treatment}, תשלום: ${formData.ratings.payment}, אווירה: ${formData.ratings.atmosphere}`,
          review: formData.review || '(לא צוין)',
        }
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('שגיאה בשליחה')
        setSuccess(true)
        setCountdown(30)
      } catch (err) {
        setSubmitError('שליחת הטופס נכשלה. נא לנסות שוב או ליצור קשר בטלפון 053-5305330.')
      } finally {
        setSending(false)
      }
    } else {
      const subject = encodeURIComponent(`פנייה מהאתר – ${formData.firstName} ${formData.lastName}`)
      const body = encodeURIComponent(buildMailtoBody())
      window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`
      setSuccess(true)
      setCountdown(30)
      setSending(false)
    }
  }

  useEffect(() => {
    if (!success) return
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer)
          navigate('/')
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [success, navigate])

  return (
    <div className="contact-page">
      <h1>יצירת קשר</h1>
      <p className="contact-intro">
        נשמח לשמוע ממכם! השאירו פרטים ונחזור אליכם בהקדם.
      </p>

      <div className="contact-info-cards">
        <a href="tel:0535305330" className="contact-card phone">
          <span className="icon">📞</span>
          <span>053-5305330</span>
          <small>לחיצה לחיוג</small>
        </a>
        <a href="mailto:dvnka2@gmail.com" className="contact-card email">
          <span className="icon">✉️</span>
          <span>dvnka2@gmail.com</span>
        </a>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>שם פרטי *</label>
            <input name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>שם משפחה *</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>מספר טלפון *</label>
          <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>אימייל (אופציונלי)</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>מיקום (אופציונלי)</label>
          <input name="location" value={formData.location} onChange={handleChange} placeholder="עיר / אזור" />
        </div>

        <div className="form-group">
          <label>זמנים שנוחים לכם *</label>
          <p className="hint">ציינו מתי נוח לכם – Sofia Beauty Clinic תחזור אליכם ותתאם איתכם.</p>
          <textarea name="convenientTimes" value={formData.convenientTimes} onChange={handleChange} rows={3} required />
        </div>

        <div className="ratings-section">
          <h3>דירוג (1-10)</h3>
          {Object.entries(RATING_LABELS).map(([key, label]) => (
            <div key={key} className="rating-row">
              <label>{label}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.ratings[key]}
                onChange={e => handleRatingChange(key, e.target.value)}
              />
              <span>{formData.ratings[key]}</span>
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>ביקורת (אופציונלי)</label>
          <textarea name="review" value={formData.review} onChange={handleChange} rows={4} />
        </div>

        {submitError && <p className="submit-error">{submitError}</p>}
        <button type="submit" className="submit-btn" disabled={sending}>
          {sending ? 'שולח...' : 'שליחה'}
        </button>
      </form>

      {success && (
        <div className="success-overlay">
          <div className="success-modal">
            <span className="success-icon">✓</span>
            <h2>השליחה בוצעה בהצלחה!</h2>
            <p>Sofia Beauty Clinic תחזור אליכם בהקדם.</p>
            <button onClick={() => navigate('/')}>חזרה לעמוד הבית</button>
            <p className="countdown">חזרה אוטומטית תוך {countdown} שניות</p>
          </div>
        </div>
      )}
    </div>
  )
}

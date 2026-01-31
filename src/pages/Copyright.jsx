import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Copyright.css'

const COPYRIGHT_TEXT = `
כל הזכויות באתר זה שמורות ©

זכויות יוצרים – מיכאל פפיסמדוב (מפתח האתר)
כל התכנים, העיצובים, הקודים, הלוגואים, הגרפיקה, הממשקים, והחומרים המוצגים באתר זה – הם קניינה הבלעדי של מיכאל פפיסמדוב. אסור להעתיק, לשכפל, להפיץ, לשנות, או לעשות שימוש כלשהו בחומרים אלה ללא קבלת הסכמה מפורשת ובכתב מראש. כל הפרה של זכויות יוצרים אלה תגרור אחריות משפטית והפעלת כל האמצעים המשפטיים העומדים לרשות בעל הזכויות.

זכויות יוצרים – סופיה (בעלת העסק)
כל הזכויות הקשורות לקוסמטיקה קלינית, לטיפולים, לתמונות לפני ואחרי, למוצרים, ולשירותים המוצעים באתר – שמורות לסופיה. אין לעשות שימוש מסחרי או פרטי בחומרים אלה ללא אישור. העסק כפוף לחוזים כללים, להנחיות מדינה, ולתקנות הרלוונטיות. כל הזכויות שמורות.
`.trim()

export default function Copyright() {
  const navigate = useNavigate()
  const [agreed, setAgreed] = useState(false)
  const [showModal, setShowModal] = useState(true)

  const handleAgree = () => {
    setAgreed(true)
    setShowModal(false)
    navigate('/')
  }

  return (
    <div className="copyright-page">
      <h1>זכויות יוצרים</h1>
      <div className="copyright-content">
        <pre>{COPYRIGHT_TEXT}</pre>
      </div>

      {showModal && (
        <div className="copyright-overlay">
          <div className="copyright-modal">
            <h2>חשוב – קריאה והסכמה</h2>
            <p>אנא קראו בעיון את תנאי זכויות היוצרים עד הסוף.</p>
            <div className="copyright-scroll">
              <pre>{COPYRIGHT_TEXT}</pre>
            </div>
            <label className="agree-checkbox">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
              קראתי והבנתי את זכויות היוצרים
            </label>
            <button onClick={handleAgree} disabled={!agreed}>
              אישור וחזרה לעמוד הבית
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

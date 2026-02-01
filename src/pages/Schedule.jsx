import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useSettings } from '../context/SettingsContext'
import './Schedule.css'

const DAYS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']

function getWeekDates() {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const start = new Date(now)
  start.setDate(now.getDate() - dayOfWeek)
  const dates = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    dates.push(d)
  }
  return dates
}

function loadSchedule() {
  try {
    const s = localStorage.getItem('sophia_schedule')
    const data = s ? JSON.parse(s) : {}
    const now = new Date()
    const weekAgo = new Date(now)
    weekAgo.setDate(now.getDate() - 7)
    const cutoff = weekAgo.toISOString().slice(0, 10)
    const filtered = {}
    for (const [key, val] of Object.entries(data)) {
      if (key >= cutoff) filtered[key] = val
    }
    if (Object.keys(filtered).length < Object.keys(data).length) {
      saveSchedule(filtered)
    }
    return Object.keys(filtered).length ? filtered : data
  } catch {
    return {}
  }
}

function saveSchedule(data) {
  localStorage.setItem('sophia_schedule', JSON.stringify(data))
}

export default function Schedule() {
  const { isLoggedIn } = useAuth()
  const { siteSettings, updateSiteSettings } = useSettings()
  const [schedule, setSchedule] = useState(loadSchedule)
  const [nonWorkingDays, setNonWorkingDays] = useState(() => {
    try {
      const s = localStorage.getItem('sophia_non_working')
      return s ? JSON.parse(s) : []
    } catch {
      return []
    }
  })
  const [weekDates, setWeekDates] = useState(getWeekDates())
  const [editingDay, setEditingDay] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      if (now.getDay() === 6) {
        setWeekDates(getWeekDates())
      }
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const saved = new Date(localStorage.getItem('sophia_schedule_week') || 0).getTime()
    const now = Date.now()
    if (now - saved > 7 * 24 * 60 * 60 * 1000) {
      setWeekDates(getWeekDates())
      localStorage.setItem('sophia_schedule_week', now.toString())
    }
  }, [])

  const handleSave = (key, value) => {
    const next = { ...schedule, [key]: value }
    setSchedule(next)
    saveSchedule(next)
    setEditingDay(null)
  }

  const toggleNonWorking = (dayIndex) => {
    const next = nonWorkingDays.includes(dayIndex)
      ? nonWorkingDays.filter(d => d !== dayIndex)
      : [...nonWorkingDays, dayIndex]
    setNonWorkingDays(next)
    localStorage.setItem('sophia_non_working', JSON.stringify(next))
  }

  const startEdit = () => {
    updateSiteSettings({ scheduleEditing: true })
  }

  const endEdit = () => {
    updateSiteSettings({ scheduleEditing: false })
  }

  const formatDateKey = (d) => d.toISOString().slice(0, 10)

  return (
    <div className="schedule-page">
      <h1>לוח זמנים</h1>

      {!isLoggedIn && siteSettings.scheduleEditing && (
        <div className="editing-notice">Sofia Beauty Clinic מעדכנת כרגע את לוח הזמנים. התצוגה תתעדכן בהקדם.</div>
      )}

      <p className="schedule-desc">
        {isLoggedIn
          ? 'ניתן לערוך את לוח הזמנים. עם הגעת שבת, השבוע הקודם יתאפס.'
          : 'תצוגת לוח הזמנים – עדכונים על ידי Sofia Beauty Clinic.'}
      </p>

      {isLoggedIn && (
        <div className="edit-actions">
          <button onClick={siteSettings.scheduleEditing ? endEdit : startEdit} className="edit-toggle">
            {siteSettings.scheduleEditing ? 'סיום עריכה' : 'מצב עריכה'}
          </button>
        </div>
      )}

      <div className="schedule-grid">
        {weekDates.map((date, i) => {
          const key = formatDateKey(date)
          const value = schedule[key] || ''
          const isNonWorking = nonWorkingDays.includes(i)

          return (
            <div key={key} className={`schedule-day ${isNonWorking ? 'non-working' : ''}`}>
              <div className="day-header">
                <span>{DAYS[i]}</span>
                <span className="date-num">{date.getDate()}/{date.getMonth() + 1}</span>
                {isLoggedIn && (siteSettings.scheduleEditing || editingDay === key) && (
                  <button
                    className="toggle-work"
                    onClick={() => toggleNonWorking(i)}
                    title={isNonWorking ? 'סמן כיום עבודה' : 'סמן כיום חופש'}
                  >
                    {isNonWorking ? '🔄' : '🚫'}
                  </button>
                )}
              </div>
              {isNonWorking ? (
                <p className="non-working-text">לא עובדת</p>
              ) : editingDay === key ? (
                <div className="edit-inline">
                  <input
                    type="text"
                    defaultValue={value}
                    onBlur={e => handleSave(key, e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (handleSave(key, e.target.value), setEditingDay(null))}
                    autoFocus
                  />
                </div>
              ) : (
                <p
                  className="day-content"
                  onClick={() => isLoggedIn && (siteSettings.scheduleEditing || editingDay === null) && setEditingDay(key)}
                >
                  {value || '—'}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

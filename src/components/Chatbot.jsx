import React, { useState, useRef, useEffect } from 'react'
import './Chatbot.css'

const INITIAL_MESSAGES = [
  {
    type: 'bot',
    text: 'שלום וברוכים הבאים! 👋',
    timestamp: new Date(),
  },
  {
    type: 'bot',
    text: 'אני כאן כדי לעזור לכם להתמצא באתר ולענות על כל שאלה. איך אוכל לסייע?',
    timestamp: new Date(),
  }
]

const QUICK_REPLIES = [
  { id: 'services', label: 'מה הטיפולים שאתם מציעים?' },
  { id: 'booking', label: 'איך מזמינים תור?' },
  { id: 'prices', label: 'מה המחירים?' },
  { id: 'hours', label: 'מה שעות הפעילות?' },
  { id: 'location', label: 'איפה אתם נמצאים?' },
  { id: 'contact', label: 'איך יוצרים קשר?' },
]

const RESPONSES = {
  services: 'אנחנו מציעים מגוון רחב של טיפולים מקצועיים:\n\n• טיפולי פנים מתקדמים\n• מניקור ופדיקור\n• הסרת שיער\n• טיפולי גוף\n\nתוכלו למצוא מידע מפורט בעמוד "מוצרים" או בעמוד "עבודות לפני ואחרי".',
  
  booking: 'קביעת תור היא פשוטה מאוד! 😊\n\nאפשר:\n1. ללחוץ על "יצירת קשר" בתפריט\n2. להתקשר ישירות: 050-8535941\n3. לשלוח הודעת WhatsApp\n4. לבדוק זמינות ב"לוח זמנים"\n\nאשמח לעזור בקביעת התור!',
  
  prices: 'המחירים משתנים בהתאם לסוג הטיפול ולמשכו.\n\nכדי לקבל הצעת מחיר מדויקת ומותאמת אישית, מוזמנים:\n• להתקשר: 050-8535941\n• לשלוח הודעה דרך עמוד "יצירת קשר"\n• לשלוח הודעת WhatsApp\n\nנשמח לספק לכם את כל הפרטים! 💎',
  
  hours: 'שעות הפעילות משתנות בהתאם ללוח הזמנים.\n\nמומלץ:\n• לבדוק את "לוח זמנים" בתפריט\n• ליצור קשר לתיאום פגישה\n• להתקשר: 050-8535941\n\nאנחנו כאן כדי להתאים את עצמנו אליכם! 🕐',
  
  location: 'נשמח לראותכם אצלנו!\n\nכדי לקבל את הכתובת המדויקת והנחיות הגעה, אנא:\n• התקשרו: 050-8535941\n• שלחו הודעה בעמוד "יצירת קשר"\n• שלחו הודעת WhatsApp\n\nנשמח לעזור! 📍',
  
  contact: 'ניתן ליצור קשר במספר דרכים:\n\n📞 טלפון: 050-8535941\n✉️ דרך עמוד "יצירת קשר" באתר\n💬 WhatsApp (הכפתור הירוק בצד)\n\nאנחנו זמינים ונשמח לעזור בכל שאלה!',
}

const getBotResponse = (userInput) => {
  const input = userInput.toLowerCase().trim()
  
  // מילות מפתח לזיהוי כוונה
  if (input.includes('טיפול') || input.includes('שירות') || input.includes('מה אתם')) {
    return RESPONSES.services
  }
  
  if (input.includes('תור') || input.includes('הזמנ') || input.includes('קביע')) {
    return RESPONSES.booking
  }
  
  if (input.includes('מחיר') || input.includes('עול') || input.includes('כמה')) {
    return RESPONSES.prices
  }
  
  if (input.includes('שע') || input.includes('פתוח') || input.includes('מתי')) {
    return RESPONSES.hours
  }
  
  if (input.includes('איפה') || input.includes('כתובת') || input.includes('מיקום') || input.includes('נמצא')) {
    return RESPONSES.location
  }
  
  if (input.includes('קשר') || input.includes('טלפון') || input.includes('whatsapp')) {
    return RESPONSES.contact
  }
  
  if (input.includes('תודה') || input.includes('תנקס')) {
    return 'על לא דבר! שמחתי לעזור 😊\n\nיש עוד משהו שתרצו לדעת?'
  }
  
  if (input.includes('שלום') || input.includes('היי') || input.includes('הי ')) {
    return 'שלום! איך אני יכול לעזור לכם היום? 😊'
  }
  
  // תשובת ברירת מחדל
  return 'אני כאן כדי לעזור! 😊\n\nתוכלו לשאול אותי על:\n• הטיפולים שלנו\n• קביעת תור\n• מחירים\n• שעות פעילות\n• דרכי יצירת קשר\n\nאו להשתמש בכפתורים המהירים למטה.'
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSendMessage = (text) => {
    if (!text.trim()) return

    // הוספת הודעת המשתמש
    const userMessage = {
      type: 'user',
      text: text.trim(),
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    
    // סימולציה של "מקליד..."
    setIsTyping(true)
    
    setTimeout(() => {
      const botReply = getBotResponse(text)
      const botMessage = {
        type: 'bot',
        text: botReply,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 800)
  }

  const handleQuickReply = (replyId) => {
    const reply = QUICK_REPLIES.find(r => r.id === replyId)
    if (reply) {
      handleSendMessage(reply.label)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  return (
    <>
      {/* כפתור פתיחה */}
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* חלון הצ'אט */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <span>💎</span>
              </div>
              <div>
                <div className="chatbot-title">עוזר וירטואלי</div>
                <div className="chatbot-status">מחובר</div>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                {msg.type === 'bot' && (
                  <div className="message-avatar">💎</div>
                )}
                <div className="message-bubble">
                  <div className="message-text">{msg.text}</div>
                  <div className="message-time">
                    {msg.timestamp.toLocaleTimeString('he-IL', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">💎</div>
                <div className="message-bubble typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-quick-replies">
            {QUICK_REPLIES.map(reply => (
              <button 
                key={reply.id} 
                className="quick-reply-btn"
                onClick={() => handleQuickReply(reply.id)}
              >
                {reply.label}
              </button>
            ))}
          </div>

          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder="הקלידו הודעה..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="chatbot-send-btn"
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim()}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19 1L9 11M19 1l-6 18-4-8-8-4 18-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

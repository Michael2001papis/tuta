import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const CORRECT_USERNAME = 'SV123456'
const CORRECT_PASSWORD = 'S123456'

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('sophia_logged_in') === 'true'
  })

  const login = (username, password) => {
    if (username.toUpperCase() === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
      setIsLoggedIn(true)
      localStorage.setItem('sophia_logged_in', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('sophia_logged_in')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

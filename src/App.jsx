import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Contact from './pages/Contact'
import Schedule from './pages/Schedule'
import User from './pages/User'
import Copyright from './pages/Copyright'
import Products from './pages/Products'
import BeforeAfter from './pages/BeforeAfter'
import './App.css'
import './pages/GlobalStyles.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/user" element={<User />} />
            <Route path="/copyright" element={<Copyright />} />
            <Route path="/products" element={<Products />} />
            <Route path="/before-after" element={<BeforeAfter />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </BrowserRouter>
  )
}

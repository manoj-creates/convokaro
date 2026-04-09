import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import PracticePage from './pages/PracticePage'
import ChatSession from './pages/ChatSession'
import ProgressPage from './pages/ProgressPage'
import ProfilePage from './pages/ProfilePage'
import GoalsPage from './pages/GoalsPage'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chat" element={<ChatSession />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

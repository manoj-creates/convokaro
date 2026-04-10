import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import PracticePage from './pages/PracticePage';
import ChatSession from './pages/ChatSession';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';
import GoalsPage from './pages/GoalsPage';
import { AuthProvider } from './context/AuthContext';

// 1. Import your navigation components
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes (No Sidebar/MobileNav needed) */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* App Routes (With Sidebar and MobileNav) */}
          <Route
            path="*"
            element={
              <div className="flex min-h-screen bg-[#0b0e14]">
                {/* Sidebar handles hiding itself on mobile via 'hidden md:flex' */}
                <Sidebar />

                <main className="flex-1 w-full pb-20 md:pb-0">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/practice" element={<PracticePage />} />
                    <Route path="/goals" element={<GoalsPage />} />
                    <Route path="/progress" element={<ProgressPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/chat" element={<ChatSession />} />
                  </Routes>
                </main>

                {/* MobileNav handles hiding itself on desktop via 'md:hidden' */}
                <MobileNav />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
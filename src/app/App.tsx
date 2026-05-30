import { useState } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import LecturerPage from './pages/LecturerPage';
import StudentPage from './pages/StudentPage';
import FaceRegistration from './pages/FaceRegistration';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');

  const screens = {
    home: HomePage,
    login: LoginPage,
    admin: AdminDashboard,
    lecturer: LecturerPage,
    student: StudentPage,
    facereg: FaceRegistration
  };

  const ActiveComponent = screens[activeScreen as keyof typeof screens];

  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-[1000] h-16 flex items-center px-6 gap-3 border-b"
        style={{ 
          background: 'var(--bg-surface)', 
          borderColor: 'var(--border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
        <div className="flex items-center gap-2.5 mr-5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
            style={{ background: 'var(--primary)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)' }}>CogniFace</div>
        </div>
        
        <div className="flex gap-1 p-1 rounded-lg overflow-x-auto"
          style={{ background: 'var(--bg-raised)' }}>
          {[
            { id: 'home', label: 'Homepage', icon: '🏠' },
            { id: 'login', label: 'Login', icon: '🔐' },
            { id: 'admin', label: 'Admin', icon: '⚙️' },
            { id: 'lecturer', label: 'Lecturer', icon: '👨‍🏫' },
            { id: 'student', label: 'Student', icon: '🎓' },
            { id: 'facereg', label: 'Face Reg', icon: '📷' }
          ].map((screen) => (
            <button
              key={screen.id}
              onClick={() => setActiveScreen(screen.id)}
              className="px-4 py-2 rounded-md text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2"
              style={{
                background: activeScreen === screen.id ? 'var(--primary)' : 'transparent',
                color: activeScreen === screen.id ? 'white' : 'var(--text-tertiary)',
                fontWeight: activeScreen === screen.id ? 600 : 500,
                boxShadow: activeScreen === screen.id ? 'var(--shadow-sm)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (activeScreen !== screen.id) {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.background = 'var(--bg-surface)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeScreen !== screen.id) {
                  e.currentTarget.style.color = 'var(--text-tertiary)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}>
              <span>{screen.icon}</span>
              <span>{screen.label}</span>
            </button>
          ))}
        </div>
        
        <div className="ml-auto px-3 py-1.5 rounded-full border text-xs whitespace-nowrap"
          style={{ 
            background: 'var(--bg-raised)', 
            color: 'var(--text-tertiary)', 
            borderColor: 'var(--border)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px'
          }}>
          UI Prototype · NIT 3003
        </div>
      </div>

      {/* Screen Content */}
      <div className="pt-16" style={{ animation: 'fadeUp 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}>
        <ActiveComponent />
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

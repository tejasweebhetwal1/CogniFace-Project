import { useState } from 'react';

export default function LecturerPage() {
  const [sessionActive, setSessionActive] = useState(false);

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 64px)' }}>
      {/* Sidebar */}
      <nav className="w-64 border-r flex flex-col" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        <div className="flex-1 p-4">
          <div className="text-xs mb-2.5 px-2.5 tracking-widest uppercase" style={{ color: 'var(--text-tertiary)', fontWeight: 700, letterSpacing: '0.08em' }}>
            Overview
          </div>
          <div className="px-3 py-2.5 rounded-lg mb-1 flex items-center gap-2.5 cursor-pointer"
            style={{ background: 'var(--primary-glow)', color: 'var(--primary)', fontWeight: 500 }}>
            <span>📊</span>
            <span className="text-sm">Dashboard</span>
          </div>

          <div className="text-xs mt-5 mb-2.5 px-2.5 tracking-widest uppercase" style={{ color: 'var(--text-tertiary)', fontWeight: 700, letterSpacing: '0.08em' }}>
            Classes
          </div>
          {[
            { icon: '🏫', label: 'My Classes' },
            { icon: '📅', label: 'Schedule' }
          ].map((item, i) => (
            <div key={i} className="px-3 py-2.5 rounded-lg mb-1 flex items-center gap-2.5 cursor-pointer transition-all hover:bg-[var(--bg-raised)]"
              style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
              <span>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}

          <div className="text-xs mt-5 mb-2.5 px-2.5 tracking-widest uppercase" style={{ color: 'var(--text-tertiary)', fontWeight: 700, letterSpacing: '0.08em' }}>
            Attendance
          </div>
          {[
            { icon: '📷', label: 'Start Session' },
            { icon: '📋', label: 'History' },
            { icon: '📊', label: 'Reports' }
          ].map((item, i) => (
            <div key={i} className="px-3 py-2.5 rounded-lg mb-1 flex items-center gap-2.5 cursor-pointer transition-all hover:bg-[var(--bg-raised)]"
              style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
              <span>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Lecturer User */}
        <div className="p-4 border-t flex items-center gap-3" style={{ borderColor: 'var(--border)' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border text-sm"
            style={{ background: 'var(--secondary-glow)', color: 'var(--secondary)', borderColor: 'var(--border-mid)', fontWeight: 700 }}>LM</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm truncate" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              Lucas Marthur
            </div>
            <div className="text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>
              L042 · Lecturer
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto" style={{ background: 'var(--bg-base)' }}>
        <div className="p-7">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="mb-1" style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Lecturer Dashboard
                </h1>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Manage your classes and attendance sessions
                </p>
              </div>
              <button 
                onClick={() => setSessionActive(!sessionActive)}
                className="px-5 py-2.5 rounded-xl transition-all hover:shadow-md"
                style={{ 
                  background: sessionActive ? 'var(--danger)' : 'var(--primary)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '13px'
                }}>
                {sessionActive ? '⏹ End Session' : '▶ Start Attendance Session'}
              </button>
            </div>
          </div>

          {/* Active Session Banner */}
          {sessionActive && (
            <div className="mb-5.5 p-5 rounded-2xl border-l-4"
              style={{ 
                background: 'rgba(5,150,105,0.05)', 
                borderColor: 'var(--success)',
                border: '1px solid rgba(5,150,105,0.15)',
                borderLeft: '4px solid var(--success)'
              }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: 'var(--success)' }} />
                  <div>
                    <div className="text-sm mb-0.5" style={{ color: 'var(--success)', fontWeight: 700, fontSize: '13px' }}>
                      Live Attendance Session Active
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                      CS-101 Introduction to Computer Science · Section 123A · Room 13.2
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: 'var(--success)' }}>
                    28/31
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>
                    Students Present
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4.5 mb-5.5">
            {[
              { label: 'My Classes', value: '6', icon: '🏫', color: 'primary' },
              { label: 'Total Students', value: '184', icon: '🎓', color: 'secondary' },
              { label: 'Sessions Today', value: '3', icon: '📅', color: 'accent' },
              { label: 'Avg. Attendance', value: '92%', icon: '✓', color: 'success' }
            ].map((stat, i) => (
              <div key={i} className="p-5 rounded-2xl border transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="mb-1" style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-2 gap-4.5">
            {/* My Classes */}
            <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
              <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  My Classes
                </h3>
                <button className="text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-[var(--bg-raised)]"
                  style={{ color: 'var(--primary)' }}>
                  View All
                </button>
              </div>
              <div className="p-5 flex flex-col gap-3.5">
                {[
                  { code: 'CS-101', name: 'Intro to Computer Science', section: '123A', students: 31, time: 'Mon Wed Fri · 09:00', color: 'primary' },
                  { code: 'CS-203', name: 'Data Structures', section: '456B', students: 28, time: 'Tue Thu · 14:00', color: 'secondary' },
                  { code: 'CS-305', name: 'Algorithms', section: '789C', students: 25, time: 'Mon Wed · 11:00', color: 'accent' }
                ].map((cls, i) => (
                  <div key={i} className="p-4 rounded-xl border transition-all hover:border-[var(--border-mid)] cursor-pointer"
                    style={{ 
                      background: 'var(--bg-raised)',
                      borderColor: 'var(--border)',
                      borderLeft: `3px solid var(--${cls.color})`
                    }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-xs mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: `var(--${cls.color})`, fontWeight: 700, fontSize: '11px' }}>
                          {cls.code} · Section {cls.section}
                        </div>
                        <div className="mb-0.5" style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '14px' }}>
                          {cls.name}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>
                          {cls.time}
                        </div>
                      </div>
                      <div className="text-right">
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {cls.students}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--text-tertiary)', fontSize: '10px' }}>
                          Students
                        </div>
                      </div>
                    </div>
                    <button className="w-full py-2 rounded-lg text-xs transition-all"
                      style={{ background: `var(--${cls.color})`, color: '#fff', fontWeight: 700 }}>
                      Start Attendance →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
              <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Recent Sessions
                </h3>
                <button className="text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-[var(--bg-raised)]"
                  style={{ color: 'var(--primary)' }}>
                  View All
                </button>
              </div>
              <div className="p-5">
                {[
                  { class: 'CS-101 · 123A', date: 'Today 09:14', present: 28, total: 31, rate: 90, status: 'success' },
                  { class: 'CS-203 · 456B', date: 'Yesterday 14:05', present: 25, total: 28, rate: 89, status: 'success' },
                  { class: 'CS-305 · 789C', date: '28 Feb 11:00', present: 18, total: 25, rate: 72, status: 'warn' },
                  { class: 'CS-101 · 123A', date: '27 Feb 09:12', present: 30, total: 31, rate: 97, status: 'success' }
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between py-3.5 border-b last:border-b-0"
                    style={{ borderColor: 'rgba(0,0,0,0.03)' }}>
                    <div className="flex-1">
                      <div className="text-sm mb-0.5" style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '13px' }}>
                        {session.class}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                        {session.date}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm mb-0.5" style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '13px' }}>
                        {session.present}/{session.total}
                      </div>
                      <div className="inline-flex px-2 py-0.5 rounded text-xs"
                        style={{
                          background: session.status === 'success' ? 'var(--success-bg)' : 'var(--warn-bg)',
                          color: session.status === 'success' ? 'var(--success)' : 'var(--warn)',
                          fontWeight: 700,
                          fontSize: '11px'
                        }}>
                        {session.rate}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="mt-4.5 rounded-2xl border overflow-hidden" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
            <div className="p-5 border-b" style={{ borderColor: 'var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Today's Schedule
              </h3>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-3.5">
                {[
                  { time: '09:00 - 12:00', class: 'CS-101 · Intro to Computer Science', room: 'Room 13.2', status: 'completed' },
                  { time: '14:00 - 17:00', class: 'CS-203 · Data Structures', room: 'Lab 4A', status: 'upcoming' },
                  { time: '17:30 - 19:00', class: 'CS-305 · Algorithms', room: 'Online', status: 'upcoming' }
                ].map((schedule, i) => (
                  <div key={i} className="p-4.5 rounded-xl border"
                    style={{ 
                      background: schedule.status === 'completed' ? 'var(--bg-raised)' : 'var(--primary-glow)',
                      borderColor: schedule.status === 'completed' ? 'var(--border)' : 'var(--primary)',
                      opacity: schedule.status === 'completed' ? 0.6 : 1
                    }}>
                    <div className="text-xs mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', fontWeight: 700, fontSize: '11px' }}>
                      {schedule.time}
                    </div>
                    <div className="mb-0.5" style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '14px' }}>
                      {schedule.class}
                    </div>
                    <div className="text-xs mb-2.5" style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>
                      📍 {schedule.room}
                    </div>
                    <div className="text-xs"
                      style={{ color: schedule.status === 'completed' ? 'var(--success)' : 'var(--primary)', fontWeight: 700, fontSize: '11px' }}>
                      {schedule.status === 'completed' ? '✓ Completed' : '⏰ Upcoming'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

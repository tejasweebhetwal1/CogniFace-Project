export default function StudentPage() {
  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 64px)' }}>
      {/* Sidebar */}
      <nav className="w-64 border-r flex flex-col" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        <div className="flex-1 p-5">
          <div className="text-xs mb-3 px-2 tracking-widest uppercase font-semibold" style={{ color: 'var(--text-quaternary)', letterSpacing: '0.08em' }}>
            Overview
          </div>
          <div className="px-3 py-2.5 rounded-lg mb-1 flex items-center gap-2.5 cursor-pointer"
            style={{ background: 'var(--primary-lighter)', color: 'var(--primary)', fontWeight: 600 }}>
            <span>📊</span>
            <span className="text-sm">Dashboard</span>
          </div>

          <div className="text-xs mt-6 mb-3 px-2 tracking-widest uppercase font-semibold" style={{ color: 'var(--text-quaternary)', letterSpacing: '0.08em' }}>
            Courses
          </div>
          {[
            { icon: '📚', label: 'My Courses' },
            { icon: '🔍', label: 'Browse & Enroll' }
          ].map((item, i) => (
            <div key={i} className="px-3 py-2.5 rounded-lg mb-1 flex items-center gap-2.5 cursor-pointer transition-all hover:bg-[var(--bg-raised)]"
              style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
              <span>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}

          <div className="text-xs mt-6 mb-3 px-2 tracking-widest uppercase font-semibold" style={{ color: 'var(--text-quaternary)', letterSpacing: '0.08em' }}>
            Attendance
          </div>
          {[
            { icon: '📋', label: 'My Attendance' },
            { icon: '📅', label: 'History' }
          ].map((item, i) => (
            <div key={i} className="px-3 py-2.5 rounded-lg mb-1 flex items-center gap-2.5 cursor-pointer transition-all hover:bg-[var(--bg-raised)]"
              style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
              <span>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}

          <div className="text-xs mt-6 mb-3 px-2 tracking-widest uppercase font-semibold" style={{ color: 'var(--text-quaternary)', letterSpacing: '0.08em' }}>
            Account
          </div>
          {[
            { icon: '📷', label: 'Face Registration' },
            { icon: '👤', label: 'Profile' }
          ].map((item, i) => (
            <div key={i} className="px-3 py-2.5 rounded-lg mb-1 flex items-center gap-2.5 cursor-pointer transition-all hover:bg-[var(--bg-raised)]"
              style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
              <span>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>

        {/* User section */}
        <div className="p-5 border-t flex items-center gap-3" style={{ borderColor: 'var(--border)' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white"
            style={{ background: 'var(--accent)', fontWeight: 700 }}>
            AP
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm truncate font-semibold" style={{ color: 'var(--text-primary)' }}>
              Florie Warner
            </div>
            <div className="text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>
              S001 · NBIT
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto" style={{ background: 'var(--bg-base)' }}>
        <div className="p-8">
          {/* Hero Welcome */}
          <div className="p-8 rounded-2xl border mb-6 relative overflow-hidden"
            style={{ 
              background: '#F5F5F4', 
              borderColor: 'var(--border)'
            }}>
            
            <div className="flex items-start justify-between relative z-10">
              <div>
                <div className="text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>
                  Good morning 👋
                </div>
                <h1 className="mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)' }}>Florie Warner</h1>
                <div className="flex gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>S001</span>
                  <span style={{ color: 'var(--text-quaternary)' }}>·</span>
                  <span>Bachelor of IT</span>
                  <span style={{ color: 'var(--text-quaternary)' }}>·</span>
                  <span>Enrolled 2026</span>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="text-center px-4">
                  <div className="mb-1" style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--success)' }}>
                    84%
                  </div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-tertiary)', fontWeight: 600 }}>
                    Overall
                  </div>
                </div>
                <div className="w-px" style={{ background: 'var(--border)' }} />
                <div className="text-center px-4">
                  <div className="mb-1" style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    4
                  </div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-tertiary)', fontWeight: 600 }}>
                    This Week
                  </div>
                </div>
                <div className="w-px" style={{ background: 'var(--border)' }} />
                <div className="text-center px-4">
                  <div className="mb-1" style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--accent)' }}>
                    3
                  </div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-tertiary)', fontWeight: 600 }}>
                    Courses
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Face Reg Alert */}
          <div className="flex items-center gap-4 p-5 rounded-xl border mb-6"
            style={{ 
              background: 'var(--warn-bg)', 
              borderColor: 'var(--warn-border)'
            }}>
            <div className="text-2xl flex-shrink-0">⚠️</div>
            <div className="flex-1">
              <div className="font-semibold mb-1" style={{ color: 'var(--warn)' }}>
                Action Required: Complete Face Registration
              </div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Your face must be registered before automated attendance can mark you present.
              </div>
            </div>
            <button className="px-5 py-2.5 rounded-lg text-sm flex-shrink-0 transition-all font-semibold hover:opacity-90"
              style={{ background: 'var(--warn)', color: '#fff' }}>
              Register Now →
            </button>
          </div>

          {/* Main Cards Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Attendance Overview */}
            <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
              <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Attendance Overview
                </h3>
                <button className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                  Full History →
                </button>
              </div>
              <div className="p-6">
                <div className="flex gap-6 items-center mb-6">
                  {/* Donut Chart */}
                  <div className="relative w-28 h-28 flex-shrink-0">
                    <svg className="absolute inset-0" width="112" height="112" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--bg-raised)" strokeWidth="10" />
                      <circle 
                        cx="50" cy="50" r="40" 
                        fill="none" 
                        stroke="var(--primary)"
                        strokeWidth="10" 
                        strokeLinecap="round"
                        strokeDasharray="251.2"
                        strokeDashoffset="40"
                        style={{ 
                          animation: 'drawCircle 1.2s ease 0.3s both'
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
                        84%
                      </div>
                      <div className="text-xs uppercase tracking-wider mt-1" style={{ color: 'var(--text-tertiary)' }}>
                        overall
                      </div>
                    </div>
                  </div>

                  {/* Course Progress Bars */}
                  <div className="flex-1">
                    {[
                      { name: 'Intro to CS', pct: 91, color: 'primary' },
                      { name: 'Data Structures', pct: 74, color: 'warn' },
                      { name: 'Cloud Computing', pct: 88, color: 'success' }
                    ].map((course, i) => (
                      <div key={i} className="mb-3 last:mb-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                            {course.name}
                          </span>
                          <span className="text-sm font-bold" style={{ 
                            fontFamily: 'var(--font-mono)', 
                            color: `var(--${course.color})`
                          }}>
                            {course.pct}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-raised)' }}>
                          <div className="h-full rounded-full transition-all duration-1000" 
                            style={{ 
                              width: `${course.pct}%`, 
                              background: `var(--${course.color})`,
                              animation: `fillBar 1s ease-out ${0.4 + i * 0.15}s both`
                            }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Records */}
                <div className="pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-xs mb-3 uppercase tracking-wider font-semibold" style={{ color: 'var(--text-tertiary)' }}>
                    Recent Records
                  </div>
                  <div className="flex flex-col gap-0">
                    {[
                      { course: 'Intro to CS', time: 'Today 09:14', status: 'Present', statusType: 'success' },
                      { course: 'Data Structures', time: '28 Feb 14:02', status: 'Late', statusType: 'warn' },
                      { course: 'Cloud Computing', time: '27 Feb 10:00', status: 'Present', statusType: 'success' }
                    ].map((record, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b last:border-b-0"
                        style={{ borderColor: 'var(--border-light)' }}>
                        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          {record.course}
                        </div>
                        <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
                          {record.time}
                        </div>
                        <span className="px-2.5 py-1 rounded text-xs font-semibold"
                          style={{ 
                            background: record.statusType === 'success' ? 'var(--success-bg)' : 'var(--warn-bg)',
                            color: record.statusType === 'success' ? 'var(--success)' : 'var(--warn)'
                          }}>
                          {record.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
              <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  My Enrolled Courses
                </h3>
                <button className="px-4 py-2 rounded-lg text-sm transition-all font-semibold"
                  style={{ background: 'var(--primary)', color: '#fff' }}>
                  + Enroll
                </button>
              </div>
              <div className="p-6 flex flex-col gap-4">
                {[
                  { code: 'CS-101 · Section 123A', name: 'Introduction to Computer Science', meta: 'Mon Wed Fri · 09:00–12:00 · Room 13.2', pct: 91, color: 'primary' },
                  { code: 'CS-203 · Section 456B', name: 'Data Structures & Algorithms', meta: 'Tue Thu · 14:00–17:00 · Lab 4A', pct: 74, color: 'warn', warning: true },
                  { code: 'CLDX-401 · Section 789C', name: 'Cloud Computing & Architecture', meta: 'Fri · 10:00–13:00 · Online', pct: 88, color: 'secondary' }
                ].map((course, i) => (
                  <div key={i} className="p-5 rounded-xl border transition-all hover:border-[var(--border-strong)]"
                    style={{ 
                      background: 'var(--bg-raised)', 
                      borderColor: 'var(--border)',
                      borderLeft: `4px solid var(--${course.color})`
                    }}>
                    <div className="text-xs mb-1 font-semibold" style={{ 
                      fontFamily: 'var(--font-mono)', 
                      color: `var(--${course.color})`
                    }}>
                      {course.code}
                    </div>
                    <div className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                      {course.name}
                    </div>
                    <div className="text-xs mb-3" style={{ color: 'var(--text-tertiary)' }}>
                      {course.meta}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--border-light)' }}>
                        <div className="h-full rounded-full" 
                          style={{ 
                            width: `${course.pct}%`, 
                            background: `var(--${course.color})`
                          }} />
                      </div>
                      <span className="text-xs flex-shrink-0 font-bold" style={{ 
                        fontFamily: 'var(--font-mono)', 
                        color: `var(--${course.color})`
                      }}>
                        {course.pct}% {course.warning && '⚠'}
                      </span>
                      <button className="px-3 py-1.5 rounded-lg text-xs transition-all border flex-shrink-0 font-semibold"
                        style={{ 
                          background: course.warning ? 'var(--danger)' : 'var(--bg-surface)', 
                          color: course.warning ? '#fff' : 'var(--text-secondary)', 
                          borderColor: course.warning ? 'var(--danger)' : 'var(--border)'
                        }}>
                        {course.warning ? 'Drop' : 'View'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fillBar {
          from { width: 0%; }
        }
        @keyframes drawCircle {
          from { stroke-dashoffset: 251.2; }
        }
      `}</style>
    </div>
  );
}

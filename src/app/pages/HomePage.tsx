export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Home Nav */}
      <div className="fixed top-16 left-0 right-0 z-[100] h-16 flex items-center justify-between px-15 border-b"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px' }}>
          <div className="w-2 h-2 rounded-full" style={{ background: 'var(--primary)' }} />
          CogniFace
        </div>
        <div className="flex gap-7">
          <button className="text-sm transition-colors hover:text-[var(--text-primary)]" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Features</button>
          <button className="text-sm transition-colors hover:text-[var(--text-primary)]" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>How it works</button>
          <button className="text-sm transition-colors hover:text-[var(--text-primary)]" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Security</button>
          <button className="text-sm transition-colors hover:text-[var(--text-primary)]" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Pricing</button>
        </div>
        <div className="flex gap-2.5">
          <button className="px-4 py-2 rounded-lg text-sm transition-all border hover:border-[var(--border-mid)]"
            style={{ background: 'transparent', color: 'var(--text-primary)', borderColor: 'var(--border)', fontWeight: 600 }}>
            Sign In
          </button>
          <button className="px-4 py-2 rounded-lg text-sm transition-all hover:shadow-md"
            style={{ background: 'var(--primary)', color: '#fff', fontWeight: 600 }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--primary)'}>
            Request Demo
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="min-h-screen flex items-center px-15 pt-30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(30,58,138,0.02) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(30,58,138,0.02) 1px, transparent 1px)`,
              backgroundSize: '52px 52px'
            }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 border"
            style={{ background: 'var(--primary-lighter)', borderColor: 'var(--border-light)' }}>
            <div className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--primary)' }} />
            <span className="text-xs tracking-wider uppercase" style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.07em' }}>
              Powered by AI &amp; Cloud
            </span>
          </div>

          <h1 className="mb-5" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 5vw, 64px)', fontWeight: 700, lineHeight: 1.1, color: 'var(--text-primary)' }}>Attendance,<br /><span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>made effortless</span><br />for every campus.</h1>

          <p className="text-lg mb-9 max-w-lg" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>Replace manual roll calls with real-time facial recognition — built exclusively for academic institutions that demand accuracy, privacy, and scale.</p>

          <div className="flex gap-3 flex-wrap">
            <button className="px-9 py-3.5 rounded-xl text-base transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              style={{ background: 'var(--primary)', color: '#fff', fontWeight: 600, height: '54px' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--primary)'}>
              Get Started →
            </button>
            <button className="px-7 py-3.5 rounded-xl text-base transition-all border hover:border-[var(--border-mid)] hover:bg-[var(--bg-surface)]"
              style={{ background: 'var(--bg-raised)', color: 'var(--text-primary)', borderColor: 'var(--border)', fontWeight: 600, height: '54px' }}>
              See Face Recognition
            </button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="absolute right-15 top-1/2 -translate-y-1/2 w-[480px]" 
          style={{ animation: 'float 5s ease infinite' }}>
          <div className="p-7 rounded-3xl border"
            style={{ 
              background: 'var(--bg-surface)', 
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow-lg)',
              borderRadius: 'var(--radius-2xl)'
            }}>
            <div className="mb-2.5 text-xs flex items-center gap-2" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs"
                style={{ background: 'var(--success-bg)', color: 'var(--success)', fontWeight: 600, fontSize: '10px' }}>
                <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: 'var(--success)' }} />
                LIVE SESSION
              </span>
              NIT3003 · Room 13.2
            </div>
            
            {/* Face Detection Demo */}
            <div className="relative rounded-2xl h-50 mb-5 border overflow-hidden"
              style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}>
              {/* Grid */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(rgba(30,58,138,0.15) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(30,58,138,0.15) 1px, transparent 1px)`,
                  backgroundSize: '36px 36px'
                }} />
              
              {/* Scan Line */}
              <div className="absolute left-0 right-0 h-px"
                style={{
                  background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
                  animation: 'scan 2.8s linear infinite'
                }} />

              {/* Face Boxes */}
              <div className="absolute w-23 h-28 rounded-lg border-2"
                style={{ 
                  top: '20px', 
                  left: '24%', 
                  borderColor: 'var(--success)', 
                  boxShadow: '0 0 16px rgba(5,150,105,0.2)' 
                }}>
                <div className="absolute w-3 h-3 border-2 border-l border-t -top-0.5 -left-0.5" style={{ borderColor: 'var(--primary)' }} />
                <div className="absolute w-3 h-3 border-2 border-r border-t -top-0.5 -right-0.5" style={{ borderColor: 'var(--primary)' }} />
                <div className="absolute w-3 h-3 border-2 border-l border-b -bottom-0.5 -left-0.5" style={{ borderColor: 'var(--primary)' }} />
                <div className="absolute w-3 h-3 border-2 border-r border-b -bottom-0.5 -right-0.5" style={{ borderColor: 'var(--primary)' }} />
                <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs whitespace-nowrap tracking-wide"
                  style={{ background: 'var(--success)', color: '#fff', fontWeight: 700 }}>
                  AAVASH P.
                </div>
              </div>

              <div className="absolute rounded-lg border-2"
                style={{ 
                  top: '25px', 
                  left: '55%', 
                  width: '75px',
                  height: '95px',
                  borderColor: 'var(--success)', 
                  boxShadow: '0 0 16px rgba(5,150,105,0.2)' 
                }}>
                <div className="absolute w-3 h-3 border-2 border-l border-t -top-0.5 -left-0.5" style={{ borderColor: 'var(--primary)' }} />
                <div className="absolute w-3 h-3 border-2 border-r border-t -top-0.5 -right-0.5" style={{ borderColor: 'var(--primary)' }} />
                <div className="absolute w-3 h-3 border-2 border-l border-b -bottom-0.5 -left-0.5" style={{ borderColor: 'var(--primary)' }} />
                <div className="absolute w-3 h-3 border-2 border-r border-b -bottom-0.5 -right-0.5" style={{ borderColor: 'var(--primary)' }} />
                <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs whitespace-nowrap tracking-wide"
                  style={{ background: 'var(--success)', color: '#fff', fontWeight: 700 }}>
                  JANE D.
                </div>
              </div>

              <div className="absolute bottom-2 right-2.5 text-xs" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)' }}>
                ~1.2s · 98.7% conf.
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { value: '24', label: 'Present', color: 'var(--success)' },
                { value: '3', label: 'Absent', color: 'var(--danger)' },
                { value: '2', label: 'Late', color: 'var(--warn)' }
              ].map((stat, i) => (
                <div key={i} className="p-3 rounded-xl border text-center"
                  style={{ background: 'var(--bg-raised)', borderColor: 'var(--border-light)', borderRadius: 'var(--radius-md)' }}>
                  <div className="text-xl mb-0.5" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="border-y py-15 grid grid-cols-4 gap-10 text-center px-15"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        {[
          { num: '99.2', unit: '%', label: 'Recognition Accuracy' },
          { num: '< 2', unit: 's', label: 'Authentication Speed' },
          { num: '30', unit: 'K', label: 'User Capacity' },
          { num: '99.6', unit: '%', label: 'Annual Uptime SLA' }
        ].map((stat, i) => (
          <div key={i}>
            <div className="mb-1" style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {stat.num}<span style={{ color: 'var(--primary)' }}>{stat.unit}</span>
            </div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="px-15 py-25">
        <div className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.1em' }}>
          Core Features
        </div>
        <h2 className="mb-3.5" style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          Everything your campus needs
        </h2>
        <p className="text-base mb-12 max-w-lg" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Built from the ground up for educational institutions — not adapted from HR tools.
        </p>
        
        <div className="grid grid-cols-3 gap-4.5">
          {[
            { icon: '🤖', title: 'AI Face Recognition', desc: 'Real-time recognition across an entire classroom. Processes multiple faces simultaneously in under 5 seconds per frame.', bg: 'var(--primary-glow)' },
            { icon: '☁️', title: 'Cloud-Native Architecture', desc: 'Auto-scales from 500 to 30,000 users. Deploy on AWS, Azure, or Google Cloud with zero architectural changes.', bg: 'var(--secondary-glow)' },
            { icon: '🎓', title: 'Built for Academia', desc: 'Major → Course → Class hierarchy. Prerequisite tracking, schedule conflict detection, and semester management built in.', bg: 'var(--accent-glow)' },
            { icon: '📊', title: 'Real-time Analytics', desc: 'Live dashboards for admins, lecturers, and students. Export attendance reports as PDF or Excel instantly.', bg: 'var(--primary-glow)' },
            { icon: '🔒', title: 'End-to-End Security', desc: 'Facial embeddings encrypted before storage. bcrypt passwords, JWT tokens, role-based access control on every endpoint.', bg: 'var(--success-bg)' },
            { icon: '♿', title: 'Fully Accessible', desc: 'WCAG 2.1 AA compliant. Manual attendance override always available if facial recognition fails or camera is unavailable.', bg: 'var(--danger-bg)' }
          ].map((feature, i) => (
            <div key={i} className="p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1 cursor-default hover:shadow-md"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', borderRadius: 'var(--radius-lg)' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-mid)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: feature.bg }}>
                {feature.icon}
              </div>
              <h3 className="mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Roles */}
      <div className="px-15 py-25" style={{ background: 'var(--bg-surface)' }}>
        <div className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.1em' }}>
          User Roles
        </div>
        <h2 className="mb-3.5" style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          Designed for every role
        </h2>
        <p className="text-base mb-12 max-w-lg" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Three distinct dashboards — each optimised for its user's workflow.
        </p>

        <div className="grid grid-cols-3 gap-5">
          {[
            { icon: '🛡️', title: 'Administrator', desc: 'Full institutional oversight. Manage users, courses, classes, and view system-wide attendance analytics.', features: ['Register students & lecturers (bulk CSV)', 'Manage majors, courses & class schedules', 'Institute-wide attendance reports', 'System security & backup management'] },
            { icon: '👨‍🏫', title: 'Lecturer', desc: 'Zero-friction attendance. Start a session, let the camera do the work, review and export records.', features: ['One-tap attendance session start', 'Live camera face recognition feed', 'Manual override for any student', 'Session history & export (PDF/Excel)'] },
            { icon: '🎓', title: 'Student', desc: 'Check your attendance instantly. Enroll in courses, register your face, and stay on top of your records.', features: ['Real-time attendance dashboard', 'Per-course attendance breakdown', 'Guided face registration flow', 'Course enrollment & drop management'] }
          ].map((role, i) => (
            <div key={i} className="p-9 rounded-3xl border transition-all duration-300 hover:-translate-y-1 cursor-pointer hover:shadow-md"
              style={{ background: 'var(--bg-raised)', borderColor: 'var(--border)', borderRadius: 'var(--radius-xl)' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-mid)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
              <div className="text-5xl mb-4">{role.icon}</div>
              <h3 className="mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {role.title}
              </h3>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {role.desc}
              </p>
              <div className="flex flex-col gap-2">
                {role.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '11px' }}>✓</span>
                    {feat}
                  </div>
                ))}
              </div>
              <button className="mt-4.5 px-4 py-2 rounded-lg text-sm transition-all hover:bg-[var(--primary-lighter)]"
                style={{ background: 'transparent', color: 'var(--primary)', fontWeight: 600 }}>
                View {role.title} Dashboard →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-15 py-25 text-center relative overflow-hidden">
        <h2 className="mb-4 relative" style={{ fontFamily: 'var(--font-display)', fontSize: '44px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          Ready to modernise<br />your campus?
        </h2>
        <p className="text-base mb-9 relative" style={{ color: 'var(--text-secondary)' }}>
          Deploy in weeks. Scale to your entire institution. No proxy attendance, ever.
        </p>
        <div className="flex gap-3 justify-center relative">
          <button className="px-9 py-3.5 rounded-xl text-base transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            style={{ background: 'var(--primary)', color: '#fff', fontWeight: 600, height: '54px' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--primary)'}>
            Start for Free
          </button>
          <button className="px-7 py-3.5 rounded-xl text-base transition-all border hover:border-[var(--border-mid)] hover:bg-[var(--bg-surface)]"
            style={{ background: 'var(--bg-raised)', color: 'var(--text-primary)', borderColor: 'var(--border)', fontWeight: 600, height: '54px' }}>
            Schedule Demo
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-10 px-15 flex items-center justify-between"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
          FaceAttend
        </div>
        <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
          NIT 3003 Capstone · Adarsha Giri · Tejaswee Bhetwal · Aavash Poudel
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, -50%) translateY(0px); }
          50% { transform: translate(0, -50%) translateY(-6px); }
        }
        @keyframes scan {
          from { top: -2px; }
          to { top: 100%; }
        }
      `}</style>
    </div>
  );
}

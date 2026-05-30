import { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 64px)' }}>
      {/* Sidebar */}
      <nav className="w-64 border-r flex flex-col" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        <div className="flex-1 p-4">
          <div className="text-xs mb-2.5 px-2.5 tracking-widest uppercase" style={{ color: 'var(--text-tertiary)', fontWeight: 700, letterSpacing: '0.08em' }}>
            Dashboard
          </div>
          
          {[
            { id: 'overview', icon: '📊', label: 'Overview' },
            { id: 'analytics', icon: '📈', label: 'Analytics' }
          ].map((item) => (
            <div key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="px-3 py-2.5 rounded-lg mb-1 flex items-center gap-2.5 cursor-pointer transition-all"
              style={{ 
                background: activeTab === item.id ? 'var(--primary-glow)' : 'transparent',
                color: activeTab === item.id ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: 500
              }}>
              <span>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}

          <div className="text-xs mt-5 mb-2.5 px-2.5 tracking-widest uppercase" style={{ color: 'var(--text-tertiary)', fontWeight: 700, letterSpacing: '0.08em' }}>
            Management
          </div>
          {[
            { icon: '👥', label: 'Users' },
            { icon: '📚', label: 'Courses' },
            { icon: '🏫', label: 'Classes' },
            { icon: '🎓', label: 'Majors' }
          ].map((item, i) => (
            <div key={i} className="px-3 py-2.5 rounded-lg mb-1 flex items-center gap-2.5 cursor-pointer transition-all hover:bg-[var(--bg-raised)]"
              style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
              <span>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}

          <div className="text-xs mt-5 mb-2.5 px-2.5 tracking-widest uppercase" style={{ color: 'var(--text-tertiary)', fontWeight: 700, letterSpacing: '0.08em' }}>
            System
          </div>
          {[
            { icon: '⚙️', label: 'Settings' },
            { icon: '🔐', label: 'Security' },
            { icon: '📋', label: 'Logs' }
          ].map((item, i) => (
            <div key={i} className="px-3 py-2.5 rounded-lg mb-1 flex items-center gap-2.5 cursor-pointer transition-all hover:bg-[var(--bg-raised)]"
              style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
              <span>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Admin User */}
        <div className="p-4 border-t flex items-center gap-3" style={{ borderColor: 'var(--border)' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border text-sm"
            style={{ background: 'var(--primary-glow)', color: 'var(--primary)', borderColor: 'var(--border-mid)', fontWeight: 700 }}>A</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm truncate" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              admin
            </div>
            <div className="text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>admin@uni.edu.au</div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto" style={{ background: 'var(--bg-base)' }}>
        <div className="p-7">
          {/* Header */}
          <div className="mb-6">
            <h1 className="mb-1" style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Administrator Dashboard
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Complete institutional oversight and management
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4.5 mb-6">
            {[
              { label: 'Total Students', value: '2,847', change: '+12%', icon: '🎓', color: 'primary' },
              { label: 'Active Lecturers', value: '142', change: '+5%', icon: '👨‍🏫', color: 'secondary' },
              { label: 'Total Courses', value: '86', change: '+3', icon: '📚', color: 'accent' },
              { label: 'Attendance Rate', value: '94.2%', change: '+2.3%', icon: '✓', color: 'success' }
            ].map((stat, i) => (
              <div key={i} className="p-5 rounded-2xl border transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs"
                    style={{ 
                      background: `var(--${stat.color}-glow)`,
                      color: `var(--${stat.color})`,
                      fontWeight: 700
                    }}>
                    {stat.change}
                  </span>
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
          <div className="grid grid-cols-3 gap-4.5">
            {/* Recent Activity */}
            <div className="col-span-2 rounded-2xl border overflow-hidden" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
              <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Recent Activity
                </h3>
                <button className="text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-[var(--bg-raised)]"
                  style={{ color: 'var(--primary)' }}>
                  View All
                </button>
              </div>
              <div className="p-5">
                {[
                  { action: 'New student registered', user: 'John Smith · S2048', time: '2 minutes ago', icon: '👤', color: 'primary' },
                  { action: 'Course updated', user: 'CS-305 Data Structures', time: '15 minutes ago', icon: '📚', color: 'secondary' },
                  { action: 'Attendance session completed', user: 'Dr. Jane Doe · CS-101', time: '1 hour ago', icon: '✓', color: 'success' },
                  { action: 'New lecturer added', user: 'Prof. Mike Johnson · L156', time: '2 hours ago', icon: '👨‍🏫', color: 'accent' },
                  { action: 'Security alert resolved', user: 'Failed login attempts detected', time: '3 hours ago', icon: '🔒', color: 'danger' }
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3.5 py-3.5 border-b last:border-b-0"
                    style={{ borderColor: 'rgba(0,0,0,0.03)' }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `var(--${activity.color}-glow)` }}>
                      <span className="text-sm">{activity.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm mb-0.5" style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '13px' }}>
                        {activity.action}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                        {activity.user}
                      </div>
                    </div>
                    <div className="text-xs flex-shrink-0" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
              <div className="p-5 border-b" style={{ borderColor: 'var(--border)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Quick Actions
                </h3>
              </div>
              <div className="p-5 flex flex-col gap-2.5">
                {[
                  { icon: '➕', label: 'Add Student', color: 'primary' },
                  { icon: '👨‍🏫', label: 'Add Lecturer', color: 'secondary' },
                  { icon: '📚', label: 'Create Course', color: 'accent' },
                  { icon: '📊', label: 'Generate Report', color: 'success' },
                  { icon: '⚙️', label: 'System Settings', color: 'primary' }
                ].map((action, i) => (
                  <button key={i} className="px-3.5 py-3 rounded-lg border text-left flex items-center gap-2.5 transition-all hover:border-[var(--border-mid)]"
                    style={{ 
                      background: 'var(--bg-raised)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontWeight: 500
                    }}>
                    <span className="w-7 h-7 rounded flex items-center justify-center text-sm"
                      style={{ background: `var(--${action.color}-glow)` }}>
                      {action.icon}
                    </span>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="grid grid-cols-3 gap-4.5 mt-4.5">
            {[
              { label: 'Server Status', status: 'Operational', uptime: '99.98%', color: 'success' },
              { label: 'Database', status: 'Healthy', uptime: '100%', color: 'success' },
              { label: 'Face Recognition API', status: 'Active', uptime: '99.95%', color: 'success' }
            ].map((sys, i) => (
              <div key={i} className="p-4.5 rounded-2xl border"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-sm" style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '12px' }}>
                    {sys.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--success)' }} />
                    <span className="text-xs" style={{ color: 'var(--success)', fontWeight: 700, fontSize: '11px' }}>
                      {sys.status}
                    </span>
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {sys.uptime}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>
                  Uptime (30 days)
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

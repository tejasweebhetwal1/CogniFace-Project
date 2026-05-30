import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, Users, BookOpen, GraduationCap, BarChart3, 
  Settings, LogOut, Home, Lock, UserCog, Search, Plus
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'admin' | 'lecturer' | 'student';
  userName: string;
  userRole: string;
  userInitials: string;
  headerTitle: string;
  headerSubtitle?: string;
  headerAction?: ReactNode;
}

export default function DashboardLayout({
  children,
  role,
  userName,
  userRole,
  userInitials,
  headerTitle,
  headerSubtitle,
  headerAction
}: DashboardLayoutProps) {
  const location = useLocation();

  const adminNavItems = [
    { section: 'OVERVIEW' },
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', badge: null },
    { path: '/admin/users', icon: Users, label: 'Users', badge: '3' },
    { section: 'ACADEMIC' },
    { path: '/admin/majors', icon: GraduationCap, label: 'Majors' },
    { path: '/admin/courses', icon: BookOpen, label: 'Courses' },
    { path: '/admin/classes', icon: BookOpen, label: 'Classes' },
    { section: 'ATTENDANCE' },
    { path: '/admin/reports', icon: BarChart3, label: 'Reports' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { section: 'SYSTEM' },
    { path: '/admin/security', icon: Lock, label: 'Security' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' }
  ];

  const lecturerNavItems = [
    { section: 'OVERVIEW' },
    { path: '/lecturer', icon: LayoutDashboard, label: 'Dashboard' },
    { section: 'TEACHING' },
    { path: '/lecturer/classes', icon: BookOpen, label: 'My Classes' },
    { path: '/lecturer/attendance', icon: BarChart3, label: 'Attendance', badge: '2' },
    { section: 'HISTORY' },
    { path: '/lecturer/logs', icon: BarChart3, label: 'Session Logs' },
    { path: '/lecturer/reports', icon: BarChart3, label: 'Reports' },
    { section: 'ACCOUNT' },
    { path: '/lecturer/profile', icon: UserCog, label: 'Profile' },
    { path: '/lecturer/settings', icon: Settings, label: 'Settings' }
  ];

  const studentNavItems = [
    { section: 'OVERVIEW' },
    { path: '/student', icon: LayoutDashboard, label: 'Dashboard' },
    { section: 'COURSES' },
    { path: '/student/courses', icon: BookOpen, label: 'My Courses' },
    { path: '/student/browse', icon: Search, label: 'Browse & Enroll' },
    { section: 'ATTENDANCE' },
    { path: '/student/attendance', icon: BarChart3, label: 'My Attendance' },
    { path: '/student/history', icon: BarChart3, label: 'History' },
    { section: 'ACCOUNT' },
    { path: '/face-registration', icon: UserCog, label: 'Face Registration' },
    { path: '/student/profile', icon: UserCog, label: 'Profile' }
  ];

  const navItems = role === 'admin' ? adminNavItems : role === 'lecturer' ? lecturerNavItems : studentNavItems;

  const avatarColors = {
    admin: { bg: 'rgba(0,212,180,0.15)', text: 'var(--accent2)' },
    lecturer: { bg: 'rgba(167,139,250,0.15)', text: 'var(--accent3)' },
    student: { bg: 'rgba(79,142,255,0.15)', text: 'var(--accent)' }
  };

  return (
    <div className="flex min-h-screen">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-5 backdrop-blur-xl border-b"
        style={{ 
          background: 'rgba(8,11,18,0.9)', 
          borderColor: 'var(--border)' 
        }}>
        <div className="flex items-center gap-2 font-display text-lg" style={{ fontWeight: 800, color: 'var(--t1)' }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
          FaceAttend
        </div>
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 border"
            style={{ background: 'transparent', color: 'var(--t3)', borderColor: 'var(--border)' }}>
            <Home size={12} />
            Homepage
          </Link>
          <Link to="/login" className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 border"
            style={{ background: 'transparent', color: 'var(--t3)', borderColor: 'var(--border)' }}>
            <Lock size={12} />
            Login
          </Link>
          <Link to="/admin" className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${role === 'admin' ? '' : 'border'}`}
            style={{ 
              background: role === 'admin' ? 'var(--accent)' : 'transparent', 
              color: role === 'admin' ? '#fff' : 'var(--t3)',
              borderColor: 'var(--border)'
            }}>
            <Settings size={12} />
            {role === 'admin' && 'Admin'}
          </Link>
          <Link to="/lecturer" className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${role === 'lecturer' ? '' : 'border'}`}
            style={{ 
              background: role === 'lecturer' ? 'var(--accent)' : 'transparent', 
              color: role === 'lecturer' ? '#fff' : 'var(--t3)',
              borderColor: 'var(--border)'
            }}>
            <BookOpen size={12} />
            {role === 'lecturer' && 'Lecturer'}
          </Link>
          <Link to="/student" className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${role === 'student' ? '' : 'border'}`}
            style={{ 
              background: role === 'student' ? 'var(--accent)' : 'transparent', 
              color: role === 'student' ? '#fff' : 'var(--t3)',
              borderColor: 'var(--border)'
            }}>
            <Users size={12} />
            {role === 'student' && 'Student'}
          </Link>
          <Link to="/face-registration" className="text-xs px-3 py-1.5 rounded-lg border"
            style={{ background: 'transparent', color: 'var(--t3)', borderColor: 'var(--border)' }}>
            Face Reg
          </Link>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full border ml-2"
            style={{ 
              background: 'var(--bg-raised)', 
              color: 'var(--t3)',
              borderColor: 'var(--border)'
            }}>
            UI Prototype • MIT 3003
          </span>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="w-58 flex-shrink-0 border-r pt-14 sticky top-14 h-screen overflow-y-auto"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        <div className="p-3 flex flex-col gap-0.5">
          {navItems.map((item, i) => {
            if (item.section) {
              return (
                <div key={i} className="px-2.5 py-2.5 mt-1.5 text-xs tracking-widest uppercase"
                  style={{ color: 'var(--t3)', fontWeight: 700 }}>
                  {item.section}
                </div>
              );
            }

            const Icon = item.icon!;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={i}
                to={item.path!}
                className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg text-sm transition-all border"
                style={{
                  background: isActive ? 'var(--accent-glow)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'var(--t2)',
                  borderColor: isActive ? 'var(--border-mid)' : 'transparent',
                  fontWeight: 500
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'var(--bg-raised)';
                    e.currentTarget.style.color = 'var(--t1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--t2)';
                  }
                }}>
                <Icon size={15} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto px-1.5 py-0.5 rounded-full text-xs font-mono"
                    style={{ background: 'var(--accent)', color: '#fff', fontWeight: 700 }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* User Profile */}
        <div className="mt-auto p-4 pt-4 border-t"
          style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-display text-sm"
              style={{ 
                background: avatarColors[role].bg,
                color: avatarColors[role].text,
                fontWeight: 700
              }}>
              {userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate" style={{ color: 'var(--t1)', fontWeight: 600 }}>
                {userName}
              </div>
              <div className="text-xs truncate" style={{ color: 'var(--t3)' }}>
                {userRole}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-14 min-w-0" style={{ background: 'var(--bg-base)' }}>
        {/* Page Header */}
        <div className="border-b px-8 py-7 flex items-start justify-between"
          style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}>
          <div>
            <h1 className="font-display text-3xl mb-1" style={{ fontWeight: 800, color: 'var(--t1)' }}>
              {headerTitle}
            </h1>
            {headerSubtitle && (
              <p className="text-sm" style={{ color: 'var(--t3)' }}>
                {headerSubtitle}
              </p>
            )}
          </div>
          {headerAction}
        </div>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

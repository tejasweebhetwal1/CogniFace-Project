import { useMemo, useState } from "react";

type Tab = "dashboard" | "classes" | "schedule" | "session" | "history" | "reports";

type ClassItem = {
  code: string;
  name: string;
  section: string;
  students: number;
  time: string;
  color: string;
};

type Session = {
  id: number;
  className: string;
  date: string;
  present: number;
  absent: number;
  late: number;
  total: number;
  status: "Active" | "Completed";
};

const classes: ClassItem[] = [
  {
    code: "CS101",
    name: "Introduction to Computer Science",
    section: "A",
    students: 45,
    time: "Mon/Wed 10:00 AM",
    color: "primary",
  },
  {
    code: "CS302",
    name: "Advanced Data Structures",
    section: "",
    students: 28,
    time: "Tue/Thu 2:00 PM",
    color: "secondary",
  },
  {
    code: "CS410",
    name: "Machine Learning Fundamentals",
    section: "",
    students: 35,
    time: "Fri 11:00 AM",
    color: "accent",
  },
];

const defaultSessions: Session[] = [
  {
    id: 1,
    className: "CS101-A",
    date: "Today 10:15",
    present: 41,
    absent: 2,
    late: 2,
    total: 45,
    status: "Completed",
  },
  {
    id: 2,
    className: "CS302",
    date: "Yesterday 14:05",
    present: 25,
    absent: 2,
    late: 1,
    total: 28,
    status: "Completed",
  },
];

const loadSessions = (): Session[] => {
  try {
    const saved = localStorage.getItem("cogniface_lecturer_sessions");
    return saved ? JSON.parse(saved) : defaultSessions;
  } catch {
    return defaultSessions;
  }
};

export default function LecturerPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sessionActive, setSessionActive] = useState(false);
  const [currentClass, setCurrentClass] = useState<ClassItem | null>(null);
  const [sessions, setSessions] = useState<Session[]>(loadSessions);

  const saveSessions = (next: Session[]) => {
    setSessions(next);
    localStorage.setItem("cogniface_lecturer_sessions", JSON.stringify(next));
  };

  const currentSession = sessions.find((session) => session.status === "Active");

  const startSession = (cls = classes[0]) => {
    const active = sessions.find((session) => session.status === "Active");

    if (active) {
      alert("A session is already active. End it before starting another.");
      return;
    }

    const newSession: Session = {
      id: Date.now(),
      className: `${cls.code}${cls.section ? "-" + cls.section : ""}`,
      date: new Date().toLocaleString(),
      present: 0,
      absent: 0,
      late: 0,
      total: cls.students,
      status: "Active",
    };

    setCurrentClass(cls);
    setSessionActive(true);
    saveSessions([newSession, ...sessions]);
    setActiveTab("session");
  };

  const endSession = () => {
    const next = sessions.map((session) =>
      session.status === "Active"
        ? {
            ...session,
            status: "Completed" as const,
          }
        : session
    );

    setSessionActive(false);
    setCurrentClass(null);
    saveSessions(next);
    alert("Attendance session completed. Backend endpoint later: PATCH /api/attendance/sessions/:id/end");
  };

  const updateActiveSession = (field: "present" | "absent" | "late", amount: number) => {
    const next = sessions.map((session) => {
      if (session.status !== "Active") return session;

      return {
        ...session,
        [field]: Math.max(0, session[field] + amount),
      };
    });

    saveSessions(next);
  };

  const exportReport = () => {
    const rows = [
      ["ID", "Class", "Date", "Present", "Absent", "Late", "Total", "Status"],
      ...sessions.map((session) => [
        session.id,
        session.className,
        session.date,
        session.present,
        session.absent,
        session.late,
        session.total,
        session.status,
      ]),
    ];

    const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "cogniface-lecturer-attendance.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const averageAttendance = useMemo(() => {
    const completed = sessions.filter((session) => session.status === "Completed");
    if (!completed.length) return "0%";

    const avg =
      completed.reduce((sum, session) => sum + session.present / session.total, 0) /
      completed.length;

    return `${Math.round(avg * 100)}%`;
  }, [sessions]);

  const todaySessions = sessions.filter((session) =>
    session.date.toLowerCase().includes("today")
  ).length;

  return (
    <div className="flex" style={{ minHeight: "calc(100vh - 64px)" }}>
      <nav
        className="w-64 border-r flex flex-col"
        style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
      >
        <div className="flex-1 p-4">
          <SidebarTitle title="Overview" />
          <SidebarItem active={activeTab === "dashboard"} icon="📊" label="Dashboard" onClick={() => setActiveTab("dashboard")} />

          <SidebarTitle title="Classes" />
          <SidebarItem active={activeTab === "classes"} icon="🏫" label="My Classes" onClick={() => setActiveTab("classes")} />
          <SidebarItem active={activeTab === "schedule"} icon="📅" label="Schedule" onClick={() => setActiveTab("schedule")} />

          <SidebarTitle title="Attendance" />
          <SidebarItem active={activeTab === "session"} icon="📷" label="Start Session" onClick={() => setActiveTab("session")} />
          <SidebarItem active={activeTab === "history"} icon="📋" label="History" onClick={() => setActiveTab("history")} />
          <SidebarItem active={activeTab === "reports"} icon="📊" label="Reports" onClick={() => setActiveTab("reports")} />
        </div>

        <div
          className="p-4 border-t flex items-center gap-3"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border text-sm"
            style={{
              background: "var(--secondary-glow)",
              color: "var(--secondary)",
              borderColor: "var(--border-mid)",
              fontWeight: 700,
            }}
          >
            ER
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-sm truncate" style={{ color: "var(--text-primary)", fontWeight: 600 }}>
              Dr. Evelyn Reed
            </div>
            <div className="text-xs truncate" style={{ color: "var(--text-tertiary)" }}>
              Lecturer
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto" style={{ background: "var(--bg-base)" }}>
        <div className="p-7">
          {activeTab !== "classes" && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h1
                    className="mb-1"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "28px",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                    }}
                  >
                    Lecturer Dashboard
                  </h1>

                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Manage your classes and attendance sessions
                  </p>
                </div>

                <button
                  onClick={() => (sessionActive ? endSession() : startSession(classes[0]))}
                  className="px-5 py-2.5 rounded-xl transition-all hover:shadow-md"
                  style={{
                    background: sessionActive ? "var(--danger)" : "var(--primary)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  {sessionActive ? "⏹ End Session" : "▶ Start Attendance Session"}
                </button>
              </div>
            </div>
          )}

          {sessionActive && currentSession && (
            <div
              className="mb-5.5 p-5 rounded-2xl border-l-4"
              style={{
                background: "rgba(5,150,105,0.05)",
                borderColor: "var(--success)",
                border: "1px solid rgba(5,150,105,0.15)",
                borderLeft: "4px solid var(--success)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: "var(--success)" }} />

                  <div>
                    <div
                      className="text-sm mb-0.5"
                      style={{
                        color: "var(--success)",
                        fontWeight: 700,
                        fontSize: "13px",
                      }}
                    >
                      Live Attendance Session Active
                    </div>

                    <div className="text-xs" style={{ color: "var(--text-secondary)", fontSize: "12px" }}>
                      {currentSession.className} · Room 301
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "24px",
                      fontWeight: 800,
                      color: "var(--success)",
                    }}
                  >
                    {currentSession.present}/{currentSession.total}
                  </div>

                  <div className="text-xs" style={{ color: "var(--text-tertiary)", fontSize: "11px" }}>
                    Students Present
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-4 gap-4.5 mb-5.5">
                {[
                  { label: "My Classes", value: classes.length.toString(), icon: "🏫", color: "primary" },
                  {
                    label: "Total Students",
                    value: classes.reduce((sum, cls) => sum + cls.students, 0).toString(),
                    icon: "🎓",
                    color: "secondary",
                  },
                  {
                    label: "Sessions Today",
                    value: todaySessions.toString(),
                    icon: "📅",
                    color: "accent",
                  },
                  {
                    label: "Avg. Attendance",
                    value: averageAttendance,
                    icon: "✓",
                    color: "success",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border transition-all hover:shadow-md hover:-translate-y-0.5"
                    style={{
                      background: "var(--bg-surface)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-2xl">{stat.icon}</span>
                    </div>

                    <div
                      className="mb-1"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "26px",
                        fontWeight: 800,
                        color: "var(--text-primary)",
                      }}
                    >
                      {stat.value}
                    </div>

                    <div className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4.5">
                <ClassesPanel startSession={startSession} viewAll={() => setActiveTab("classes")} />
                <RecentSessionsPanel sessions={sessions} viewAll={() => setActiveTab("history")} />
              </div>

              <SchedulePanel startSession={startSession} />
            </>
          )}

          {activeTab === "classes" && <MyClassesPage startSession={startSession} />}

          {activeTab === "schedule" && <SchedulePanel startSession={startSession} />}

          {activeTab === "session" && (
            <ContentPanel title="Attendance Session">
              {currentSession ? (
                <div>
                  <div className="grid grid-cols-4 gap-4 mb-5">
                    <SessionStat label="Present" value={currentSession.present} color="success" />
                    <SessionStat label="Absent" value={currentSession.absent} color="danger" />
                    <SessionStat label="Late" value={currentSession.late} color="warn" />
                    <SessionStat label="Total" value={currentSession.total} color="primary" />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <button onClick={() => updateActiveSession("present", 1)} className="py-3 rounded-xl" style={{ background: "var(--success)", color: "white", fontWeight: 700 }}>
                      + Mark Present
                    </button>

                    <button onClick={() => updateActiveSession("absent", 1)} className="py-3 rounded-xl" style={{ background: "var(--danger)", color: "white", fontWeight: 700 }}>
                      + Mark Absent
                    </button>

                    <button onClick={() => updateActiveSession("late", 1)} className="py-3 rounded-xl" style={{ background: "var(--warn)", color: "white", fontWeight: 700 }}>
                      + Mark Late
                    </button>
                  </div>

                  <button onClick={endSession} className="mt-4 px-5 py-3 rounded-xl" style={{ background: "var(--primary)", color: "white", fontWeight: 700 }}>
                    End Current Session
                  </button>
                </div>
              ) : (
                <div>
                  <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                    No active attendance session. Start a session from one of your classes.
                  </p>

                  <button onClick={() => startSession(classes[0])} className="px-5 py-3 rounded-xl" style={{ background: "var(--primary)", color: "white", fontWeight: 700 }}>
                    Start Attendance Session
                  </button>
                </div>
              )}
            </ContentPanel>
          )}

          {activeTab === "history" && (
            <ContentPanel title="Attendance History">
              <SessionsTable sessions={sessions} />
            </ContentPanel>
          )}

          {activeTab === "reports" && (
            <ContentPanel title="Reports">
              <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                Export attendance records as CSV. Backend endpoint later: GET /api/lecturer/reports/export
              </p>

              <button onClick={exportReport} className="px-5 py-3 rounded-xl" style={{ background: "var(--primary)", color: "white", fontWeight: 700 }}>
                Export Attendance CSV
              </button>
            </ContentPanel>
          )}
        </div>
      </main>
    </div>
  );
}

function MyClassesPage({
  startSession,
}: {
  startSession: (cls: ClassItem) => void;
}) {
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [activeInnerTab, setActiveInnerTab] = useState("Roster");
  const [search, setSearch] = useState("");

  const students = [
    { name: "Sarah Chen", id: "2500010050", attendance: "92%", status: "Active" },
    { name: "Liam Patel", id: "2300000181", attendance: "92%", status: "Active" },
    { name: "Uaner Nonsson", id: "2300000122", attendance: "92%", status: "Active" },
    { name: "Deny Cohson", id: "2300000135", attendance: "92%", status: "Active" },
    { name: "Nylan Patel", id: "2300095593", attendance: "92%", status: "Active" },
  ];

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "34px",
              fontWeight: 800,
              color: "var(--text-primary)",
            }}
          >
            My Classes
          </h1>

          <p className="mt-1" style={{ color: "var(--text-secondary)" }}>
            Active class
          </p>
        </div>

        <div className="text-right">
          <div style={{ fontWeight: 700 }}>Dr. Evelyn Reed</div>
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Welcome back, Evelyn
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        {classes.map((cls) => (
          <button
            key={cls.code}
            onClick={() => setSelectedClass(cls)}
            className="p-4 rounded-xl border text-left transition-all"
            style={{
              background:
                selectedClass.code === cls.code
                  ? "var(--primary-glow)"
                  : "var(--bg-surface)",
              borderColor:
                selectedClass.code === cls.code
                  ? "var(--primary)"
                  : "var(--border)",
            }}
          >
            <div className="flex justify-between gap-3">
              <div>
                <div style={{ fontWeight: 800, color: "var(--text-primary)" }}>
                  {cls.name}
                </div>
                <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                  ({cls.code}
                  {cls.section ? `-${cls.section}` : ""})
                </div>
                <div className="mt-1" style={{ color: "var(--text-secondary)" }}>
                  {cls.students} Students
                </div>
              </div>

              {selectedClass.code === cls.code && (
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "var(--success)", color: "white", fontSize: "12px" }}>
                  ✓
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
        <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 800 }}>
              {selectedClass.code}
              {selectedClass.section ? `-${selectedClass.section}` : ""}
            </h2>

            <span style={{ color: "var(--text-secondary)" }}>
              {selectedClass.time}, Room 301
            </span>
          </div>

          <div className="flex gap-2">
            <button onClick={() => alert("Announcement feature ready for backend.")} className="px-4 py-2 rounded-lg" style={{ background: "var(--primary)", color: "white", fontWeight: 700 }}>
              Add Announcement
            </button>

            <button onClick={() => alert("Grade assignment feature ready for backend.")} className="px-4 py-2 rounded-lg" style={{ background: "var(--primary)", color: "white", fontWeight: 700 }}>
              Grade Assignment
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[300px_1fr]">
          <div className="p-5 border-r" style={{ borderColor: "var(--border)" }}>
            <div className="rounded-xl border p-4 mb-4" style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}>
              <h3 className="mb-3" style={{ fontWeight: 800 }}>
                Overview
              </h3>

              <InfoMetric label="Avg. Grade" value="78%" />
              <InfoMetric label="Attendance" value="92%" />
              <InfoMetric label="Upcoming Due Dates" value="2" />
            </div>

            <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}>
              <h3 className="mb-3" style={{ fontWeight: 800 }}>
                Upcoming Activity
              </h3>

              <div className="mb-4">
                <div style={{ fontWeight: 700 }}>📄 Assignment 3</div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Due: Nov 15, 11:59 PM
                </div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Submissions: 31/45
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 700 }}>🗓 Midterm Exam</div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Nov 20, 10:00 AM
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="px-5 border-b flex gap-7" style={{ borderColor: "var(--border)" }}>
              {["Overview", "Roster", "Curriculum", "Grades", "Discussions", "Analytics"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveInnerTab(tab)}
                  className="py-4"
                  style={{
                    color: activeInnerTab === tab ? "var(--primary)" : "var(--text-secondary)",
                    borderBottom: activeInnerTab === tab ? "3px solid var(--primary)" : "3px solid transparent",
                    fontWeight: activeInnerTab === tab ? 800 : 600,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="🔍 Search"
                  className="px-4 py-3 rounded-lg border w-64 outline-none"
                  style={{
                    background: "var(--bg-raised)",
                    borderColor: "var(--border)",
                  }}
                />

                <div className="flex gap-2">
                  <button onClick={() => alert("Grade assignment feature ready for backend.")} className="px-4 py-2 rounded-lg border" style={{ borderColor: "var(--border)", fontWeight: 700 }}>
                    Grade Assignment
                  </button>

                  <button onClick={() => startSession(selectedClass)} className="px-4 py-2 rounded-lg border" style={{ borderColor: "var(--border)", fontWeight: 700 }}>
                    Start Meeting
                  </button>
                </div>
              </div>

              {activeInnerTab === "Roster" ? (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Student ID</th>
                      <th className="text-left p-3">Attendance</th>
                      <th className="text-left p-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b" style={{ borderColor: "var(--border)" }}>
                        <td className="p-3 font-semibold">{student.name}</td>
                        <td className="p-3">{student.id}</td>
                        <td className="p-3">{student.attendance}</td>
                        <td className="p-3">
                          <span className="px-3 py-1 rounded-full text-xs" style={{ background: "var(--success-bg)", color: "var(--success)", fontWeight: 700 }}>
                            ● {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="mt-5" style={{ color: "var(--text-secondary)" }}>
                  {activeInnerTab} section is ready for backend data.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SchedulePanel({ startSession }: { startSession: (cls: ClassItem) => void }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = ["09:00", "10:00", "11:00", "12:00", "14:00"];

  const schedule = [
    { day: "Monday", time: "10:00", class: classes[0] },
    { day: "Wednesday", time: "10:00", class: classes[0] },
    { day: "Tuesday", time: "14:00", class: classes[1] },
    { day: "Thursday", time: "14:00", class: classes[1] },
    { day: "Friday", time: "11:00", class: classes[2] },
  ];

  const getClassAt = (day: string, time: string) => {
    return schedule.find((item) => item.day === day && item.time === time);
  };

  return (
    <div className="mt-4.5 rounded-2xl border overflow-hidden" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
      <div className="p-5 border-b" style={{ borderColor: "var(--border)" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 700, color: "var(--text-primary)" }}>
          Weekly Timetable
        </h3>
      </div>

      <div className="p-5 overflow-x-auto">
        <div className="grid min-w-[900px]" style={{ gridTemplateColumns: "90px repeat(5, 1fr)" }}>
          <div />

          {days.map((day) => (
            <div key={day} className="p-3 text-center border-b" style={{ borderColor: "var(--border)", fontWeight: 700, color: "var(--text-primary)" }}>
              {day}
            </div>
          ))}

          {times.map((time) => (
            <>
              <div key={`${time}-label`} className="p-3 border-r border-b text-xs" style={{ borderColor: "var(--border)", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>
                {time}
              </div>

              {days.map((day) => {
                const item = getClassAt(day, time);

                return (
                  <div key={`${day}-${time}`} className="min-h-[115px] p-2 border-r border-b" style={{ borderColor: "var(--border)" }}>
                    {item ? (
                      <div className="h-full p-3 rounded-xl border flex flex-col justify-between" style={{ background: `var(--${item.class.color}-glow)`, borderColor: `var(--${item.class.color})` }}>
                        <div>
                          <div className="text-xs mb-1" style={{ color: `var(--${item.class.color})`, fontFamily: "var(--font-mono)", fontWeight: 800 }}>
                            {item.class.code}
                          </div>

                          <div className="text-sm mb-1" style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                            {item.class.name}
                          </div>

                          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                            Room 301 · Section {item.class.section || "Main"}
                          </div>
                        </div>

                        <button onClick={() => startSession(item.class)} className="mt-3 w-full py-2 rounded-lg text-xs" style={{ background: `var(--${item.class.color})`, color: "white", fontWeight: 700 }}>
                          Start Session
                        </button>
                      </div>
                    ) : (
                      <div className="h-full rounded-xl flex items-center justify-center text-xs" style={{ background: "var(--bg-raised)", color: "var(--text-tertiary)" }}>
                        Free
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

function SidebarTitle({ title }: { title: string }) {
  return (
    <div className="text-xs mt-5 first:mt-0 mb-2.5 px-2.5 tracking-widest uppercase" style={{ color: "var(--text-tertiary)", fontWeight: 700, letterSpacing: "0.08em" }}>
      {title}
    </div>
  );
}

function SidebarItem({ active, icon, label, onClick }: { active: boolean; icon: string; label: string; onClick: () => void }) {
  return (
    <div onClick={onClick} className="px-3 py-2.5 rounded-lg mb-1 flex items-center gap-2.5 cursor-pointer transition-all hover:bg-[var(--bg-raised)]" style={{ background: active ? "var(--primary-glow)" : "transparent", color: active ? "var(--primary)" : "var(--text-secondary)", fontWeight: 500 }}>
      <span>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
}

function ClassesPanel({ startSession, viewAll }: { startSession: (cls: ClassItem) => void; viewAll: () => void }) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
      <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 700, color: "var(--text-primary)" }}>
          My Classes
        </h3>

        <button onClick={viewAll} className="text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-[var(--bg-raised)]" style={{ color: "var(--primary)" }}>
          View All
        </button>
      </div>

      <div className="p-5 flex flex-col gap-3.5">
        {classes.map((cls, i) => (
          <ClassCard key={i} cls={cls} startSession={startSession} />
        ))}
      </div>
    </div>
  );
}

function ClassCard({ cls, startSession }: { cls: ClassItem; startSession: (cls: ClassItem) => void }) {
  return (
    <div className="p-4 rounded-xl border transition-all hover:border-[var(--border-mid)] cursor-pointer" style={{ background: "var(--bg-raised)", borderColor: "var(--border)", borderLeft: `3px solid var(--${cls.color})` }}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-xs mb-0.5" style={{ fontFamily: "var(--font-mono)", color: `var(--${cls.color})`, fontWeight: 700, fontSize: "11px" }}>
            {cls.code}
            {cls.section ? ` · Section ${cls.section}` : ""}
          </div>

          <div className="mb-0.5" style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "14px" }}>
            {cls.name}
          </div>

          <div className="text-xs" style={{ color: "var(--text-tertiary)", fontSize: "11px" }}>
            {cls.time}
          </div>
        </div>

        <div className="text-right">
          <div style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 800, color: "var(--text-primary)" }}>
            {cls.students}
          </div>

          <div className="text-xs" style={{ color: "var(--text-tertiary)", fontSize: "10px" }}>
            Students
          </div>
        </div>
      </div>

      <button onClick={() => startSession(cls)} className="w-full py-2 rounded-lg text-xs transition-all" style={{ background: `var(--${cls.color})`, color: "#fff", fontWeight: 700 }}>
        Start Attendance →
      </button>
    </div>
  );
}

function RecentSessionsPanel({ sessions, viewAll }: { sessions: Session[]; viewAll: () => void }) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
      <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 700, color: "var(--text-primary)" }}>
          Recent Sessions
        </h3>

        <button onClick={viewAll} className="text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-[var(--bg-raised)]" style={{ color: "var(--primary)" }}>
          View All
        </button>
      </div>

      <div className="p-5">
        {sessions.slice(0, 4).map((session) => {
          const rate = Math.round((session.present / session.total) * 100);
          const good = rate >= 80;

          return (
            <div key={session.id} className="flex items-center justify-between py-3.5 border-b last:border-b-0" style={{ borderColor: "rgba(0,0,0,0.03)" }}>
              <div className="flex-1">
                <div className="text-sm mb-0.5" style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "13px" }}>
                  {session.className}
                </div>

                <div className="text-xs" style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", fontSize: "11px" }}>
                  {session.date}
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm mb-0.5" style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "13px" }}>
                  {session.present}/{session.total}
                </div>

                <div className="inline-flex px-2 py-0.5 rounded text-xs" style={{ background: good ? "var(--success-bg)" : "var(--warn-bg)", color: good ? "var(--success)" : "var(--warn)", fontWeight: 700, fontSize: "11px" }}>
                  {rate}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ContentPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
      <div className="p-5 border-b" style={{ borderColor: "var(--border)" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 700, color: "var(--text-primary)" }}>
          {title}
        </h3>
      </div>

      <div className="p-5">{children}</div>
    </div>
  );
}

function SessionStat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="p-4 rounded-xl border text-center" style={{ background: "var(--bg-raised)", borderColor: "var(--border)" }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 800, color: `var(--${color})` }}>
        {value}
      </div>

      <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>
        {label}
      </div>
    </div>
  );
}

function InfoMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3">
      <div style={{ color: "var(--text-secondary)" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 800 }}>
        {value}
      </div>
    </div>
  );
}

function SessionsTable({ sessions }: { sessions: Session[] }) {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
      <table className="w-full text-sm">
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id} className="border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
              <td className="p-3">{session.className}</td>
              <td className="p-3">{session.date}</td>
              <td className="p-3">{session.present} present</td>
              <td className="p-3">{session.absent} absent</td>
              <td className="p-3">{session.late} late</td>
              <td className="p-3">{session.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
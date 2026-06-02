import { useMemo, useState } from "react";

type Tab =
  | "dashboard"
  | "courses"
  | "enroll"
  | "attendance"
  | "history"
  | "profile";

type Course = {
  code: string;
  name: string;
  lecturer: string;
  time: string;
  attendance: number;
  color: string;
};

type AttendanceRecord = {
  course: string;
  time: string;
  status: "Present" | "Late" | "Absent";
  statusType: "success" | "warn" | "danger";
};

const defaultCourses: Course[] = [
  {
    code: "CS101",
    name: "Intro to CS",
    lecturer: "Dr. Evelyn Reed",
    time: "Mon/Wed 10:00 AM",
    attendance: 91,
    color: "primary",
  },
  {
    code: "CS302",
    name: "Data Structures",
    lecturer: "Prof. Mike Johnson",
    time: "Tue/Thu 2:00 PM",
    attendance: 74,
    color: "warn",
  },
  {
    code: "NIT3003",
    name: "Cloud Computing",
    lecturer: "Dr. Jane Doe",
    time: "Fri 11:00 AM",
    attendance: 88,
    color: "success",
  },
];

const availableCourses: Course[] = [
  {
    code: "CS410",
    name: "Machine Learning Fundamentals",
    lecturer: "Dr. Alan Smith",
    time: "Monday 3:00 PM",
    attendance: 0,
    color: "accent",
  },
  {
    code: "NIT2001",
    name: "Web Application Development",
    lecturer: "Prof. Sarah Lee",
    time: "Wednesday 1:00 PM",
    attendance: 0,
    color: "secondary",
  },
];

const defaultRecords: AttendanceRecord[] = [
  {
    course: "Intro to CS",
    time: "Today 09:14",
    status: "Present",
    statusType: "success",
  },
  {
    course: "Data Structures",
    time: "28 Feb 14:02",
    status: "Late",
    statusType: "warn",
  },
  {
    course: "Cloud Computing",
    time: "27 Feb 10:00",
    status: "Present",
    statusType: "success",
  },
];

const load = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const save = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default function StudentPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [courses, setCourses] = useState<Course[]>(
    load("cogniface_student_courses", defaultCourses)
  );
  const [records, setRecords] = useState<AttendanceRecord[]>(
    load("cogniface_student_attendance", defaultRecords)
  );
  const [search, setSearch] = useState("");

  const overallAttendance = useMemo(() => {
    if (!courses.length) return 0;
    return Math.round(
      courses.reduce((sum, course) => sum + course.attendance, 0) /
        courses.length
    );
  }, [courses]);

  const registerFace = () => {
    window.dispatchEvent(
      new CustomEvent("navigate-screen", {
        detail: "facereg",
      })
    );
  };

  const enrollCourse = (course: Course) => {
    const alreadyEnrolled = courses.some((item) => item.code === course.code);

    if (alreadyEnrolled) {
      alert("You are already enrolled in this course.");
      return;
    }

    const next = [...courses, course];
    setCourses(next);
    save("cogniface_student_courses", next);
    alert("Course enrolled locally. Backend endpoint later: POST /api/student/enrollments");
  };

  const dropCourse = (code: string) => {
    if (!confirm("Drop this course?")) return;

    const next = courses.filter((course) => course.code !== code);
    setCourses(next);
    save("cogniface_student_courses", next);
  };

  const exportAttendance = () => {
    const rows = [
      ["Course", "Time", "Status"],
      ...records.map((record) => [record.course, record.time, record.status]),
    ];

    const csv = rows
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "cogniface-student-attendance.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const filteredCourses = courses.filter((course) =>
    JSON.stringify(course).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex" style={{ minHeight: "calc(100vh - 64px)" }}>
      {/* Sidebar */}
      <nav
        className="w-64 border-r flex flex-col"
        style={{
          background: "var(--bg-surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex-1 p-5">
          <SidebarTitle title="Overview" />

          <SidebarItem
            active={activeTab === "dashboard"}
            icon="📊"
            label="Dashboard"
            onClick={() => setActiveTab("dashboard")}
          />

          <SidebarTitle title="Courses" />

          <SidebarItem
            active={activeTab === "courses"}
            icon="📚"
            label="My Courses"
            onClick={() => setActiveTab("courses")}
          />

          <SidebarItem
            active={activeTab === "enroll"}
            icon="🔍"
            label="Browse & Enroll"
            onClick={() => setActiveTab("enroll")}
          />

          <SidebarTitle title="Attendance" />

          <SidebarItem
            active={activeTab === "attendance"}
            icon="📋"
            label="My Attendance"
            onClick={() => setActiveTab("attendance")}
          />

          <SidebarItem
            active={activeTab === "history"}
            icon="📅"
            label="History"
            onClick={() => setActiveTab("history")}
          />

          <SidebarTitle title="Account" />

          <SidebarItem
            active={false}
            icon="📷"
            label="Face Registration"
            onClick={registerFace}
          />

          <SidebarItem
            active={activeTab === "profile"}
            icon="👤"
            label="Profile"
            onClick={() => setActiveTab("profile")}
          />
        </div>

        {/* User section */}
        <div
          className="p-5 border-t flex items-center gap-3"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white"
            style={{ background: "var(--accent)", fontWeight: 700 }}
          >
            AP
          </div>

          <div className="flex-1 min-w-0">
            <div
              className="text-sm truncate font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Florie Warner
            </div>

            <div
              className="text-xs truncate"
              style={{ color: "var(--text-tertiary)" }}
            >
              S001 · NBIT
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="p-8">
          {activeTab === "dashboard" && (
            <>
              {/* Hero Welcome */}
              <HeroCard
                overallAttendance={overallAttendance}
                courseCount={courses.length}
              />

              {/* Face Reg Alert */}
              <div
                className="flex items-center gap-4 p-5 rounded-xl border mb-6"
                style={{
                  background: "var(--warn-bg)",
                  borderColor: "var(--warn-border)",
                }}
              >
                <div className="text-2xl flex-shrink-0">⚠️</div>

                <div className="flex-1">
                  <div
                    className="font-semibold mb-1"
                    style={{ color: "var(--warn)" }}
                  >
                    Action Required: Complete Face Registration
                  </div>

                  <div
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Your face must be registered before automated attendance can
                    mark you present.
                  </div>
                </div>

                <button
                  onClick={registerFace}
                  className="px-5 py-2.5 rounded-lg text-sm flex-shrink-0 transition-all font-semibold hover:opacity-90"
                  style={{ background: "var(--warn)", color: "#fff" }}
                >
                  Register Now →
                </button>
              </div>

              {/* Main Cards Row */}
              <div className="grid grid-cols-2 gap-6">
                <AttendanceOverview
                  courses={courses}
                  records={records}
                  overallAttendance={overallAttendance}
                  onFullHistory={() => setActiveTab("history")}
                />

                <EnrolledCourses
                  courses={courses}
                  onViewCourses={() => setActiveTab("courses")}
                  onDrop={dropCourse}
                />
              </div>

              <StudentTimetable />
            </>
          )}

          {activeTab === "courses" && (
            <Panel
              title="My Courses"
              actionLabel="Export Attendance"
              onAction={exportAttendance}
            >
              <div className="mb-4">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search courses..."
                  className="px-4 py-3 rounded-lg border w-72 outline-none"
                  style={{
                    background: "var(--bg-raised)",
                    borderColor: "var(--border)",
                  }}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.code}
                    course={course}
                    onDrop={() => dropCourse(course.code)}
                  />
                ))}
              </div>
            </Panel>
          )}

          {activeTab === "enroll" && (
            <Panel title="Browse & Enroll">
              <div className="grid grid-cols-2 gap-4">
                {availableCourses.map((course) => (
                  <div
                    key={course.code}
                    className="p-5 rounded-xl border"
                    style={{
                      background: "var(--bg-surface)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div
                      className="text-xs mb-1"
                      style={{
                        color: `var(--${course.color})`,
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                      }}
                    >
                      {course.code}
                    </div>

                    <h3
                      className="mb-1"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "18px",
                        fontWeight: 700,
                      }}
                    >
                      {course.name}
                    </h3>

                    <p
                      className="text-sm mb-1"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {course.lecturer}
                    </p>

                    <p
                      className="text-sm mb-4"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {course.time}
                    </p>

                    <button
                      onClick={() => enrollCourse(course)}
                      className="px-4 py-2 rounded-lg"
                      style={{
                        background: "var(--primary)",
                        color: "white",
                        fontWeight: 700,
                      }}
                    >
                      Enroll
                    </button>
                  </div>
                ))}
              </div>
            </Panel>
          )}

          {activeTab === "attendance" && (
            <Panel
              title="My Attendance"
              actionLabel="Export CSV"
              onAction={exportAttendance}
            >
              <AttendanceOverview
                courses={courses}
                records={records}
                overallAttendance={overallAttendance}
                onFullHistory={() => setActiveTab("history")}
              />
            </Panel>
          )}

          {activeTab === "history" && (
            <Panel
              title="Attendance History"
              actionLabel="Export CSV"
              onAction={exportAttendance}
            >
              <AttendanceTable records={records} />
            </Panel>
          )}

          {activeTab === "profile" && (
            <Panel title="Profile">
              <div
                className="rounded-xl border p-5"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border)",
                }}
              >
                <h3
                  className="mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "22px",
                    fontWeight: 700,
                  }}
                >
                  Student Profile
                </h3>

                <InfoRow label="Name" value="Florie Warner" />
                <InfoRow label="Student ID" value="S001" />
                <InfoRow label="Program" value="Bachelor of IT" />
                <InfoRow label="Year" value="2026" />

                <button
                  onClick={registerFace}
                  className="mt-4 px-5 py-3 rounded-xl"
                  style={{
                    background: "var(--primary)",
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  Go to Face Registration
                </button>
              </div>
            </Panel>
          )}
        </div>
      </main>
    </div>
  );
}

function HeroCard({
  overallAttendance,
  courseCount,
}: {
  overallAttendance: number;
  courseCount: number;
}) {
  return (
    <div
      className="p-8 rounded-2xl border mb-6 relative overflow-hidden"
      style={{
        background: "#F5F5F4",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-start justify-between relative z-10">
        <div>
          <div className="text-sm mb-1" style={{ color: "var(--text-tertiary)" }}>
            Good morning 👋
          </div>

          <h1
            className="mb-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "32px",
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            Florie Warner
          </h1>

          <div
            className="flex gap-3 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            <span style={{ fontFamily: "var(--font-mono)" }}>S001</span>
            <span style={{ color: "var(--text-quaternary)" }}>·</span>
            <span>Bachelor of IT</span>
            <span style={{ color: "var(--text-quaternary)" }}>·</span>
            <span>Enrolled 2026</span>
          </div>
        </div>

        <div className="flex gap-6">
          <HeroMetric label="Overall" value={`${overallAttendance}%`} color="success" />
          <Divider />
          <HeroMetric label="This Week" value="4" color="text-primary" />
          <Divider />
          <HeroMetric label="Courses" value={courseCount.toString()} color="accent" />
        </div>
      </div>
    </div>
  );
}

function HeroMetric({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="text-center px-4">
      <div
        className="mb-1"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "28px",
          fontWeight: 700,
          color: color.startsWith("text") ? `var(--${color})` : `var(--${color})`,
        }}
      >
        {value}
      </div>

      <div
        className="text-xs uppercase tracking-wider"
        style={{ color: "var(--text-tertiary)", fontWeight: 600 }}
      >
        {label}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="w-px" style={{ background: "var(--border)" }} />;
}

function AttendanceOverview({
  courses,
  records,
  overallAttendance,
  onFullHistory,
}: {
  courses: Course[];
  records: AttendanceRecord[];
  overallAttendance: number;
  onFullHistory: () => void;
}) {
  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{
        background: "var(--bg-surface)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="p-6 border-b flex items-center justify-between"
        style={{ borderColor: "var(--border)" }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          Attendance Overview
        </h3>

        <button
          onClick={onFullHistory}
          className="text-sm font-semibold"
          style={{ color: "var(--primary)" }}
        >
          Full History →
        </button>
      </div>

      <div className="p-6">
        <div className="flex gap-6 items-center mb-6">
          {/* Donut Chart */}
          <div className="relative w-28 h-28 flex-shrink-0">
            <svg
              className="absolute inset-0"
              width="112"
              height="112"
              viewBox="0 0 100 100"
              style={{ transform: "rotate(-90deg)" }}
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="var(--bg-raised)"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * overallAttendance) / 100}
                style={{ animation: "drawCircle 1.2s ease 0.3s both" }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  lineHeight: 1,
                }}
              >
                {overallAttendance}%
              </div>

              <div
                className="text-xs uppercase tracking-wider mt-1"
                style={{ color: "var(--text-tertiary)" }}
              >
                overall
              </div>
            </div>
          </div>

          {/* Course Progress Bars */}
          <div className="flex-1">
            {courses.map((course, i) => (
              <div key={course.code} className="mb-3 last:mb-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {course.name}
                  </span>

                  <span
                    className="text-sm font-bold"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: `var(--${course.color})`,
                    }}
                  >
                    {course.attendance}%
                  </span>
                </div>

                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: "var(--bg-raised)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${course.attendance}%`,
                      background: `var(--${course.color})`,
                      animation: `fillBar 1s ease-out ${0.4 + i * 0.15}s both`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Records */}
        <div className="pt-5 border-t" style={{ borderColor: "var(--border)" }}>
          <div
            className="text-xs mb-3 uppercase tracking-wider font-semibold"
            style={{ color: "var(--text-tertiary)" }}
          >
            Recent Records
          </div>

          <div className="flex flex-col gap-0">
            {records.slice(0, 3).map((record, i) => (
              <AttendanceRecordRow key={i} record={record} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EnrolledCourses({
  courses,
  onViewCourses,
  onDrop,
}: {
  courses: Course[];
  onViewCourses: () => void;
  onDrop: (code: string) => void;
}) {
  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{
        background: "var(--bg-surface)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="p-6 border-b flex items-center justify-between"
        style={{ borderColor: "var(--border)" }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          Enrolled Courses
        </h3>

        <button
          onClick={onViewCourses}
          className="text-sm font-semibold"
          style={{ color: "var(--primary)" }}
        >
          View All →
        </button>
      </div>

      <div className="p-6 flex flex-col gap-3">
        {courses.map((course) => (
          <div
            key={course.code}
            className="p-4 rounded-xl border"
            style={{
              background: "var(--bg-raised)",
              borderColor: "var(--border)",
              borderLeft: `4px solid var(--${course.color})`,
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div
                  className="text-xs mb-1"
                  style={{
                    color: `var(--${course.color})`,
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                  }}
                >
                  {course.code}
                </div>

                <div
                  className="mb-1"
                  style={{
                    color: "var(--text-primary)",
                    fontWeight: 700,
                  }}
                >
                  {course.name}
                </div>

                <div
                  className="text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {course.lecturer} · {course.time}
                </div>
              </div>

              <button
                onClick={() => onDrop(course.code)}
                className="px-3 py-1.5 rounded-lg text-xs"
                style={{
                  background: "var(--danger-bg)",
                  color: "var(--danger)",
                  fontWeight: 700,
                }}
              >
                Drop
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CourseCard({
  course,
  onDrop,
}: {
  course: Course;
  onDrop: () => void;
}) {
  return (
    <div
      className="p-5 rounded-xl border"
      style={{
        background: "var(--bg-surface)",
        borderColor: "var(--border)",
        borderLeft: `4px solid var(--${course.color})`,
      }}
    >
      <div
        className="text-xs mb-1"
        style={{
          color: `var(--${course.color})`,
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
        }}
      >
        {course.code}
      </div>

      <h3
        className="mb-1"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "18px",
          fontWeight: 700,
        }}
      >
        {course.name}
      </h3>

      <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>
        {course.lecturer}
      </p>

      <p className="text-sm mb-4" style={{ color: "var(--text-tertiary)" }}>
        {course.time}
      </p>

      <div className="flex items-center justify-between">
        <span
          className="text-sm font-bold"
          style={{ color: `var(--${course.color})` }}
        >
          {course.attendance}% attendance
        </span>

        <button
          onClick={onDrop}
          className="px-3 py-1.5 rounded-lg text-xs"
          style={{
            background: "var(--danger-bg)",
            color: "var(--danger)",
            fontWeight: 700,
          }}
        >
          Drop
        </button>
      </div>
    </div>
  );
}

function StudentTimetable() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = ["09:00", "10:00", "11:00", "14:00"];

  const schedule = [
    { day: "Monday", time: "10:00", title: "Intro to CS", room: "Room 301" },
    { day: "Wednesday", time: "10:00", title: "Intro to CS", room: "Room 301" },
    { day: "Tuesday", time: "14:00", title: "Data Structures", room: "Room 204" },
    { day: "Thursday", time: "14:00", title: "Data Structures", room: "Room 204" },
    { day: "Friday", time: "11:00", title: "Cloud Computing", room: "Lab 2" },
  ];

  const getItem = (day: string, time: string) =>
    schedule.find((item) => item.day === day && item.time === time);

  return (
    <div
      className="mt-6 rounded-xl border overflow-hidden"
      style={{
        background: "var(--bg-surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          Weekly Timetable
        </h3>
      </div>

      <div className="p-6 overflow-x-auto">
        <div
          className="grid min-w-[850px]"
          style={{ gridTemplateColumns: "90px repeat(5, 1fr)" }}
        >
          <div />

          {days.map((day) => (
            <div
              key={day}
              className="p-3 text-center border-b font-semibold"
              style={{ borderColor: "var(--border)" }}
            >
              {day}
            </div>
          ))}

          {times.map((time) => (
            <>
              <div
                key={`${time}-label`}
                className="p-3 border-r border-b text-xs"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-tertiary)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {time}
              </div>

              {days.map((day) => {
                const item = getItem(day, time);

                return (
                  <div
                    key={`${day}-${time}`}
                    className="min-h-[95px] p-2 border-r border-b"
                    style={{ borderColor: "var(--border)" }}
                  >
                    {item ? (
                      <div
                        className="h-full p-3 rounded-lg"
                        style={{
                          background: "var(--primary-lighter)",
                          color: "var(--text-primary)",
                        }}
                      >
                        <div className="font-semibold text-sm">{item.title}</div>
                        <div
                          className="text-xs mt-1"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {item.room}
                        </div>
                      </div>
                    ) : (
                      <div
                        className="h-full rounded-lg flex items-center justify-center text-xs"
                        style={{
                          background: "var(--bg-raised)",
                          color: "var(--text-tertiary)",
                        }}
                      >
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

function AttendanceTable({ records }: { records: AttendanceRecord[] }) {
  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: "var(--border)" }}
    >
      <table className="w-full text-sm">
        <thead>
          <tr
            className="border-b"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            <th className="text-left p-3">Course</th>
            <th className="text-left p-3">Time</th>
            <th className="text-left p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record, i) => (
            <tr
              key={i}
              className="border-b last:border-b-0"
              style={{ borderColor: "var(--border)" }}
            >
              <td className="p-3">{record.course}</td>
              <td className="p-3">{record.time}</td>
              <td className="p-3">
                <StatusBadge record={record} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AttendanceRecordRow({ record }: { record: AttendanceRecord }) {
  return (
    <div
      className="flex items-center justify-between py-3 border-b last:border-b-0"
      style={{ borderColor: "var(--border-light)" }}
    >
      <div
        className="text-sm font-medium"
        style={{ color: "var(--text-primary)" }}
      >
        {record.course}
      </div>

      <div
        className="text-xs"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--text-tertiary)",
        }}
      >
        {record.time}
      </div>

      <StatusBadge record={record} />
    </div>
  );
}

function StatusBadge({ record }: { record: AttendanceRecord }) {
  return (
    <span
      className="px-2.5 py-1 rounded text-xs font-semibold"
      style={{
        background:
          record.statusType === "success"
            ? "var(--success-bg)"
            : record.statusType === "warn"
              ? "var(--warn-bg)"
              : "var(--danger-bg)",
        color:
          record.statusType === "success"
            ? "var(--success)"
            : record.statusType === "warn"
              ? "var(--warn)"
              : "var(--danger)",
      }}
    >
      {record.status}
    </span>
  );
}

function Panel({
  title,
  actionLabel,
  onAction,
  children,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{
        background: "var(--bg-surface)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="p-6 border-b flex items-center justify-between"
        style={{ borderColor: "var(--border)" }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h3>

        {actionLabel && (
          <button
            onClick={onAction}
            className="px-4 py-2 rounded-lg"
            style={{
              background: "var(--primary)",
              color: "white",
              fontWeight: 700,
            }}
          >
            {actionLabel}
          </button>
        )}
      </div>

      <div className="p-6">{children}</div>
    </div>
  );
}

function SidebarTitle({ title }: { title: string }) {
  return (
    <div
      className="text-xs mt-6 first:mt-0 mb-3 px-2 tracking-widest uppercase font-semibold"
      style={{
        color: "var(--text-quaternary)",
        letterSpacing: "0.08em",
      }}
    >
      {title}
    </div>
  );
}

function SidebarItem({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="px-3 py-2.5 rounded-lg mb-1 flex items-center gap-2.5 cursor-pointer transition-all hover:bg-[var(--bg-raised)]"
      style={{
        background: active ? "var(--primary-lighter)" : "transparent",
        color: active ? "var(--primary)" : "var(--text-secondary)",
        fontWeight: active ? 600 : 500,
      }}
    >
      <span>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 border-b" style={{ borderColor: "var(--border)" }}>
      <div className="text-xs mb-1" style={{ color: "var(--text-tertiary)" }}>
        {label}
      </div>
      <div style={{ fontWeight: 700 }}>{value}</div>
    </div>
  );
}
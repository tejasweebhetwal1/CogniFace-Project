import { useMemo, useState } from "react";

type Tab =
  | "overview"
  | "analytics"
  | "users"
  | "courses"
  | "classes"
  | "majors"
  | "settings"
  | "security"
  | "logs";

type ModalType =
  | null
  | "addStudent"
  | "addLecturer"
  | "createCourse"
  | "createClass"
  | "settings";

type Student = {
  id: string;
  name: string;
  email: string;
  major: string;
  status: string;
};

type Lecturer = {
  id: string;
  name: string;
  email: string;
  department: string;
  status: string;
};

type Course = {
  id: string;
  code: string;
  name: string;
  lecturer: string;
  credits: string;
};

type ClassItem = {
  id: string;
  course: string;
  room: string;
  day: string;
  time: string;
};

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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [modal, setModal] = useState<ModalType>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<Record<string, string>>({});

  const [students, setStudents] = useState<Student[]>(
    load("cogniface_students", [
      {
        id: "S2048",
        name: "John Smith",
        email: "john.smith@uni.edu.au",
        major: "Computer Science",
        status: "Active",
      },
    ])
  );

  const [lecturers, setLecturers] = useState<Lecturer[]>(
    load("cogniface_lecturers", [
      {
        id: "L156",
        name: "Prof. Mike Johnson",
        email: "mike.johnson@uni.edu.au",
        department: "Information Technology",
        status: "Active",
      },
    ])
  );

  const [courses, setCourses] = useState<Course[]>(
    load("cogniface_courses", [
      {
        id: "C305",
        code: "CS-305",
        name: "Data Structures",
        lecturer: "Prof. Mike Johnson",
        credits: "12",
      },
    ])
  );

  const [classes, setClasses] = useState<ClassItem[]>(
    load("cogniface_classes", [
      {
        id: "CL101",
        course: "CS-305",
        room: "Room 13.2",
        day: "Monday",
        time: "10:00 AM",
      },
    ])
  );

  const stats = [
    {
      label: "Total Students",
      value: students.length.toString(),
      change: "+12%",
      icon: "🎓",
      color: "primary",
    },
    {
      label: "Active Lecturers",
      value: lecturers.length.toString(),
      change: "+5%",
      icon: "👨‍🏫",
      color: "secondary",
    },
    {
      label: "Total Courses",
      value: courses.length.toString(),
      change: "+3",
      icon: "📚",
      color: "accent",
    },
    {
      label: "Attendance Rate",
      value: "94.2%",
      change: "+2.3%",
      icon: "✓",
      color: "success",
    },
  ];

  const activities = useMemo(
    () => [
      {
        action: "New student registered",
        user: students[students.length - 1]?.name || "No students yet",
        time: "Just now",
        icon: "👤",
        color: "primary",
      },
      {
        action: "Course updated",
        user: courses[courses.length - 1]?.name || "No courses yet",
        time: "15 minutes ago",
        icon: "📚",
        color: "secondary",
      },
      {
        action: "Attendance session completed",
        user: "Dr. Jane Doe · CS-101",
        time: "1 hour ago",
        icon: "✓",
        color: "success",
      },
      {
        action: "New lecturer added",
        user: lecturers[lecturers.length - 1]?.name || "No lecturers yet",
        time: "2 hours ago",
        icon: "👨‍🏫",
        color: "accent",
      },
      {
        action: "Security alert resolved",
        user: "Failed login attempts detected",
        time: "3 hours ago",
        icon: "🔒",
        color: "danger",
      },
    ],
    [students, lecturers, courses]
  );

  const openModal = (type: ModalType) => {
    setForm({});
    setModal(type);
  };

  const updateForm = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const closeModal = () => {
    setModal(null);
    setForm({});
  };

  const submitModal = () => {
    if (modal === "addStudent") {
      if (!form.name || !form.email || !form.major) {
        alert("Please complete all student fields.");
        return;
      }

      const next = [
        ...students,
        {
          id: `S${Date.now().toString().slice(-4)}`,
          name: form.name,
          email: form.email,
          major: form.major,
          status: "Active",
        },
      ];

      setStudents(next);
      save("cogniface_students", next);
      alert("Student saved locally. Backend endpoint later: POST /api/admin/students");
      closeModal();
    }

    if (modal === "addLecturer") {
      if (!form.name || !form.email || !form.department) {
        alert("Please complete all lecturer fields.");
        return;
      }

      const next = [
        ...lecturers,
        {
          id: `L${Date.now().toString().slice(-4)}`,
          name: form.name,
          email: form.email,
          department: form.department,
          status: "Active",
        },
      ];

      setLecturers(next);
      save("cogniface_lecturers", next);
      alert("Lecturer saved locally. Backend endpoint later: POST /api/admin/lecturers");
      closeModal();
    }

    if (modal === "createCourse") {
      if (!form.code || !form.name || !form.lecturer || !form.credits) {
        alert("Please complete all course fields.");
        return;
      }

      const next = [
        ...courses,
        {
          id: `C${Date.now().toString().slice(-4)}`,
          code: form.code,
          name: form.name,
          lecturer: form.lecturer,
          credits: form.credits,
        },
      ];

      setCourses(next);
      save("cogniface_courses", next);
      alert("Course saved locally. Backend endpoint later: POST /api/admin/courses");
      closeModal();
    }

    if (modal === "createClass") {
      if (!form.course || !form.room || !form.day || !form.time) {
        alert("Please complete all class fields.");
        return;
      }

      const next = [
        ...classes,
        {
          id: `CL${Date.now().toString().slice(-4)}`,
          course: form.course,
          room: form.room,
          day: form.day,
          time: form.time,
        },
      ];

      setClasses(next);
      save("cogniface_classes", next);
      alert("Class saved locally. Backend endpoint later: POST /api/admin/classes");
      closeModal();
    }

    if (modal === "settings") {
      save("cogniface_settings", form);
      alert("Settings saved locally. Backend endpoint later: PATCH /api/settings");
      closeModal();
    }
  };

  const deleteRecord = (type: "student" | "lecturer" | "course" | "class", id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    if (type === "student") {
      const next = students.filter((item) => item.id !== id);
      setStudents(next);
      save("cogniface_students", next);
    }

    if (type === "lecturer") {
      const next = lecturers.filter((item) => item.id !== id);
      setLecturers(next);
      save("cogniface_lecturers", next);
    }

    if (type === "course") {
      const next = courses.filter((item) => item.id !== id);
      setCourses(next);
      save("cogniface_courses", next);
    }

    if (type === "class") {
      const next = classes.filter((item) => item.id !== id);
      setClasses(next);
      save("cogniface_classes", next);
    }
  };

  const exportReport = () => {
    const rows = [
      ["Type", "ID", "Name/Code", "Email/Room", "Extra"],
      ...students.map((s) => ["Student", s.id, s.name, s.email, s.major]),
      ...lecturers.map((l) => ["Lecturer", l.id, l.name, l.email, l.department]),
      ...courses.map((c) => ["Course", c.id, c.code, c.name, c.lecturer]),
      ...classes.map((c) => ["Class", c.id, c.course, c.room, `${c.day} ${c.time}`]),
    ];

    const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "cogniface-admin-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const filteredStudents = students.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
  );

  const filteredLecturers = lecturers.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
  );

  const filteredCourses = courses.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
  );

  const filteredClasses = classes.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex" style={{ minHeight: "calc(100vh - 64px)" }}>
      {/* Sidebar */}
      <nav
        className="w-64 border-r flex flex-col"
        style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
      >
        <div className="flex-1 p-4">
          <div
            className="text-xs mb-2.5 px-2.5 tracking-widest uppercase"
            style={{
              color: "var(--text-tertiary)",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            Dashboard
          </div>

          {[
            { id: "overview", icon: "📊", label: "Overview" },
            { id: "analytics", icon: "📈", label: "Analytics" },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className="px-3 py-2.5 rounded-lg mb-1 flex items-center gap-2.5 cursor-pointer transition-all"
              style={{
                background: activeTab === item.id ? "var(--primary-glow)" : "transparent",
                color: activeTab === item.id ? "var(--primary)" : "var(--text-secondary)",
                fontWeight: 500,
              }}
            >
              <span>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}

          <div
            className="text-xs mt-5 mb-2.5 px-2.5 tracking-widest uppercase"
            style={{
              color: "var(--text-tertiary)",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            Management
          </div>

          {[
            { id: "users", icon: "👥", label: "Users" },
            { id: "courses", icon: "📚", label: "Courses" },
            { id: "classes", icon: "🏫", label: "Classes" },
            { id: "majors", icon: "🎓", label: "Majors" },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className="px-3 py-2.5 rounded-lg mb-1 flex items-center gap-2.5 cursor-pointer transition-all hover:bg-[var(--bg-raised)]"
              style={{
                background: activeTab === item.id ? "var(--primary-glow)" : "transparent",
                color: activeTab === item.id ? "var(--primary)" : "var(--text-secondary)",
                fontWeight: 500,
              }}
            >
              <span>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}

          <div
            className="text-xs mt-5 mb-2.5 px-2.5 tracking-widest uppercase"
            style={{
              color: "var(--text-tertiary)",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            System
          </div>

          {[
            { id: "settings", icon: "⚙️", label: "Settings" },
            { id: "security", icon: "🔐", label: "Security" },
            { id: "logs", icon: "📋", label: "Logs" },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className="px-3 py-2.5 rounded-lg mb-1 flex items-center gap-2.5 cursor-pointer transition-all hover:bg-[var(--bg-raised)]"
              style={{
                background: activeTab === item.id ? "var(--primary-glow)" : "transparent",
                color: activeTab === item.id ? "var(--primary)" : "var(--text-secondary)",
                fontWeight: 500,
              }}
            >
              <span>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Admin User */}
        <div className="p-4 border-t flex items-center gap-3" style={{ borderColor: "var(--border)" }}>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border text-sm"
            style={{
              background: "var(--primary-glow)",
              color: "var(--primary)",
              borderColor: "var(--border-mid)",
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div className="flex-1 min-w-0">
            <div
              className="text-sm truncate"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              admin
            </div>
            <div className="text-xs truncate" style={{ color: "var(--text-tertiary)" }}>
              admin@uni.edu.au
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto" style={{ background: "var(--bg-base)" }}>
        <div className="p-7">
          {/* Header */}
          <div className="mb-6">
            <h1
              className="mb-1"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "28px",
                fontWeight: 800,
                color: "var(--text-primary)",
              }}
            >
              Administrator Dashboard
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Complete institutional oversight and management
            </p>
          </div>

          {activeTab === "overview" && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-4.5 mb-6">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border transition-all hover:shadow-md hover:-translate-y-0.5"
                    style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-2xl">{stat.icon}</span>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{
                          background: `var(--${stat.color}-glow)`,
                          color: `var(--${stat.color})`,
                          fontWeight: 700,
                        }}
                      >
                        {stat.change}
                      </span>
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

              {/* Main Content Grid */}
              <div className="grid grid-cols-3 gap-4.5">
                {/* Recent Activity */}
                <div
                  className="col-span-2 rounded-2xl border overflow-hidden"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
                >
                  <div
                    className="p-5 border-b flex items-center justify-between"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "17px",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      Recent Activity
                    </h3>
                    <button
                      onClick={() => setActiveTab("logs")}
                      className="text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-[var(--bg-raised)]"
                      style={{ color: "var(--primary)" }}
                    >
                      View All
                    </button>
                  </div>

                  <div className="p-5">
                    {activities.map((activity, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3.5 py-3.5 border-b last:border-b-0"
                        style={{ borderColor: "rgba(0,0,0,0.03)" }}
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `var(--${activity.color}-glow)` }}
                        >
                          <span className="text-sm">{activity.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className="text-sm mb-0.5"
                            style={{
                              color: "var(--text-primary)",
                              fontWeight: 600,
                              fontSize: "13px",
                            }}
                          >
                            {activity.action}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: "var(--text-secondary)", fontSize: "12px" }}
                          >
                            {activity.user}
                          </div>
                        </div>
                        <div
                          className="text-xs flex-shrink-0"
                          style={{
                            color: "var(--text-tertiary)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                          }}
                        >
                          {activity.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
                >
                  <div className="p-5 border-b" style={{ borderColor: "var(--border)" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "17px",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      Quick Actions
                    </h3>
                  </div>
                  <div className="p-5 flex flex-col gap-2.5">
                    {[
                      { icon: "➕", label: "Add Student", color: "primary", action: () => openModal("addStudent") },
                      { icon: "👨‍🏫", label: "Add Lecturer", color: "secondary", action: () => openModal("addLecturer") },
                      { icon: "📚", label: "Create Course", color: "accent", action: () => openModal("createCourse") },
                      { icon: "📊", label: "Generate Report", color: "success", action: exportReport },
                      { icon: "⚙️", label: "System Settings", color: "primary", action: () => openModal("settings") },
                    ].map((action, i) => (
                      <button
                        key={i}
                        onClick={action.action}
                        className="px-3.5 py-3 rounded-lg border text-left flex items-center gap-2.5 transition-all hover:border-[var(--border-mid)]"
                        style={{
                          background: "var(--bg-raised)",
                          borderColor: "var(--border)",
                          color: "var(--text-primary)",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}
                      >
                        <span
                          className="w-7 h-7 rounded flex items-center justify-center text-sm"
                          style={{ background: `var(--${action.color}-glow)` }}
                        >
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
                  { label: "Server Status", status: "Operational", uptime: "99.98%", color: "success" },
                  { label: "Database", status: "Healthy", uptime: "100%", color: "success" },
                  { label: "Face Recognition API", status: "Active", uptime: "99.95%", color: "success" },
                ].map((sys, i) => (
                  <div
                    key={i}
                    className="p-4.5 rounded-2xl border"
                    style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span
                        className="text-sm"
                        style={{ color: "var(--text-secondary)", fontWeight: 500, fontSize: "12px" }}
                      >
                        {sys.label}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--success)" }} />
                        <span
                          className="text-xs"
                          style={{ color: "var(--success)", fontWeight: 700, fontSize: "11px" }}
                        >
                          {sys.status}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "22px",
                        fontWeight: 800,
                        color: "var(--text-primary)",
                      }}
                    >
                      {sys.uptime}
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-tertiary)", fontSize: "11px" }}>
                      Uptime (30 days)
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab !== "overview" && (
            <Panel
              activeTab={activeTab}
              search={search}
              setSearch={setSearch}
              students={filteredStudents}
              lecturers={filteredLecturers}
              courses={filteredCourses}
              classes={filteredClasses}
              openModal={openModal}
              deleteRecord={deleteRecord}
              exportReport={exportReport}
            />
          )}
        </div>
      </main>

      {modal && (
        <Modal title={modalTitle(modal)} closeModal={closeModal} submitModal={submitModal}>
          {modal === "addStudent" && (
            <>
              <Input label="Student Name" value={form.name || ""} onChange={(v) => updateForm("name", v)} />
              <Input label="Email" value={form.email || ""} onChange={(v) => updateForm("email", v)} />
              <Input label="Major" value={form.major || ""} onChange={(v) => updateForm("major", v)} />
            </>
          )}

          {modal === "addLecturer" && (
            <>
              <Input label="Lecturer Name" value={form.name || ""} onChange={(v) => updateForm("name", v)} />
              <Input label="Email" value={form.email || ""} onChange={(v) => updateForm("email", v)} />
              <Input label="Department" value={form.department || ""} onChange={(v) => updateForm("department", v)} />
            </>
          )}

          {modal === "createCourse" && (
            <>
              <Input label="Course Code" value={form.code || ""} onChange={(v) => updateForm("code", v)} />
              <Input label="Course Name" value={form.name || ""} onChange={(v) => updateForm("name", v)} />
              <Input label="Lecturer" value={form.lecturer || ""} onChange={(v) => updateForm("lecturer", v)} />
              <Input label="Credits" value={form.credits || ""} onChange={(v) => updateForm("credits", v)} />
            </>
          )}

          {modal === "createClass" && (
            <>
              <Input label="Course" value={form.course || ""} onChange={(v) => updateForm("course", v)} />
              <Input label="Room" value={form.room || ""} onChange={(v) => updateForm("room", v)} />
              <Input label="Day" value={form.day || ""} onChange={(v) => updateForm("day", v)} />
              <Input label="Time" value={form.time || ""} onChange={(v) => updateForm("time", v)} />
            </>
          )}

          {modal === "settings" && (
            <>
              <Input label="Institution Name" value={form.institution || ""} onChange={(v) => updateForm("institution", v)} />
              <Input label="Admin Email" value={form.adminEmail || ""} onChange={(v) => updateForm("adminEmail", v)} />
              <Input label="Default Attendance Threshold" value={form.threshold || ""} onChange={(v) => updateForm("threshold", v)} />
            </>
          )}
        </Modal>
      )}
    </div>
  );
}

function Panel(props: any) {
  const {
    activeTab,
    search,
    setSearch,
    students,
    lecturers,
    courses,
    classes,
    openModal,
    deleteRecord,
    exportReport,
  } = props;

  if (activeTab === "users") {
    return (
      <ContentBox title="Users" actionLabel="Add Student" onAction={() => openModal("addStudent")} search={search} setSearch={setSearch}>
        <Table title="Students" rows={students} type="student" deleteRecord={deleteRecord} />
        <Table title="Lecturers" rows={lecturers} type="lecturer" deleteRecord={deleteRecord} />
      </ContentBox>
    );
  }

  if (activeTab === "courses") {
    return (
      <ContentBox title="Courses" actionLabel="Create Course" onAction={() => openModal("createCourse")} search={search} setSearch={setSearch}>
        <Table title="Courses" rows={courses} type="course" deleteRecord={deleteRecord} />
      </ContentBox>
    );
  }

  if (activeTab === "classes") {
    return (
      <ContentBox title="Classes" actionLabel="Create Class" onAction={() => openModal("createClass")} search={search} setSearch={setSearch}>
        <Table title="Classes" rows={classes} type="class" deleteRecord={deleteRecord} />
      </ContentBox>
    );
  }

  if (activeTab === "analytics") {
    return (
      <ContentBox title="Analytics" actionLabel="Export Report" onAction={exportReport}>
        <p style={{ color: "var(--text-secondary)" }}>
          Analytics frontend is ready for backend endpoint: GET /api/admin/analytics
        </p>
      </ContentBox>
    );
  }

  if (activeTab === "settings") {
    return (
      <ContentBox title="Settings" actionLabel="Edit Settings" onAction={() => openModal("settings")}>
        <p style={{ color: "var(--text-secondary)" }}>
          Settings frontend is ready for backend endpoint: GET/PATCH /api/settings
        </p>
      </ContentBox>
    );
  }

  return (
    <ContentBox title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}>
      <p style={{ color: "var(--text-secondary)" }}>
        This section is ready for backend connection.
      </p>
    </ContentBox>
  );
}

function ContentBox({
  title,
  actionLabel,
  onAction,
  search,
  setSearch,
  children,
}: any) {
  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
    >
      <div
        className="p-5 border-b flex items-center justify-between gap-4"
        style={{ borderColor: "var(--border)" }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "17px",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h3>

        <div className="flex gap-2">
          {setSearch && (
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="px-3 py-2 rounded-lg border text-sm"
              style={{
                background: "var(--bg-raised)",
                borderColor: "var(--border)",
              }}
            />
          )}

          {actionLabel && (
            <button
              onClick={onAction}
              className="px-4 py-2 rounded-lg text-sm"
              style={{
                background: "var(--primary)",
                color: "white",
                fontWeight: 600,
              }}
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>

      <div className="p-5">{children}</div>
    </div>
  );
}

function Table({ title, rows, type, deleteRecord }: any) {
  return (
    <div className="mb-6 last:mb-0">
      <h4 className="mb-3" style={{ fontWeight: 700 }}>
        {title}
      </h4>

      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm">
          <tbody>
            {rows.map((row: any) => (
              <tr key={row.id} className="border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
                {Object.values(row).map((value: any, i) => (
                  <td key={i} className="p-3">
                    {value}
                  </td>
                ))}
                <td className="p-3 text-right">
                  <button
                    onClick={() => alert("Edit ready. Backend endpoint later: PATCH /api/admin/" + type + "s/:id")}
                    className="mr-3"
                    style={{ color: "var(--primary)", fontWeight: 700 }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRecord(type, row.id)}
                    style={{ color: "var(--danger)", fontWeight: 700 }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td className="p-5 text-center" style={{ color: "var(--text-tertiary)" }}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Modal({ title, closeModal, submitModal, children }: any) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
      <div
        className="w-full max-w-lg rounded-2xl border p-6"
        style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
      >
        <h2
          className="mb-5"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: 800,
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h2>

        {children}

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={closeModal} className="px-5 py-2.5 rounded-lg border">
            Cancel
          </button>
          <button
            onClick={submitModal}
            className="px-5 py-2.5 rounded-lg"
            style={{ background: "var(--primary)", color: "white", fontWeight: 700 }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block mb-4">
      <div className="text-sm mb-1" style={{ fontWeight: 600 }}>
        {label}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border outline-none"
        style={{
          background: "var(--bg-raised)",
          borderColor: "var(--border)",
        }}
      />
    </label>
  );
}

function modalTitle(modal: ModalType) {
  if (modal === "addStudent") return "Add Student";
  if (modal === "addLecturer") return "Add Lecturer";
  if (modal === "createCourse") return "Create Course";
  if (modal === "createClass") return "Create Class";
  if (modal === "settings") return "System Settings";
  return "";
}
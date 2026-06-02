import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import LecturerPage from "./pages/LecturerPage";
import StudentPage from "./pages/StudentPage";
import FaceRegistration from "./pages/FaceRegistration";

export type Screen =
  | "home"
  | "login"
  | "admin"
  | "lecturer"
  | "student"
  | "facereg";

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>("home");

  const navigate = (screen: Screen) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showMessage = (message: string) => {
    alert(message);
  };

  const scrollHome = (top: number) => {
    if (activeScreen !== "home") {
      setActiveScreen("home");
      setTimeout(() => {
        window.scrollTo({ top, behavior: "smooth" });
      }, 80);
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<Screen>;
      navigate(customEvent.detail);
    };

    window.addEventListener("navigate-screen", handleNavigate);

    return () => {
      window.removeEventListener("navigate-screen", handleNavigate);
    };
  }, []);

  const handleGlobalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const button = (event.target as HTMLElement).closest("button");
    if (!button) return;

    if (button.dataset.handled === "true") return;

    const text = button.textContent?.trim().toLowerCase() || "";

    // IMPORTANT: prevents LoginPage Sign In from being sent back to login
    if (activeScreen === "login" && text.includes("sign in")) {
      return;
    }

    if (text.includes("features")) {
      scrollHome(900);
      return;
    }

    if (text.includes("how it works")) {
      scrollHome(1350);
      return;
    }

    if (text.includes("security")) {
      scrollHome(1650);
      return;
    }

    if (text.includes("pricing")) {
      scrollHome(2500);
      return;
    }

    if (text.includes("sign in")) {
      navigate("login");
      return;
    }

    if (text.includes("get started") || text.includes("start for free")) {
      navigate("login");
      return;
    }

    if (text.includes("see face recognition")) {
      navigate("facereg");
      return;
    }

    if (text.includes("view administrator")) {
      navigate("admin");
      return;
    }

    if (text.includes("view lecturer")) {
      navigate("lecturer");
      return;
    }

    if (text.includes("view student")) {
      navigate("student");
      return;
    }

    if (text.includes("request demo") || text.includes("schedule demo")) {
      showMessage("Demo request is ready. Backend endpoint needed: POST /api/demo-requests");
      return;
    }
  };

  const screens: Record<Screen, JSX.Element> = {
    home: <HomePage />,
    login: <LoginPage navigate={navigate} />,
    admin: <AdminDashboard />,
    lecturer: <LecturerPage />,
    student: <StudentPage />,
    facereg: <FaceRegistration />,
  };

  return (
    <div
      onClick={handleGlobalClick}
      style={{
        fontFamily: "var(--font-body)",
        background: "var(--bg-base)",
        color: "var(--text-primary)",
        minHeight: "100vh",
      }}
    >
      <header
        className="sticky top-0 z-50 w-full border-b"
        style={{
          background: "#ffffff",
          borderColor: "#e5e7eb",
        }}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="h-20 flex items-center justify-between">
            <button
              data-handled="true"
              onClick={() => navigate("home")}
              className="flex items-center gap-3"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "#1e40af",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                🎓
              </div>

              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: "Georgia, serif",
                }}
              >
                CogniFace
              </span>
            </button>

            <nav className="hidden md:flex items-center gap-12">
              <button data-handled="true" onClick={() => scrollHome(900)}>
                Features
              </button>

              <button data-handled="true" onClick={() => scrollHome(1350)}>
                How it works
              </button>

              <button data-handled="true" onClick={() => scrollHome(1650)}>
                Security
              </button>

              <button data-handled="true" onClick={() => scrollHome(2500)}>
                Pricing
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <button
                data-handled="true"
                onClick={() => navigate("login")}
                className="px-6 py-3 rounded-xl border"
                style={{
                  borderColor: "#d1d5db",
                  background: "#ffffff",
                  fontWeight: 600,
                }}
              >
                Sign In
              </button>

              <button
                data-handled="true"
                onClick={() =>
                  showMessage("Demo request is ready. Backend endpoint needed: POST /api/demo-requests")
                }
                className="px-7 py-3 rounded-xl"
                style={{
                  background: "#1e40af",
                  color: "#ffffff",
                  fontWeight: 600,
                }}
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {screens[activeScreen]}
    </div>
  );
}
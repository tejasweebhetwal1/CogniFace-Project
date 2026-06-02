import { useState } from "react";
import type { Screen } from "../App";
import attendanceImage from "figma:asset/2c85f9a0042b6d9bc66fe0a2031618bdd7f3c056.png";

export default function LoginPage({
  navigate,
}: {
  navigate?: (screen: Screen) => void;
}) {
  const [selectedRole, setSelectedRole] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    const roleScreens: Screen[] = ["admin", "lecturer", "student"];
    const selectedScreen = roleScreens[selectedRole];

    localStorage.setItem(
      "cogniface_current_user",
      JSON.stringify({
        email,
        role: selectedScreen,
        signedInAt: new Date().toISOString(),
      })
    );

    if (navigate) {
      navigate(selectedScreen);
    } else {
      window.dispatchEvent(
        new CustomEvent("navigate-screen", {
          detail: selectedScreen,
        })
      );
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center p-10 relative overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(30,58,138,0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(30,58,138,0.05) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div
        className="relative z-10 w-full max-w-[920px] grid grid-cols-2 rounded-[36px] border overflow-hidden"
        style={{
          background: "var(--bg-surface)",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div
          className="border-r relative overflow-hidden"
          style={{
            background: "var(--bg-raised)",
            borderColor: "var(--border)",
          }}
        >
          <img
            src={attendanceImage}
            alt="Facial recognition attendance verification"
            className="w-full h-full object-cover"
            style={{ minHeight: "600px" }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(30,58,138,0.15) 0%, rgba(15,118,110,0.1) 100%)",
            }}
          />
        </div>

        <div
          className="p-13 flex flex-col justify-center"
          style={{ background: "var(--bg-surface)" }}
        >
          <h2
            className="mb-1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "24px",
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            Welcome back
          </h2>

          <p
            className="mb-8 text-sm"
            style={{ color: "var(--text-tertiary)", fontSize: "13px" }}
          >
            Sign in to your account to continue
          </p>

          <div className="grid grid-cols-3 gap-2 mb-6.5">
            {[
              { emoji: "🛡️", label: "Admin" },
              { emoji: "👨‍🏫", label: "Lecturer" },
              { emoji: "🎓", label: "Student" },
            ].map((role, i) => (
              <button
                key={i}
                onClick={() => setSelectedRole(i)}
                className="p-2.5 rounded-lg border transition-all duration-200 flex flex-col items-center gap-1.5"
                style={{
                  background:
                    selectedRole === i
                      ? "var(--primary-lighter)"
                      : "var(--bg-raised)",
                  borderColor:
                    selectedRole === i
                      ? "var(--primary)"
                      : "var(--border-light)",
                  color:
                    selectedRole === i
                      ? "var(--primary)"
                      : "var(--text-secondary)",
                  fontWeight: 600,
                  fontSize: "11.5px",
                }}
              >
                <span className="text-lg">{role.emoji}</span>
                {role.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                className="text-xs tracking-wider uppercase"
                style={{
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                }}
              >
                Email address
              </label>

              <div className="relative">
                <span
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  ✉
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@institution.edu"
                  className="w-full pl-11 pr-3.5 py-3 rounded-lg border text-sm outline-none transition-all"
                  style={{
                    background: "var(--bg-raised)",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-xs tracking-wider uppercase"
                style={{
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                }}
              >
                Password
              </label>

              <div className="relative">
                <span
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  🔒
                </span>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") signIn();
                  }}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-3.5 py-3 rounded-lg border text-sm outline-none transition-all"
                  style={{
                    background: "var(--bg-raised)",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <button
              onClick={signIn}
              className="w-full py-3 rounded-xl text-base mt-1 transition-all duration-200 hover:shadow-md"
              style={{
                background: "var(--primary)",
                color: "#fff",
                fontWeight: 600,
                height: "48px",
                borderRadius: "10px",
              }}
            >
              Sign In
            </button>

            <button
              onClick={() =>
                alert("Password reset feature needs backend/email connection.")
              }
              className="text-sm py-2 rounded-lg self-center transition-all hover:text-[var(--text-primary)]"
              style={{ color: "var(--text-tertiary)", fontSize: "12px" }}
            >
              Forgot your password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
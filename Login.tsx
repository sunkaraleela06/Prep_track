
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState<"student" | "faculty">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Login UI is ready. Backend authentication is the next step.");
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <Link to="/" style={styles.back}>
          ← Back to Home
        </Link>

        <div style={styles.header}>
          <div style={styles.logo}>P</div>
          <h1>Welcome to PrepTrack</h1>
          <p>Sign in to continue your placement journey</p>
        </div>

        <h3 style={styles.label}>Choose your role</h3>

        <div style={styles.roles}>
          <button
            type="button"
            onClick={() => setRole("student")}
            style={{
              ...styles.roleButton,
              ...(role === "student" ? styles.selected : {}),
            }}
          >
            <span style={styles.emoji}>🎓</span>
            <strong>Student</strong>
            <small>Practice, jobs & progress</small>
          </button>

          <button
            type="button"
            onClick={() => setRole("faculty")}
            style={{
              ...styles.roleButton,
              ...(role === "faculty" ? styles.selected : {}),
            }}
          >
            <span style={styles.emoji}>👩‍🏫</span>
            <strong>Faculty</strong>
            <small>Students & reports</small>
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <label style={styles.label} htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.loginButton}>
            Sign in as {role === "student" ? "Student" : "Faculty"} →
          </button>
        </form>

        <p style={styles.footer}>
          New student?{" "}
          <Link to="/" style={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    background: "linear-gradient(135deg, #eff6ff, #f5f3ff)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "460px",
    background: "#ffffff",
    padding: "32px",
    borderRadius: "20px",
    boxShadow: "0 12px 40px rgba(30, 41, 59, 0.12)",
  },
  back: {
    color: "#475569",
    textDecoration: "none",
    fontSize: "14px",
  },
  header: {
    textAlign: "center",
    margin: "24px 0",
  },
  logo: {
    width: "54px",
    height: "54px",
    margin: "0 auto",
    borderRadius: "16px",
    background: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "bold",
  },
  label: {
    display: "block",
    margin: "18px 0 8px",
    color: "#334155",
    fontSize: "14px",
    fontWeight: "bold",
  },
  roles: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  roleButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    padding: "18px 8px",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    background: "#ffffff",
    color: "#334155",
    cursor: "pointer",
  },
  selected: {
    border: "2px solid #2563eb",
    background: "#eff6ff",
    color: "#1d4ed8",
  },
  emoji: {
    fontSize: "28px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "15px",
  },
  loginButton: {
    width: "100%",
    marginTop: "24px",
    padding: "14px",
    border: "none",
    borderRadius: "9px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  footer: {
    textAlign: "center",
    marginTop: "22px",
    fontSize: "14px",
    color: "#64748b",
  },
  link: {
    color: "#2563eb",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

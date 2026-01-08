import { useState } from "react";
import { loginUser, registerUser } from "./api.js";

const roles = [
  { value: "admin", label: "Admin" },
  { value: "customer", label: "Customer" },
];

export default function App() {
  const [mode, setMode] = useState("signup");
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    role: "customer",
  });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      const result = await registerUser(signupForm);
      setStatus({ kind: "success", message: result.message || "Registered" });
      setActiveUser(result.user);
    } catch (err) {
      setStatus({ kind: "error", message: err.message });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      const result = await loginUser(loginForm);
      setStatus({ kind: "success", message: result.message || "Logged in" });
      setActiveUser(result.user);
    } catch (err) {
      setStatus({ kind: "error", message: err.message });
    }
  };

  const renderStatus = () => {
    if (!status) return null;
    return (
      <div
        className={`status ${status.kind === "success" ? "success" : "error"}`}
      >
        {status.message}
      </div>
    );
  };

  return (
    <div className="card">
      <div className="header">
        <div>
          <h1>Role-based Auth</h1>
          <p className="help">Sign up or sign in as Admin or Customer.</p>
        </div>
        <div className="mode-toggle" aria-label="auth mode toggle">
          <button
            className={mode === "signup" ? "active" : ""}
            onClick={() => setMode("signup")}
            type="button"
          >
            Sign Up
          </button>
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
            type="button"
          >
            Sign In
          </button>
        </div>
      </div>

      {renderStatus()}

      {mode === "signup" ? (
        <form className="form" onSubmit={handleSignupSubmit}>
          <label>
            Email
            <input
              type="email"
              value={signupForm.email}
              onChange={(e) =>
                setSignupForm({ ...signupForm, email: e.target.value })
              }
              required
              autoComplete="email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={signupForm.password}
              onChange={(e) =>
                setSignupForm({ ...signupForm, password: e.target.value })
              }
              required
              autoComplete="new-password"
              minLength={6}
            />
          </label>
          <label>
            Role
            <select
              value={signupForm.role}
              onChange={(e) =>
                setSignupForm({ ...signupForm, role: e.target.value })
              }
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Create Account</button>
        </form>
      ) : (
        <form className="form" onSubmit={handleLoginSubmit}>
          <label>
            Email
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
              required
              autoComplete="email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              required
              autoComplete="current-password"
            />
          </label>
          <button type="submit">Sign In</button>
        </form>
      )}

      <div className="form">
        <h3>Current User</h3>
        {activeUser ? (
          <p className="help">
            {activeUser.email} ·{" "}
            {activeUser.role === "admin" ? "Admin" : "Customer"}
          </p>
        ) : (
          <p className="help">No user logged in yet.</p>
        )}
      </div>
    </div>
  );
}

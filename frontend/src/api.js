const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = data.error || "Request failed";
    throw new Error(error);
  }
  return data;
}

export function registerUser({ email, password, role }) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, role }),
  });
}

export function loginUser({ email, password }) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

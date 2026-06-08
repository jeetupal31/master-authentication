const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1/users";

async function request(path, options = {}) {
  const res = await fetch(BASE_URL + path, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.status === false) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export const api = {
  register: (body) =>
    request("/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) =>
    request("/login", { method: "POST", body: JSON.stringify(body) }),
  logout: () => request("/logout", { method: "POST" }),
  profile: () => request("/get-profile", { method: "GET" }),
  forgotPassword: (body) =>
    request("/forgot-password", { method: "POST", body: JSON.stringify(body) }),
  resetPassword: (token, body) =>
    request(`/reset-password/${token}`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
};

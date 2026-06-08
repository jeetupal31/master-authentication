import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.profile()
      .then((res) => setUser(res.user))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function logout() {
    try { await api.logout(); } catch { /* ignore */ }
    navigate("/login");
  }

  if (loading)
    return (
      <main className="mx-auto max-w-md px-5 py-20">
        <div className="card animate-pulse">
          <div className="mx-auto h-20 w-20 rounded-full bg-white/10" />
          <div className="mx-auto mt-4 h-4 w-32 rounded bg-white/10" />
        </div>
      </main>
    );

  if (err)
    return (
      <main className="mx-auto max-w-md px-5 py-20 text-center">
        <span className="text-5xl">🔒</span>
        <h2 className="mt-4 text-xl font-semibold text-white">Not signed in</h2>
        <p className="mt-2 text-sm text-slate-400">{err}</p>
        <button onClick={() => navigate("/login")} className="btn-primary mt-6">Go to login</button>
      </main>
    );

  return (
    <main className="mx-auto max-w-md px-5 py-16">
      <div className="card text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-3xl font-bold text-white">
          {(user.name || "U")[0].toUpperCase()}
        </div>
        <h1 className="mt-4 text-xl font-bold text-white">{user.name}</h1>
        <p className="text-sm text-slate-400">{user.email}</p>

        <div className="mt-6 flex items-center justify-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${user.isVerified ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"}`}>
            {user.isVerified ? "✅ Verified" : "⚠️ Unverified"}
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
            Role: {user.role || "user"}
          </span>
        </div>

        <button onClick={logout} className="btn-ghost mt-8 w-full">Log out</button>
      </div>
    </main>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setErr(""); setMsg(null); setLoading(true);
    try {
      const res = await api.register(form);
      setMsg(res.message || "Registered! Check your email to verify.");
      setForm({ name: "", email: "", password: "" });
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center px-5 py-12">
      <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 md:grid-cols-2">
        <div className="relative hidden flex-col justify-between bg-gradient-to-br from-emerald-700/30 via-slate-900 to-slate-950 p-10 md:flex">
          <span className="text-lg font-extrabold text-white">🔐 MasterAuth</span>
          <div>
            <h2 className="text-3xl font-bold leading-tight text-white">
              Secure auth, done right.
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>✅ Email verification</li>
              <li>✅ JWT access + refresh rotation</li>
              <li>✅ Forgot / reset password</li>
            </ul>
          </div>
          <div />
        </div>

        <div className="bg-slate-900/60 p-8 sm:p-10">
          <h1 className="text-2xl font-bold text-white">Create account</h1>
          <p className="mt-2 text-sm text-slate-400">
            Already have one?{" "}
            <Link to="/login" className="font-medium text-emerald-400 hover:underline">Sign in</Link>
          </p>

          {err && <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{err}</div>}
          {msg && <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{msg}</div>}

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="label">Full name</label>
              <input className="input" placeholder="Jeetu Pal" required value={form.name} onChange={update("name")} />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" placeholder="you@example.com" required value={form.email} onChange={update("email")} />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input" type="password" placeholder="At least 6 characters" required minLength={6} value={form.password} onChange={update("password")} />
            </div>
            <button className="btn-primary w-full" disabled={loading}>
              {loading ? "Creating…" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

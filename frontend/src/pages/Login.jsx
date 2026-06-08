import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      await api.login(form);
      navigate("/profile");
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center justify-center px-5 py-12">
      <div className="card w-full">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-400">Sign in to your account</p>
        </div>

        {err && <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{err}</div>}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" placeholder="you@example.com" required value={form.email} onChange={update("email")} />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="label">Password</label>
              <Link to="/forgot-password" className="text-xs text-emerald-400 hover:underline">Forgot?</Link>
            </div>
            <input className="input" type="password" placeholder="••••••••" required value={form.password} onChange={update("password")} />
          </div>
          <button className="btn-primary w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          No account?{" "}
          <Link to="/" className="font-medium text-emerald-400 hover:underline">Create one</Link>
        </p>
      </div>
    </main>
  );
}

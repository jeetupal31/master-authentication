import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr(""); setMsg(""); setLoading(true);
    try {
      const res = await api.forgotPassword({ email });
      setMsg(res.message || "If that email exists, a reset link was sent.");
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center justify-center px-5 py-12">
      <div className="card w-full">
        <h1 className="text-2xl font-bold text-white">Forgot password</h1>
        <p className="mt-2 text-sm text-slate-400">
          Enter your email and we'll send a reset link.
        </p>

        {err && <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{err}</div>}
        {msg && <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{msg}</div>}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button className="btn-primary w-full" disabled={loading}>
            {loading ? "Sending…" : "Send reset link"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          <Link to="/login" className="font-medium text-emerald-400 hover:underline">← Back to login</Link>
        </p>
      </div>
    </main>
  );
}

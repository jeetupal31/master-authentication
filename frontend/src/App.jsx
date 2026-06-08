import { Routes, Route, Link, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function Header() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-lg">
            🔐
          </span>
          <span className="text-lg font-extrabold text-white">
            Master<span className="text-emerald-400">Auth</span>
          </span>
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          {pathname !== "/login" && (
            <Link to="/login" className="btn-ghost py-2">Login</Link>
          )}
          {pathname !== "/" && (
            <Link to="/" className="btn-primary py-2">Sign up</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

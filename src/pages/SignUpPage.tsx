import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, HAS_API } from "../config";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (HAS_API && API_BASE_URL) {
        const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to sign up");
      } else {
        const users = JSON.parse(localStorage.getItem("mock_users") || "[]");
        if (users.some((u: any) => u.email === email)) throw new Error("Email already registered (offline mode)");
        users.push({ id: crypto.randomUUID?.() || String(Date.now()), name, email, password });
        localStorage.setItem("mock_users", JSON.stringify(users));
      }
      navigate("/signin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">Create Strongs Account</h1>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div>
          <label className="block mb-1">Full Name</label>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required minLength={6} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" />
        </div>
        <button disabled={loading} type="submit" className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 rounded">{loading ? "Creating..." : "Sign Up"}</button>
        <p className="text-sm text-center">Already have an account? <Link to="/signin" className="text-blue-600">Sign in</Link></p>
      </form>
    </div>
  );
};

export default SignUpPage;
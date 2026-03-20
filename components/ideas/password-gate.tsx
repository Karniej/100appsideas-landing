"use client";

import { useState, useEffect, type ReactNode, type FormEvent } from "react";
import { Lock } from "lucide-react";

const ACCESS_PASSWORD = "100APPS2026";
const STORAGE_KEY = "ideas-access";

interface PasswordGateProps {
  children: ReactNode;
}

const PasswordGate = ({ children }: PasswordGateProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === ACCESS_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (checking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-zinc-500 text-sm">Loading...</div>
      </div>
    );
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-8 text-center">
          <div className="inline-flex p-3 rounded-full bg-amber-500/10 mb-6">
            <Lock className="h-6 w-6 text-amber-500" />
          </div>

          <h2 className="font-heading text-2xl font-bold mb-2">
            Enter Access Code
          </h2>
          <p className="text-sm text-zinc-400 mb-6">
            Enter the code from your purchase to browse all 100 ideas.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Access code"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-colors"
              autoFocus
            />

            {error && (
              <p className="text-sm text-red-400">
                Invalid access code. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400 transition-all"
            >
              Unlock Ideas
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordGate;

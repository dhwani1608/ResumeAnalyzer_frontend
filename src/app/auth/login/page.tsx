"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-id")) {
         throw new Error("Supabase is not configured. please update .env.local");
      }
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
      
      router.push("/dashboard");
    } catch(err: any) {
      console.error(err);
      alert(err.message || "Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 rounded bg-ink flex items-center justify-center text-[#0E0F11] font-semibold text-xl">
              T
            </div>
            <span className="text-xl font-display font-semibold tracking-tight text-text-primary">TalentOS</span>
        </div>

        <div className="bg-bg-surface border border-border-strong p-8 rounded-md shadow-sm">
          <h2 className="text-xl font-display font-semibold text-text-primary mb-2 text-center">Welcome back</h2>
          <p className="text-sm text-text-secondary mb-6 text-center">Sign in to review your candidates.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-primary">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required className="w-full bg-bg-base border border-border-strong p-2 rounded text-sm text-text-primary focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-primary">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className="w-full bg-bg-base border border-border-strong p-2 rounded text-sm text-text-primary focus:outline-none focus:border-accent" />
            </div>
            <button disabled={loading} type="submit" className="w-full bg-accent text-[#0E0F11] font-medium py-2 rounded text-sm hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 mt-4">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign in"}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-text-muted">
            Don't have an account? <Link href="/auth/signup" className="text-accent hover:underline">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-id")) {
        throw new Error("Supabase URL is not configured. please update .env.local");
      }
      const supabase = createClient();
      const user_id = crypto.randomUUID();
      const password_hash = await bcrypt.hash(password, 10);

      const { error } = await supabase
        .from("users")
        .insert([
          { id: user_id, name, email, password_hash }
        ]);

      if (error) throw error;
      
      router.push("/auth/login");
    } catch(err: any) {
      console.error(err);
      alert(err.message || "Signup failed. Email might be in use.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4 relative overflow-hidden font-outfit">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />

      <div className="w-full max-w-sm relative z-10">
        <div className="flex items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 rounded bg-ink flex items-center justify-center text-[#0E0F11] font-semibold text-xl">
              T
            </div>
            <span className="text-xl font-display font-semibold tracking-tight text-text-primary">TalentOS</span>
        </div>

        <div className="glass p-8 rounded-2xl shadow-xl border-white/50">
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-2 text-center">Create account</h2>
          <p className="text-sm text-slate-500 mb-8 text-center">Get started with TalentOS.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-primary">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required className="w-full bg-bg-base border border-border-strong p-2 rounded text-sm text-text-primary focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-primary">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required className="w-full bg-bg-base border border-border-strong p-2 rounded text-sm text-text-primary focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-primary">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className="w-full bg-bg-base border border-border-strong p-2 rounded text-sm text-text-primary focus:outline-none focus:border-accent" />
            </div>
            <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 mt-6 active:scale-[0.98]">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-text-muted">
            Already have an account? <Link href="/auth/login" className="text-accent hover:underline">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

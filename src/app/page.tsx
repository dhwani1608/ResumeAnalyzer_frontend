import Link from 'next/link';
import { OrbitHero } from '@/components/ui/OrbitHero';
import { ArrowRight, Zap, Target, Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col relative overflow-hidden font-outfit">
      <header className="relative z-30 flex items-center justify-between px-10 py-10 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-slate-900 rounded-[12px] flex items-center justify-center text-white font-serif italic text-lg shadow-xl group-hover:bg-accent transition-all duration-500">
            T/
          </div>
          <span className="font-display font-bold text-2xl tracking-tighter text-slate-900">TalentOS</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="px-8 py-3 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-accent transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)] active:scale-95">
            Launch Dashboard
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col pt-20">
        <section className="flex flex-col md:flex-row items-center justify-between px-10 max-w-7xl mx-auto w-full gap-20">
          <div className="flex-1 space-y-10 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Intelligence for Modern Hiring
            </div>

            <h1 className="text-7xl lg:text-8xl font-serif leading-[0.95] tracking-tight text-slate-900">
              Decode the <br />
              <span className="italic vibrant-text">DNA of Talent.</span>
            </h1>

            <p className="text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
              TalentOS maps semantic workspaces, computes career trajectories, and ranks matches with orbital precision.
            </p>

            <div className="flex items-center gap-6">
              <Link href="/upload" className="px-10 py-5 bg-accent text-white rounded-full font-bold shadow-[0_20px_40px_rgba(109,40,217,0.2)] hover:shadow-[0_25px_50px_rgba(109,40,217,0.3)] hover:-translate-y-1 transition-all flex items-center gap-3 group">
                Upload Resume <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <OrbitHero />
          </div>
        </section>

        {/* HopeRise Style Value Props */}
        <section className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8 px-10 max-w-7xl mx-auto w-full pb-32">
          {[
            { 
              title: "Rapid Ingestion", 
              desc: "From PDF to structured vector nodes in under 800ms.",
              icon: Zap,
              color: "bg-blue-50 text-blue-600"
            },
            { 
              title: "Semantic Drift", 
              desc: "Measure the exact distance between skillsets and job needs.",
              icon: Target,
              color: "bg-violet-50 text-violet-600"
            },
            { 
              title: "Deep Search", 
              desc: "Query your talent pool using natural language intent.",
              icon: Search,
              color: "bg-emerald-50 text-emerald-600"
            }
          ].map((feature, i) => (
            <div key={i} className="glass-card hover:bg-white transition-all duration-700">
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 shadow-sm`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="px-10 py-16 border-t border-slate-100 max-w-7xl mx-auto w-full flex justify-between items-center bg-transparent">
        <div className="text-sm font-bold text-slate-400">© 2026 TalentOS. Optimized for Precision.</div>
        <div className="flex gap-8 text-sm font-bold text-slate-400">
          <Link href="/dashboard" className="hover:text-accent transition-colors">Platform</Link>
          <Link href="/upload" className="hover:text-accent transition-colors">Resources</Link>
          <Link href="#" className="hover:text-accent transition-colors">Legal</Link>
        </div>
      </footer>
    </div>
  );
}

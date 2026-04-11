import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col">
      {/* <Nav /> */}
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono text-accent text-xl font-bold">T/</span>
          <span className="font-display font-semibold text-lg tracking-tight">TalentOS</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/auth/login" className="text-sm font-medium hover:text-accent transition-colors">Sign in</Link>
          <Link href="/auth/signup" className="px-4 py-2 bg-text-primary text-bg-base text-sm font-medium rounded-md hover:bg-bg-surface border border-transparent transition-all">Start for free</Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center pt-20">
        {/* <Hero /> */}
        <section className="flex flex-col items-center justify-center px-6 text-center w-full max-w-5xl mx-auto">
          <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #3A3B44', background: '#141518', borderRadius: '9999px', padding: '4px 12px', fontSize: '12px', color: '#8A8B96', letterSpacing: '0.04em', marginBottom: '24px' }}>
            Multi-agent resume intelligence — now in beta
          </div>

          <h1 className="text-[clamp(48px,7vw,80px)] font-semibold tracking-[-0.03em] leading-[1.05] text-text-primary max-w-[800px]">
            Your next hire is{' '}
            <span style={{ color: '#5E6AD2', background: '#1E2047', borderRadius: '4px', padding: '0 8px', display: 'inline' }}>
              already
            </span>
            {' '}in your inbox.
          </h1>

          <p className="text-[18px] text-text-muted max-w-[520px] mx-auto leading-relaxed mt-5">
            TalentOS reads every resume the moment it lands.
            Parsed, ranked, and waiting — before you open Slack.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/auth/signup" className="px-6 py-3 bg-accent text-[#0E0F11] text-sm font-medium rounded-md hover:bg-accent-hover transition-colors">
              Start for free
            </Link>
            <Link href="#how-it-works" className="px-6 py-3 border border-border-strong text-text-primary text-sm font-medium rounded-md hover:bg-bg-hover transition-colors">
              See how it works
            </Link>
          </div>
        </section>

        {/* <ProblemStrip /> */}
        <section className="border-y border-border-strong bg-bg-surface py-12 mt-24 w-full">
          <div className="max-w-4xl mx-auto flex sm:grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border-strong flex-col text-center">
            {[
              { n: '250', label: 'avg resumes per open role' },
              { n: '11hrs', label: 'per week lost to manual screening' },
              { n: '34%', label: 'of qualified candidates never seen' },
            ].map(({ n, label }) => (
              <div key={n} className="py-8 sm:py-0 px-8">
                <p className="font-mono text-5xl font-semibold text-text-primary tracking-tight">{n}</p>
                <p className="text-xs text-text-muted font-mono mt-2 leading-relaxed">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* <HowItWorks /> */}
        <section id="how-it-works" className="w-full max-w-6xl mx-auto py-32 px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-semibold tracking-tight">How the agents work</h2>
            <p className="text-text-secondary mt-3">Three specialized models working in parallel on every resume.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-bg-surface border border-border-strong p-8 rounded-sm">
              <span className="font-mono text-accent text-xs tracking-wide-caps">01 / Parser</span>
              <h3 className="text-xl font-medium mt-4 mb-2">Structure the Chaos</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Extracts work history, normalizes job titles, and converts obscure formats into a clean schema.</p>
            </div>
            <div className="bg-bg-elevated border border-border-strong p-8 rounded-sm shadow-xl relative -mt-4 mb-4">
              <div className="absolute top-0 inset-x-0 h-1 bg-accent rounded-t-sm" />
              <span className="font-mono text-accent text-xs tracking-wide-caps">02 / Matcher</span>
              <h3 className="text-xl font-medium mt-4 mb-2">Score against JD</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Computes semantic similarity across 40 dimensions of technical and soft requirements.</p>
            </div>
            <div className="bg-bg-surface border border-border-strong p-8 rounded-sm">
              <span className="font-mono text-accent text-xs tracking-wide-caps">03 / Analyst</span>
              <h3 className="text-xl font-medium mt-4 mb-2">Gap Analysis</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Highlights missing skills, identifies career gaps, and prepares custom technical screening questions.</p>
            </div>
          </div>
        </section>

        {/* <FeaturedDemo /> */}
        <section className="w-full max-w-5xl mx-auto px-6 pb-32">
          <div className="rounded-xl border border-border-strong bg-bg-base overflow-hidden">
            <div className="h-10 border-b border-border-strong bg-bg-surface flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-border-strong" />
              <div className="w-3 h-3 rounded-full bg-border-strong" />
              <div className="w-3 h-3 rounded-full bg-border-strong" />
              <div className="mx-auto bg-bg-base border border-border-strong rounded-md h-6 w-64" />
            </div>
            <div className="aspect-[16/9] bg-bg-surface relative flex items-center justify-center">
              <div className="text-text-muted font-mono text-sm border border-dashed border-border-strong p-12 rounded">
                [ Interactive Dashboard Demo ]
              </div>
            </div>
          </div>
        </section>

        {/* <Pricing /> */}
        <section className="w-full bg-bg-surface border-y border-border-strong py-32">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-semibold tracking-tight">Simple, transparent pricing</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="border border-border-strong bg-bg-base p-8 rounded-md flex flex-col">
                <h3 className="text-xl font-medium mb-2">Free</h3>
                <div className="text-4xl font-semibold tracking-tight mb-4">$0<span className="text-base text-text-muted font-normal">/mo</span></div>
                <p className="text-sm text-text-secondary mb-8">Perfect for exploring the platform.</p>
                <ul className="space-y-4 mb-8 flex-1 text-sm text-text-secondary">
                  <li className="flex items-center gap-2">• 3 Active Roles</li>
                  <li className="flex items-center gap-2">• 50 Candidates tracked</li>
                  <li className="flex items-center gap-2">• Standard Parsing</li>
                </ul>
                <Link href="/auth/signup" className="block text-center w-full py-3 border border-border-strong bg-bg-surface hover:bg-bg-hover text-sm font-medium rounded transition-colors">Start for free</Link>
              </div>

              <div className="border border-accent bg-bg-elevated p-8 rounded-md flex flex-col relative shadow-xl">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-accent text-[#0E0F11] font-mono text-[10px] tracking-wide-caps font-bold px-2 py-0.5 rounded">FEATURED</div>
                <h3 className="text-xl font-medium mb-2 text-accent">Scale</h3>
                <div className="text-4xl font-semibold tracking-tight mb-4">$79<span className="text-base text-text-muted font-normal">/mo</span></div>
                <p className="text-sm text-text-secondary mb-8">For serious hiring pipelines.</p>
                <ul className="space-y-4 mb-8 flex-1 text-sm text-text-secondary">
                  <li className="flex items-center gap-2 text-text-primary">• Unlimited Roles</li>
                  <li className="flex items-center gap-2 text-text-primary">• Unlimited Candidates</li>
                  <li className="flex items-center gap-2 text-text-primary">• Advanced AI Gap Analysis</li>
                </ul>
                <Link href="/dashboard" className="block text-center w-full py-3 bg-accent text-[#0E0F11] hover:bg-accent-hover text-sm font-medium rounded transition-colors">Start Scale Trial</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
      <footer className="w-full max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-border-strong mt-auto">
        <div className="flex items-center gap-2">
          <span className="font-mono text-text-muted font-bold">T/</span>
          <span className="font-display font-medium text-text-secondary">TalentOS &copy; 2026</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-text-muted">
          <Link href="/dashboard" className="hover:text-text-primary transition-colors">Dashboard</Link>
          <Link href="/jobs" className="hover:text-text-primary transition-colors">Jobs</Link>
          <Link href="/upload" className="hover:text-text-primary transition-colors">Upload</Link>
          <Link href="/dashboard" className="hover:text-text-primary transition-colors">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}

import type { Metadata } from 'next';
import { Inter, Outfit, EB_Garamond } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';
import AuthProvider from '@/components/providers/AuthProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const ebGaramond = EB_Garamond({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'TalentOS | Recruiter Intelligence Dashboard',
  description: 'Hire like you already know who wins.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body
        className={cn(
          'min-h-screen bg-bg-base text-text-primary antialiased selection:bg-accent/10 selection:text-accent',
          inter.variable,
          outfit.variable,
          ebGaramond.variable,
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <ReactQueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';
import AuthProvider from '@/components/providers/AuthProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });

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
    <html lang="en" className="dark">
      <body
        className={cn(
          'min-h-screen bg-bg-base text-text-primary antialiased',
          inter.variable,
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

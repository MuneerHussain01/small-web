import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Small Web',
  description: 'A browser for a small web',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

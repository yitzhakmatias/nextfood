import './globals.css';
import { Open_Sans, Poppins } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'NextJS Course App',
  description: 'Your first NextJS app!',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${openSans.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}

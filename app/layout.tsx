import StoreProvider from '@/Providers/ReduxProvider';
import { Header } from '@/components/header/Header';
import localFont from 'next/font/local';
import { store } from '@/store/store';
import type { Metadata } from 'next';
import Inspect from './Inspect';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Онлайн Кинотеатр ',
  description: 'все фильмы толкь здесь!!',
  // openGraph: ["/img.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const showHeader = store.getState()['header/data'].visibility;

  return (
    <html lang="en">
      <StoreProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Inspect />
          {showHeader && <Header />}
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}

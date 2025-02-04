import StoreProvider from '@/Providers/ReduxProvider';
import { Header } from '@/components/header/Header';
import loginApi from '@/store/auth/loginApi';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import { store } from '@/store/store';
import { InitiateUser } from '@/HOC';
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
          <InitiateUser>
            <Inspect />
            {showHeader && <Header />}
            {children}
          </InitiateUser>
        </body>
      </StoreProvider>
    </html>
  );
}

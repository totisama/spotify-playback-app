import type { Metadata } from 'next';
import { type ReactNode } from 'react';
import { AsideMenu } from '@/shared/layout/AsideMenu';
import { Player } from '@/shared/layout/Player';
import { Header } from '@/shared/layout/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'SpotyPlayer',
  description: 'Play you favorite music',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        id='app'
        className='h-screen px-2'
      >
        <header className='grid-area-header'>
          <Header />
        </header>
        <aside className='grid-area-aside bg-secondary overflow-y-auto rounded-lg'>
          <AsideMenu />
        </aside>
        <main className='grid-area-main overflow-y-auto rounded-lg bg-foreground'>
          {children}
        </main>
        <footer className='grid-area-player flex items-center justify-between bg-black px-3'>
          <Player />
        </footer>
      </body>
    </html>
  );
}

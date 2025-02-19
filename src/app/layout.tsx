import type { Metadata } from 'next';
import { type ReactNode } from 'react';
import { AsideMenu } from '@/shared/design/layout/AsideMenu';
import { Player } from '@/shared/design/layout/Player';
import { Header } from '@/shared/design/layout/Header';
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
        <aside className='grid-area-aside overflow-y-auto rounded-lg bg-secondary'>
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

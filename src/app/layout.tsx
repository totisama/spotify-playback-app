import type { Metadata } from 'next';
import { type ReactNode } from 'react';
import { AsideMenu } from '@/shared/layout/AsideMenu';
import { Player } from '@/shared/layout/Player';
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
        className='h-screen gap-2 p-2'
      >
        <aside className='grid-area-aside bg-section-background overflow-y-auto rounded-lg'>
          <AsideMenu />
        </aside>
        <main className='grid-area-main bg-section-background overflow-y-auto rounded-lg'>
          {children}
        </main>
        <footer className='grid-area-player flex items-center justify-between bg-black px-3'>
          <Player />
        </footer>
      </body>
    </html>
  );
}

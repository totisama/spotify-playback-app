import type { Metadata } from 'next';
import { Suspense, type ReactNode } from 'react';
import { AsideMenu } from '@/shared/design/layout/AsideMenu';
import { Player } from '@/shared/design/layout/Player';
import { Header } from '@/shared/design/layout/Header';
import { SpotifyPlayerProvider } from '@/shared/context/SpotifyPlayerContext';
import { ErrorBoundary } from '@/shared/design/components/globals/ErrorBoundary';
import Loading from './Loading';
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
        <SpotifyPlayerProvider>
          <header className='grid-area-header'>
            <Header />
          </header>
          <aside className='grid-area-aside overflow-y-auto rounded-lg bg-secondary'>
            <AsideMenu />
          </aside>

          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <main className='grid-area-main overflow-y-auto rounded-lg bg-foreground'>
                {children}
              </main>
            </Suspense>
          </ErrorBoundary>
          <footer className='grid-area-player flex items-center justify-between bg-black px-3'>
            <Player />
          </footer>
        </SpotifyPlayerProvider>
      </body>
    </html>
  );
}

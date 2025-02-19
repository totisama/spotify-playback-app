import { buttonVariants } from '@/shared/design/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const Error = ({ text }: { text: string }) => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center space-y-2'>
      <div className='flex items-center'>
        <AlertCircle className='mr-2 h-6 w-6' />
        <span className='text-2xl font-semibold'>{text}</span>
      </div>
      <Link
        className={buttonVariants({ variant: 'default' })}
        href='/'
      >
        Go Home
      </Link>
    </div>
  );
};

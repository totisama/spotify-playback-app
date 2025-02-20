import { cn } from '@/shared/lib/utils';
import { type ReactNode } from 'react';

export const Section = ({
  title,
  children,
  customClass = '',
}: {
  title: string;
  children: ReactNode;
  customClass?: string;
}) => {
  return (
    <section className={cn('mb-8', customClass)}>
      <h2 className='mb-4 text-2xl font-bold'>{title}</h2>
      {children}
    </section>
  );
};

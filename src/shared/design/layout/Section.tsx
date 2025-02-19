import { type ReactNode } from 'react';

export const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <section className='mb-8'>
      <h2 className='mb-4 text-2xl font-bold'>{title}</h2>
      {children}
    </section>
  );
};

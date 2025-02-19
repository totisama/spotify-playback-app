'use client';

import { Input } from '@/shared/design/ui/input';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';

export const SearchInput = ({ delay = 500 }: { delay: number }) => {
  const [search, setSearch] = useState('');
  const value = useDebounce(search, delay);
  const router = useRouter();

  useEffect(() => {
    if (value === '') {
      return;
    }

    router.push(`/search/${value}`);
  }, [value, router]);

  return (
    <div className='w-full max-w-[500px]'>
      <Input
        placeholder='Search'
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

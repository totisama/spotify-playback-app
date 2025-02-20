import { Loader } from '@/shared/design/components/globals/Loader';

export default function Loading() {
  return (
    <div className='flex h-full items-center justify-center bg-foreground'>
      <Loader size='large' />
    </div>
  );
}

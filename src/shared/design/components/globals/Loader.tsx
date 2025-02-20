import { cn } from '@/shared/lib/utils';

type Size = 'small' | 'large';

export const SIZES = {
  small: 'h-12 w-12',
  large: 'w-60 h-60',
};

export const Loader = ({ size = 'small' }: { size?: Size }) => {
  const sizeClass = SIZES[size];

  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-spotify-green motion-reduce:animate-[spin_1.5s_linear_infinite]',
        sizeClass
      )}
      role='status'
    >
      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
        Loading...
      </span>
    </div>
  );
};

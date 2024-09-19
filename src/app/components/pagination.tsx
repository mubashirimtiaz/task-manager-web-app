'use client';

import { Button } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export interface PaginationComponentProps {
  total: number;
}
export default function PaginationComponent({
  total,
}: PaginationComponentProps) {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  const page = searchParams.get('page') || '1';

  const handlePagination = (e: React.MouseEvent<HTMLButtonElement>) => {
    const searchParams = new URLSearchParams(window.location.search);
    const name = e.currentTarget.name;

    if (name === 'previous') {
      const value = parseInt(page) - 1;
      searchParams.set('page', value.toString());
    } else {
      const value = parseInt(page) + 1;
      searchParams.set('page', value.toString());
    }

    const query = searchParams.toString();
    router.push(`${path}?${query}`);
  };

  return (
    <div className='flex gap-3 mt-5 justify-end'>
      <Button
        name='previous'
        variant='solid'
        color='primary'
        disabled={page === '1'}
        onClick={handlePagination}
      >
        Previous
      </Button>
      <Button
        name='next'
        type='submit'
        variant='solid'
        color='primary'
        disabled={parseInt(page) === Math.ceil(total / 10)}
        onClick={handlePagination}
      >
        Next
      </Button>
    </div>
  );
}

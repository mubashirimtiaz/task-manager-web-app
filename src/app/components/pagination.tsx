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

  const lastPage = parseInt(page) === Math.ceil(total / 10);
  const firstPage = page === '1';

  return (
    <div className='flex gap-3 mt-5 justify-end'>
      <Button
        name='previous'
        variant='solid'
        color={firstPage ? 'default' : 'primary'}
        disabled={firstPage}
        onClick={handlePagination}
      >
        Previous
      </Button>
      <Button
        name='next'
        type='submit'
        variant='solid'
        color={lastPage ? 'default' : 'primary'}
        disabled={lastPage}
        onClick={handlePagination}
      >
        Next
      </Button>
    </div>
  );
}

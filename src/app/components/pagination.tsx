'use client';

import { Button } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';

export interface PaginationComponentProps {
  total: number;
}
export default function PaginationComponent({
  total,
}: PaginationComponentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams.get('page') || '1';

  const handlePagination = (e: React.MouseEvent<HTMLButtonElement>) => {
    const sortBy = searchParams.get('sortBy') || '';
    const order = searchParams.get('order') || '';
    let query = '';
    const name = e.currentTarget.name;
    if (page) {
      if (name === 'previous') {
        query += `?page=${parseInt(page) - 1}`;
      } else {
        query += `?page=${parseInt(page) + 1}`;
      }
    }
    if (sortBy) {
      query += `&sortBy=${sortBy}`;
    }

    if (order) {
      query += `&order=${order}`;
    }
    router.push(`/tasks${query}`);
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

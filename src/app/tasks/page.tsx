import { getActiveTasks } from '@/actions/get-tasks';
import TableWrapperComponent from '../components/wrapper';

interface ListTaskPageProps {
  searchParams: {
    sortBy?: string;
    page?: string;
    order?: 'asc' | 'desc';
  };
}
export default async function ListTaskPage({
  searchParams,
}: ListTaskPageProps) {
  const page = searchParams.page || 1;
  const sortBy = searchParams.sortBy || '';
  const order = searchParams.order || '';

  let query = '';

  if (page) {
    query += `?page=${page}`;
  }
  if (sortBy) {
    query += `&sortBy=${sortBy}`;
  }

  if (order) {
    query += `&order=${order}`;
  }
  return (
    <div>
      <h1 className='text-2xl mb-3 text-foreground'>All Tasks</h1>
      <TableWrapperComponent fetchTasks={() => getActiveTasks(query)} />
    </div>
  );
}

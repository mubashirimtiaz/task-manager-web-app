import { getArchivedTasks } from '@/actions/get-tasks';
import TableWrapperComponent from '@/app/components/wrapper';

interface ListTaskPageProps {
  searchParams: {
    sortBy?: string;
    page?: string;
    order?: 'asc' | 'desc';
  };
}
export default async function ListArchiveTaskPage({
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
      <h1 className='text-2xl mb-3 text-foreground'>Archived Tasks</h1>
      <TableWrapperComponent fetchTasks={() => getArchivedTasks(query)} />;
    </div>
  );
}

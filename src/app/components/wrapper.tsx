import { Suspense } from 'react';
import { Task } from '../tasks/interface';

import TableComponent from './table';
import PaginationComponent from './pagination';

interface TableWrapperComponentProps {
  fetchTasks: () => Promise<{ tasks: Task[]; total: number }>;
}

export default async function TableWrapperComponent({
  fetchTasks,
}: TableWrapperComponentProps) {
  const { total, tasks } = await fetchTasks();
  return (
    <div>
      <TableComponent tasks={tasks} />
      <Suspense fallback={<div>Loading...</div>}>
        <PaginationComponent total={total} />
      </Suspense>
    </div>
  );
}

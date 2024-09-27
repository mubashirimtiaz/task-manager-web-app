'use client';
import { Chip } from '@nextui-org/react';
import { Task } from '../tasks/interface';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { updateTaskArchiveStatus } from '@/actions/update-task';
import FormButton from './form-button';

interface TableComponentProps {
  tasks: Task[];
}

export default function TableComponent({ tasks }: TableComponentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const order = searchParams.get('order') || '';

  const selectColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'primary';
      case 'medium':
        return 'warning';
      case 'high':
        return 'danger';
      default:
        return 'default';
    }
  };

  const handleSorting = () => {
    const searchParams = new URLSearchParams(window.location.search);

    if (!searchParams.has('sortBy')) {
      searchParams.set('sortBy', 'priority');
    }
    if (order === 'asc') {
      searchParams.set('order', 'desc');
    } else {
      searchParams.set('order', 'asc');
    }

    const query = searchParams.toString();

    router.push(`${path}?${query}`);
  };

  const handleSelection = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const taskId = e.currentTarget.dataset.taskId;
    if (taskId) {
      router.push(`/tasks/${taskId}`);
    }
  };
  return (
    <Table aria-label='Example static collection table'>
      <TableHeader>
        {/* <TableColumn key={'ID'}>ID</TableColumn> */}
        <TableColumn key={'Title'}>Title</TableColumn>
        <TableColumn
          key={'Priority'}
          onClick={handleSorting}
          className='cursor-pointer'
        >
          Priority <span>{order === 'asc' ? '🔼' : '🔽'}</span>
        </TableColumn>
        <TableColumn key={'Created at'}>Created at</TableColumn>
        <TableColumn key={'Action'}>Action</TableColumn>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow
            key={task._id}
            onClick={handleSelection}
            data-task-id={`${task._id}`}
            className='cursor-pointer hover:bg-gray-100'
          >
            {/* <TableCell>{task._id}</TableCell> */}
            <TableCell>{task.title}</TableCell>
            <TableCell>
              <Chip color={selectColor(task.priority)}>{task.priority}</Chip>
            </TableCell>
            <TableCell>{new Date(task.createdAt).toDateString()}</TableCell>
            <TableCell
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <form
                action={updateTaskArchiveStatus.bind(null, {
                  id: task._id,
                  archived: !task.archived,
                })}
              >
                <FormButton text={task.archived ? 'Unarchive' : 'Archive'} />
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

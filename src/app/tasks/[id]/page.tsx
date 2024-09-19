import { getTaskById } from '@/actions/get-task';
import UpdateTaskForm from '@/app/components/form/update-task-form';
import { notFound } from 'next/navigation';

interface UpdateTaskPageProps {
  params: { id: string };
}

export default async function UpdateTaskPage({ params }: UpdateTaskPageProps) {
  const task = await getTaskById(params.id);
  if (!task) {
    notFound();
  }
  return <UpdateTaskForm task={task} />;
}

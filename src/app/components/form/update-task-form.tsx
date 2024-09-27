'use client';

import { Chip, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import FormButton from '../form-button';
import { updateTask } from '@/actions/update-task';
import { useFormState } from 'react-dom';
import { Task } from '@/app/tasks/interface';

interface FormProps {
  task: Task;
}
export default function UpdateTaskForm({ task }: FormProps) {
  const [formState, action] = useFormState(updateTask.bind(null, task._id), {
    errors: {},
  });
  const title = task?.title;
  const description = task?.description;
  const priority = task?.priority;
  return (
    <div className='max-w-md mx-auto m-10'>
      <form className='flex flex-col gap-5' action={action}>
        <Input
          label='Title'
          labelPlacement='outside'
          type='text'
          name='title'
          defaultValue={title}
          isInvalid={!!formState.errors?.title}
          errorMessage={formState.errors.title?.join(', ')}
        />

        <Textarea
          label='Description'
          labelPlacement='outside'
          name='description'
          defaultValue={description}
          isInvalid={!!formState.errors?.description}
          errorMessage={formState.errors.description?.join(', ')}
        />
        <Select
          label='Priority'
          labelPlacement='outside'
          name='priority'
          isInvalid={!!formState.errors?.priority}
          errorMessage={formState.errors.priority?.join(', ')}
          defaultSelectedKeys={[priority]}
        >
          <SelectItem
            key='low'
            value='low'
            startContent={<Chip color='primary' className='rounded' />}
          >
            Low
          </SelectItem>
          <SelectItem
            key='medium'
            value='medium'
            startContent={<Chip color='warning' className='rounded' />}
          >
            Medium
          </SelectItem>
          <SelectItem
            key='high'
            value='high'
            startContent={<Chip color='danger' className='rounded' />}
          >
            High
          </SelectItem>
        </Select>
        <FormButton text='Save' size='md' />
      </form>
    </div>
  );
}

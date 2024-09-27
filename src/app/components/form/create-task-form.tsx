'use client';

import { Chip, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import FormButton from '../form-button';
import { useFormState } from 'react-dom';
import { createTask } from '@/actions/create-task';

export default function CreateTaskForm() {
  const [formState, action] = useFormState(createTask, {
    errors: {},
  });

  return (
    <div className='max-w-md mx-auto m-10'>
      <form className='flex flex-col gap-5' action={action}>
        <Input
          label='Title'
          labelPlacement='outside'
          type='text'
          name='title'
          defaultValue=''
          placeholder='Task title'
          isInvalid={!!formState.errors?.title}
          errorMessage={formState.errors.title?.join(', ')}
        />

        <Textarea
          label='Description'
          labelPlacement='outside'
          name='description'
          defaultValue=''
          placeholder='Task description'
          isInvalid={!!formState.errors?.description}
          errorMessage={formState.errors.description?.join(', ')}
        />
        <Select
          label='Priority'
          labelPlacement='outside'
          name='priority'
          isInvalid={!!formState.errors?.priority}
          errorMessage={formState.errors.priority?.join(', ')}
          defaultSelectedKeys={['low']}
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
        <FormButton text='Create' size='md' />
      </form>
    </div>
  );
}

'use client';
import { Button } from '@nextui-org/react';
import { useFormStatus } from 'react-dom';
interface FormButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
}
export default function FormButton(props: FormButtonProps) {
  const status = useFormStatus();
  return (
    <Button
      type='submit'
      size='sm'
      isLoading={status.pending}
      variant='bordered'
      className='min-w-[120px]'
      {...props}
    >
      {props.text}
    </Button>
  );
}

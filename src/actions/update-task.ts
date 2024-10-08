'use server';

import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';
import { z } from 'zod';

const updateTaskSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  priority: z.enum(['low', 'medium', 'high']),
});

interface UpdateTaskMessages {
  errors: {
    title?: string[];
    description?: string[];
    priority?: string[];
    _form?: string[];
  };
}

export async function updateTask(
  id: string,
  formStatus: UpdateTaskMessages,
  formData: FormData
): Promise<UpdateTaskMessages> {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const priority = formData.get('priority') as string;

  const result = updateTaskSchema.safeParse({
    title,
    description,
    priority,
  });

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return {
      errors,
    };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        priority,
      }),
    });

    if (response.status === 404) {
      notFound();
    }

    if (!response.ok) {
      throw new Error('Failed to update task');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message !== 'NEXT_NOT_FOUND') {
        throw error;
      }
    } else {
      throw new Error('Failed to update task');
    }
  }

  revalidatePath('/tasks');
  revalidatePath('/tasks/archived');
  redirect('/tasks');
}

export async function updateTaskArchiveStatus({
  id,
  archived,
}: {
  id: string;
  archived: boolean;
}) {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        archived,
      }),
    });

    if (response.status === 404) {
      notFound();
    }

    if (!response.ok) {
      throw new Error('Failed to update task');
    }

    const tasks = await response.json();

    revalidatePath('/tasks');
    revalidatePath('/tasks/archived');

    return tasks.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message !== 'NEXT_NOT_FOUND') {
        throw error;
      }
    } else {
      throw new Error('Failed to update task');
    }
  }
}

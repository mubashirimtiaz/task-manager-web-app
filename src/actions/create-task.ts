'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createTaskSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  priority: z.enum(['low', 'medium', 'high']),
});

interface CreateTaskMessages {
  errors: {
    title?: string[];
    description?: string[];
    priority?: string[];
    _form?: string[];
  };
}

export async function createTask(
  formStatus: CreateTaskMessages,
  formData: FormData
): Promise<CreateTaskMessages> {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const priority = formData.get('priority') as string;

  const result = createTaskSchema.safeParse({
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
    const response = await fetch(`${process.env.API_URL}/api/v1/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        priority,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to create task');
    }
  }

  revalidatePath('/tasks');
  revalidatePath('/tasks/archived');
  redirect('/tasks');
}

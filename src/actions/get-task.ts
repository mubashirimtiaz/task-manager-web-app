'use server';

import { notFound } from 'next/navigation';
import { Task } from '@/app/tasks/interface';

interface ApiResponse {
  data: Task;
  error?: boolean;
  message: string;
  statusCode: number;
}

export async function getTaskById(id: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/tasks/${id}`, {
      cache: 'no-cache',
    });

    if (response.status === 404) {
      notFound();
    }
    const tasks: ApiResponse = await response.json();

    if (tasks.error) {
      throw new Error(tasks.message);
    }

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

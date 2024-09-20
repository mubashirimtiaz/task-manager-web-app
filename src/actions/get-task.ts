'use server';

import { notFound } from 'next/navigation';

export async function getTaskById(id: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/tasks/${id}`, {
      cache: 'no-cache',
    });

    if (response.status === 404) {
      notFound();
    }

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    const tasks = await response.json();

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

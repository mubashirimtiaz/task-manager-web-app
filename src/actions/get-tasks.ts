'use server';

import { Task } from '@/app/tasks/interface';

interface ApiResponse {
  data: { tasks: Task[]; total: number };
  error?: boolean;
  message: string;
  statusCode: number;
}

export async function getActiveTasks(query: string) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/tasks${query}`,
      {
        cache: 'no-cache',
      }
    );

    const tasks: ApiResponse = await response.json();

    if (tasks.error) {
      throw new Error(tasks.message);
    }

    return tasks.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to fetch tasks');
    }
  }
}

export async function getArchivedTasks(query: string) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/tasks/archived${query}`,
      {
        cache: 'no-cache',
      }
    );

    const tasks: ApiResponse = await response.json();

    if (tasks.error) {
      throw new Error(tasks.message);
    }
    return tasks.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to fetch tasks');
    }
  }
}

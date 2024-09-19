'use server';

export async function getTaskById(id: string) {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/tasks/${id}`, {
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    const tasks = await response.json();

    return tasks.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to update task');
    }
  }
}

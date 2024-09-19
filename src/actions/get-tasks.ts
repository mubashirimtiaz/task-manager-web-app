'use server';

export async function getActiveTasks(query: string) {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/tasks${query}`);

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    const tasks = await response.json();
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
      `http://localhost:8000/api/v1/tasks/archived${query}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    const tasks = await response.json();
    return tasks.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to fetch tasks');
    }
  }
}

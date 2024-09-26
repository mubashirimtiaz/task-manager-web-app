'use client';

interface TasksErrorPageProps {
  error: Error & { digest?: string };
}

export default function TasksErrorPage({ error }: TasksErrorPageProps) {
  if (error.message) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Something went wrong. Please try again later.</h1>
    </div>
  );
}

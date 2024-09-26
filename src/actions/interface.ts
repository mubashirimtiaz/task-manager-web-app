import { Task } from '@/app/tasks/interface';

export interface ApiResponse {
  data: { tasks: Task[]; total: number };
  error?: boolean;
  message: string;
  statusCode: number;
}

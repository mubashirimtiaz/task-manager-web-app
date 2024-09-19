export interface Task {
  _id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  description: string;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

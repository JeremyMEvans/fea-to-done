import { Tag } from './tag';

export interface TaskInterface {
  id: number;
  img?: string;
  title: string;
  tags: Array<Tag>;
  description?: string;
  notes?: string;
  due: number;
  isCompleted: boolean;
}

export class Task implements TaskInterface {
  id: number;
  img?: string;
  title: string;
  tags: Array<Tag> = [];
  description?: string;
  notes?: string;
  due: number = Date.now();
  isCompleted = false;
}

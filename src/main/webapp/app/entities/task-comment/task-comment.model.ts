import { ITask } from 'app/entities/task/task.model';

export interface ITaskComment {
  id?: number;
  value?: string;
  task?: ITask;
}

export class TaskComment implements ITaskComment {
  constructor(public id?: number, public value?: string, public task?: ITask) {}
}

export function getTaskCommentIdentifier(taskComment: ITaskComment): number | undefined {
  return taskComment.id;
}

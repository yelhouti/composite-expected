import { IUser } from 'app/entities/user/user.model';
import { IEmployeeSkill } from 'app/entities/employee-skill/employee-skill.model';
import { TaskType } from 'app/entities/enumerations/task-type.model';

export interface ITask {
  id?: number;
  name?: string;
  type?: TaskType;
  endDate?: Date | null;
  createdAt?: Date;
  modifiedAt?: Date;
  done?: boolean;
  description?: string;
  attachmentContentType?: string;
  attachment?: string;
  pictureContentType?: string;
  picture?: string;
  user?: IUser;
  employeeSkills?: IEmployeeSkill[] | null;
}

export class Task implements ITask {
  constructor(
    public id?: number,
    public name?: string,
    public type?: TaskType,
    public endDate?: Date | null,
    public createdAt?: Date,
    public modifiedAt?: Date,
    public done?: boolean,
    public description?: string,
    public attachmentContentType?: string,
    public attachment?: string,
    public pictureContentType?: string,
    public picture?: string,
    public user?: IUser,
    public employeeSkills?: IEmployeeSkill[] | null
  ) {}
}

export function getTaskIdentifier(task: ITask): number | undefined {
  return task.id;
}

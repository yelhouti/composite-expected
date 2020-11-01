import * as dayjs from 'dayjs';
import { IUser } from 'app/core/user/user.model';
import { IEmployeeSkill } from 'app/shared/model/employee-skill.model';
import { TaskType } from 'app/shared/model/enumerations/task-type.model';

export interface ITask {
  id?: number;
  name?: string;
  type?: TaskType;
  endDate?: dayjs.Dayjs;
  createdAt?: dayjs.Dayjs;
  modifiedAt?: dayjs.Dayjs;
  done?: boolean;
  description?: string;
  attachmentContentType?: string;
  attachment?: string;
  pictureContentType?: string;
  picture?: string;
  user?: IUser;
  employeeSkills?: IEmployeeSkill[];
}

export class Task implements ITask {
  constructor(
    public id?: number,
    public name?: string,
    public type?: TaskType,
    public endDate?: dayjs.Dayjs,
    public createdAt?: dayjs.Dayjs,
    public modifiedAt?: dayjs.Dayjs,
    public done?: boolean,
    public description?: string,
    public attachmentContentType?: string,
    public attachment?: string,
    public pictureContentType?: string,
    public picture?: string,
    public user?: IUser,
    public employeeSkills?: IEmployeeSkill[]
  ) {
    this.done = this.done ?? false;
  }
}

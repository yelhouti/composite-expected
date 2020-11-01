import { IEmployeeSkill } from 'app/shared/model/employee-skill.model';

export interface IEmployee {
  id?: string;
  fullname?: string;
  teamMembers?: IEmployee[];
  skills?: IEmployeeSkill[];
  taughtSkills?: IEmployeeSkill[];
  manager?: IEmployee;
}

export class Employee implements IEmployee {
  constructor(
    public id?: string,
    public fullname?: string,
    public teamMembers?: IEmployee[],
    public skills?: IEmployeeSkill[],
    public taughtSkills?: IEmployeeSkill[],
    public manager?: IEmployee
  ) {}
}

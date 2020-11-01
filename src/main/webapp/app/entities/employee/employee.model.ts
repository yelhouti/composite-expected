import { IEmployeeSkill } from 'app/entities/employee-skill/employee-skill.model';

export interface IEmployee {
  username?: string;
  fullname?: string;
  teamMembers?: IEmployee[] | null;
  skills?: IEmployeeSkill[] | null;
  taughtSkills?: IEmployeeSkill[] | null;
  manager?: IEmployee | null;
}

export class Employee implements IEmployee {
  constructor(
    public username?: string,
    public fullname?: string,
    public teamMembers?: IEmployee[] | null,
    public skills?: IEmployeeSkill[] | null,
    public taughtSkills?: IEmployeeSkill[] | null,
    public manager?: IEmployee | null
  ) {}
}

export function getEmployeeIdentifier(employee: IEmployee): string | undefined {
  return employee.username;
}

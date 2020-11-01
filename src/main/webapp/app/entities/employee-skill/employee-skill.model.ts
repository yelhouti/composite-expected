import { IEmployeeSkillCertificate } from 'app/entities/employee-skill-certificate/employee-skill-certificate.model';
import { ITask } from 'app/entities/task/task.model';
import { IEmployee } from 'app/entities/employee/employee.model';

export interface IEmployeeSkill {
  id?: number;
  name?: string;
  level?: number;
  employeeSkillCertificates?: IEmployeeSkillCertificate[] | null;
  tasks?: ITask[] | null;
  employee?: IEmployee;
  teacher?: IEmployee;
}

export class EmployeeSkill implements IEmployeeSkill {
  constructor(
    public id?: number,
    public name?: string,
    public level?: number,
    public employeeSkillCertificates?: IEmployeeSkillCertificate[] | null,
    public tasks?: ITask[] | null,
    public employee?: IEmployee,
    public teacher?: IEmployee
  ) {}
}

export function getEmployeeSkillIdentifier(employeeSkill: IEmployeeSkill): number | undefined {
  return employeeSkill.id;
}

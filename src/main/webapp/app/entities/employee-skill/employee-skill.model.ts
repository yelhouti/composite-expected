import { IEmployeeSkillCertificate } from 'app/entities/employee-skill-certificate/employee-skill-certificate.model';
import { ITask } from 'app/entities/task/task.model';
import { IEmployee } from 'app/entities/employee/employee.model';

export interface IEmployeeSkill {
  name?: string;
  level?: number;
  employeeSkillCertificates?: IEmployeeSkillCertificate[] | null;
  tasks?: ITask[] | null;
  employee?: IEmployee;
  teacher?: IEmployee;
}

export class EmployeeSkill implements IEmployeeSkill {
  constructor(
    public name?: string,
    public level?: number,
    public employeeSkillCertificates?: IEmployeeSkillCertificate[] | null,
    public tasks?: ITask[] | null,
    public employee?: IEmployee,
    public teacher?: IEmployee
  ) {}
}

export function getEmployeeSkillIdentifier(employeeSkill: IEmployeeSkill): string | undefined {
  return !employeeSkill.name || !employeeSkill.employee?.username
    ? undefined
    : `name=${employeeSkill.name};employeeUsername=${employeeSkill.employee.username}`;
}

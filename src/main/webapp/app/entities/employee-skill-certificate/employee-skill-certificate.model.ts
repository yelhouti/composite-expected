import * as dayjs from 'dayjs';
import { ICertificateType } from 'app/entities/certificate-type/certificate-type.model';
import { IEmployeeSkill } from 'app/entities/employee-skill/employee-skill.model';

export interface IEmployeeSkillCertificate {
  id?: number;
  grade?: number;
  date?: dayjs.Dayjs;
  type?: ICertificateType;
  skill?: IEmployeeSkill;
}

export class EmployeeSkillCertificate implements IEmployeeSkillCertificate {
  constructor(
    public id?: number,
    public grade?: number,
    public date?: dayjs.Dayjs,
    public type?: ICertificateType,
    public skill?: IEmployeeSkill
  ) {}
}

export function getEmployeeSkillCertificateIdentifier(employeeSkillCertificate: IEmployeeSkillCertificate): number | undefined {
  return employeeSkillCertificate.id;
}

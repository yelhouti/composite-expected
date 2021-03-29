import { IEmployeeSkillCertificateDetails } from 'app/entities/employee-skill-certificate-details/employee-skill-certificate-details.model';
import { ICertificateType } from 'app/entities/certificate-type/certificate-type.model';
import { IEmployeeSkill } from 'app/entities/employee-skill/employee-skill.model';

export interface IEmployeeSkillCertificate {
  grade?: number;
  date?: Date;
  employeeSkillCertificateDetails?: IEmployeeSkillCertificateDetails | null;
  type?: ICertificateType;
  skill?: IEmployeeSkill;
}

export class EmployeeSkillCertificate implements IEmployeeSkillCertificate {
  constructor(
    public grade?: number,
    public date?: Date,
    public employeeSkillCertificateDetails?: IEmployeeSkillCertificateDetails | null,
    public type?: ICertificateType,
    public skill?: IEmployeeSkill
  ) {}
}

export function getEmployeeSkillCertificateIdentifier(employeeSkillCertificate: IEmployeeSkillCertificate): string | undefined {
  return !employeeSkillCertificate.type?.id || !employeeSkillCertificate.skill?.name || !employeeSkillCertificate.skill.employee?.username
    ? undefined
    : `typeId=${employeeSkillCertificate.type.id};skillName=${employeeSkillCertificate.skill.name};skillEmployeeUsername=${employeeSkillCertificate.skill.employee.username}`;
}

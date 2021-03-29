import { IEmployeeSkillCertificate } from 'app/entities/employee-skill-certificate/employee-skill-certificate.model';

export interface IEmployeeSkillCertificateDetails {
  detail?: string;
  employeeSkillCertificate?: IEmployeeSkillCertificate | null;
}

export class EmployeeSkillCertificateDetails implements IEmployeeSkillCertificateDetails {
  constructor(public detail?: string, public employeeSkillCertificate?: IEmployeeSkillCertificate | null) {}
}

export function getEmployeeSkillCertificateDetailsIdentifier(
  employeeSkillCertificateDetails: IEmployeeSkillCertificateDetails
): string | undefined {
  return !employeeSkillCertificateDetails.employeeSkillCertificate?.type?.id ||
    !employeeSkillCertificateDetails.employeeSkillCertificate.skill?.name ||
    !employeeSkillCertificateDetails.employeeSkillCertificate.skill.employee?.username
    ? undefined
    : `typeId=${employeeSkillCertificateDetails.employeeSkillCertificate.type.id};skillName=${employeeSkillCertificateDetails.employeeSkillCertificate.skill.name};skillEmployeeUsername=${employeeSkillCertificateDetails.employeeSkillCertificate.skill.employee.username}`;
}

import { IEmployeeSkillCertificate } from 'app/entities/employee-skill-certificate/employee-skill-certificate.model';

export interface ICertificateType {
  id?: number;
  name?: string;
  employeeSkillCertificates?: IEmployeeSkillCertificate[] | null;
}

export class CertificateType implements ICertificateType {
  constructor(public id?: number, public name?: string, public employeeSkillCertificates?: IEmployeeSkillCertificate[] | null) {}
}

export function getCertificateTypeIdentifier(certificateType: ICertificateType): number | undefined {
  return certificateType.id;
}

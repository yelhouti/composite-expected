import * as dayjs from 'dayjs';
import { ICertificateType } from 'app/shared/model/certificate-type.model';
import { IEmployeeSkill } from 'app/shared/model/employee-skill.model';

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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployeeSkillCertificateDetails } from '../employee-skill-certificate-details.model';

@Component({
  selector: 'jhi-employee-skill-certificate-details-detail',
  templateUrl: './employee-skill-certificate-details-detail.component.html',
})
export class EmployeeSkillCertificateDetailsDetailComponent implements OnInit {
  employeeSkillCertificateDetails: IEmployeeSkillCertificateDetails | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employeeSkillCertificateDetails }) => {
      this.employeeSkillCertificateDetails = employeeSkillCertificateDetails;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

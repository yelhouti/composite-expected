import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmployeeSkillCertificate } from '../employee-skill-certificate.model';

import { EmployeeSkillCertificateDetailComponent } from './employee-skill-certificate-detail.component';

describe('Component Tests', () => {
  describe('EmployeeSkillCertificate Management Detail Component', () => {
    let comp: EmployeeSkillCertificateDetailComponent;
    let fixture: ComponentFixture<EmployeeSkillCertificateDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [EmployeeSkillCertificateDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ employeeSkillCertificate: new EmployeeSkillCertificate(123) }) },
          },
        ],
      })
        .overrideTemplate(EmployeeSkillCertificateDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmployeeSkillCertificateDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load employeeSkillCertificate on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.employeeSkillCertificate).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

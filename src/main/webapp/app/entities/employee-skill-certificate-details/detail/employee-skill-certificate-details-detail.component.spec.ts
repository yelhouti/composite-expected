import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmployeeSkillCertificateDetailsDetailComponent } from './employee-skill-certificate-details-detail.component';

describe('Component Tests', () => {
  describe('EmployeeSkillCertificateDetails Management Detail Component', () => {
    let comp: EmployeeSkillCertificateDetailsDetailComponent;
    let fixture: ComponentFixture<EmployeeSkillCertificateDetailsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [EmployeeSkillCertificateDetailsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                employeeSkillCertificateDetails: {
                  employeeSkillCertificate: { type: { id: 123 }, skill: { name: 'ABC', employee: { username: 'ABC' } } },
                },
              }),
            },
          },
        ],
      })
        .overrideTemplate(EmployeeSkillCertificateDetailsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmployeeSkillCertificateDetailsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load employeeSkillCertificateDetails on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.employeeSkillCertificateDetails).toEqual(
          jasmine.objectContaining({
            employeeSkillCertificate: { type: { id: 123 }, skill: { name: 'ABC', employee: { username: 'ABC' } } },
          })
        );
      });
    });
  });
});

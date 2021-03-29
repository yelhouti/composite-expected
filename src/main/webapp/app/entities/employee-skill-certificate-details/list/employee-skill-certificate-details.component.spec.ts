jest.mock('@ngx-translate/core');

import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Confirmation, ConfirmationService, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

import { EmployeeSkillCertificateDetailsComponent } from './employee-skill-certificate-details.component';
import { EmployeeSkillCertificateDetailsService } from '../service/employee-skill-certificate-details.service';

describe('Component Tests', () => {
  describe('EmployeeSkillCertificateDetails Management Component', () => {
    let comp: EmployeeSkillCertificateDetailsComponent;
    let fixture: ComponentFixture<EmployeeSkillCertificateDetailsComponent>;
    let service: EmployeeSkillCertificateDetailsService;
    let confirmationService: ConfirmationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EmployeeSkillCertificateDetailsComponent],
        providers: [ConfirmationService, MessageService, TranslateService, DatePipe],
      })
        .overrideTemplate(EmployeeSkillCertificateDetailsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeSkillCertificateDetailsComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EmployeeSkillCertificateDetailsService);
      confirmationService = fixture.debugElement.injector.get(ConfirmationService);
    });

    it('Should call load all on init', fakeAsync(() => {
      // GIVEN
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ employeeSkillCertificate: { type: { id: 123 }, skill: { name: 'ABC', employee: { username: 'ABC' } } } }],
          })
        )
      );

      // WHEN
      fixture.detectChanges();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.employeeSkillCertificateDetails?.[0]).toEqual(
        jasmine.objectContaining({ employeeSkillCertificate: { type: { id: 123 }, skill: { name: 'ABC', employee: { username: 'ABC' } } } })
      );
    }));

    it('should call delete service using confirmDialog', fakeAsync(() => {
      // GIVEN
      spyOn(service, 'delete').and.returnValue(of({}));
      spyOn(confirmationService, 'confirm').and.callFake((confirmation: Confirmation) => {
        if (confirmation.accept) {
          confirmation.accept();
        }
      });

      // WHEN
      comp.delete(123, 'ABC', 'ABC');

      // THEN
      expect(confirmationService.confirm).toHaveBeenCalled();
      expect(service.delete).toHaveBeenCalledWith(123, 'ABC', 'ABC');
    }));
  });
});

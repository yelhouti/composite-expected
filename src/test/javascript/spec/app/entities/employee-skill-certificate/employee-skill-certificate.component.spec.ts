jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { EmployeeSkillCertificateComponent } from 'app/entities/employee-skill-certificate/employee-skill-certificate.component';
import { EmployeeSkillCertificateService } from 'app/entities/employee-skill-certificate/employee-skill-certificate.service';

describe('Component Tests', () => {
  describe('EmployeeSkillCertificate Management Component', () => {
    let comp: EmployeeSkillCertificateComponent;
    let fixture: ComponentFixture<EmployeeSkillCertificateComponent>;
    let service: EmployeeSkillCertificateService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EmployeeSkillCertificateComponent],
        providers: [
          Router,
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: '',
              }),
              queryParamMap: of(
                jest.requireActual('@angular/router').convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: '',
                })
              ),
            },
          },
        ],
      })
        .overrideTemplate(EmployeeSkillCertificateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeSkillCertificateComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EmployeeSkillCertificateService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ type: { id: 123 }, skill: { name: "'123'", employee: { username: "'123'" } } }],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.employeeSkillCertificates?.[0]).toEqual(
        jasmine.objectContaining({ type: { id: 123 }, skill: { name: "'123'", employee: { username: "'123'" } } })
      );
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ type: { id: 123 }, skill: { name: "'123'", employee: { username: "'123'" } } }],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.employeeSkillCertificates?.[0]).toEqual(
        jasmine.objectContaining({ type: { id: 123 }, skill: { name: "'123'", employee: { username: "'123'" } } })
      );
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual([]);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';
      comp.ascending = false;

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc']);
    });
  });
});

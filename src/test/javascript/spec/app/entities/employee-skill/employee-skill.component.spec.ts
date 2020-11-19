jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { EmployeeSkillComponent } from 'app/entities/employee-skill/employee-skill.component';
import { EmployeeSkillService } from 'app/entities/employee-skill/employee-skill.service';

describe('Component Tests', () => {
  describe('EmployeeSkill Management Component', () => {
    let comp: EmployeeSkillComponent;
    let fixture: ComponentFixture<EmployeeSkillComponent>;
    let service: EmployeeSkillService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EmployeeSkillComponent],
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
        .overrideTemplate(EmployeeSkillComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeSkillComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EmployeeSkillService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ name: "'123'", employee: { username: "'123'" } }],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.employeeSkills?.[0]).toEqual(jasmine.objectContaining({ name: "'123'", employee: { username: "'123'" } }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ name: "'123'", employee: { username: "'123'" } }],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.employeeSkills?.[0]).toEqual(jasmine.objectContaining({ name: "'123'", employee: { username: "'123'" } }));
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

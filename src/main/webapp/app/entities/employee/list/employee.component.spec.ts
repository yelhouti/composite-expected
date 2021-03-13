jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { EmployeeService } from '../service/employee.service';

import { EmployeeComponent } from './employee.component';

describe('Component Tests', () => {
  describe('Employee Management Component', () => {
    let comp: EmployeeComponent;
    let fixture: ComponentFixture<EmployeeComponent>;
    let service: EmployeeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EmployeeComponent],
        providers: [
          Router,
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: 'username,asc'
              }),
              queryParamMap: of(
                jest.requireActual('@angular/router').convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: 'username,desc'
                })
              )
            }
          }
        ]
      })
        .overrideTemplate(EmployeeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EmployeeService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ username: 'ABC' }],
            headers
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.employees?.[0]).toEqual(jasmine.objectContaining({ username: 'ABC' }));
    });

    it('should load a page', () => {
      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.employees?.[0]).toEqual(jasmine.objectContaining({ username: 'ABC' }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalledWith(expect.objectContaining({ sort: ['username,desc'] }));
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,desc', 'username'] }));
    });
  });
});

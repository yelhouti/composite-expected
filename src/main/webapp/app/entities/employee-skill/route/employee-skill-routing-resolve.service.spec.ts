jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IEmployeeSkill } from '../employee-skill.model';
import { EmployeeSkillService } from '../service/employee-skill.service';

import { EmployeeSkillRoutingResolveService } from './employee-skill-routing-resolve.service';

describe('Service Tests', () => {
  describe('EmployeeSkill routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: EmployeeSkillRoutingResolveService;
    let service: EmployeeSkillService;
    let resultEmployeeSkill: IEmployeeSkill | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(EmployeeSkillRoutingResolveService);
      service = TestBed.inject(EmployeeSkillService);
      resultEmployeeSkill = null;
    });

    describe('resolve', () => {
      it('should return IEmployeeSkill returned by find', () => {
        // GIVEN
        service.find = jest.fn(() => of(new HttpResponse({ body: { name: 'ABC', employee: { username: 'ABC' } } })));
        mockActivatedRouteSnapshot.params = { name: 'ABC', employeeUsername: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeSkill = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC', 'ABC');
        expect(resultEmployeeSkill).toEqual({ name: 'ABC', employee: { username: 'ABC' } });
      });

      it('should return null if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeSkill = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultEmployeeSkill).toEqual(null);
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { name: 'ABC', employeeUsername: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeSkill = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC', 'ABC');
        expect(resultEmployeeSkill).toEqual(null);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

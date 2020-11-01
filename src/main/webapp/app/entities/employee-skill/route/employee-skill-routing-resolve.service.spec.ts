jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IEmployeeSkill, EmployeeSkill } from '../employee-skill.model';
import { EmployeeSkillService } from '../service/employee-skill.service';

import { EmployeeSkillRoutingResolveService } from './employee-skill-routing-resolve.service';

describe('Service Tests', () => {
  describe('EmployeeSkill routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: EmployeeSkillRoutingResolveService;
    let service: EmployeeSkillService;
    let resultEmployeeSkill: IEmployeeSkill | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot]
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(EmployeeSkillRoutingResolveService);
      service = TestBed.inject(EmployeeSkillService);
      resultEmployeeSkill = undefined;
    });

    describe('resolve', () => {
      it('should return IEmployeeSkill returned by find', () => {
        // GIVEN
        service.find = jest.fn(name => of(new HttpResponse({ body: { name } })));
        mockActivatedRouteSnapshot.params = { name: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeSkill = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultEmployeeSkill).toEqual({ name: 'ABC' });
      });

      it('should return new IEmployeeSkill if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeSkill = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultEmployeeSkill).toEqual(new EmployeeSkill());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { name: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeSkill = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultEmployeeSkill).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

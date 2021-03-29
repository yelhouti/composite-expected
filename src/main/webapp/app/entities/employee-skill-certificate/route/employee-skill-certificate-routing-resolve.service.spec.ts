jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';
import { DatePipe } from '@angular/common';

import { IEmployeeSkillCertificate } from '../employee-skill-certificate.model';
import { EmployeeSkillCertificateService } from '../service/employee-skill-certificate.service';

import { EmployeeSkillCertificateRoutingResolveService } from './employee-skill-certificate-routing-resolve.service';

describe('Service Tests', () => {
  describe('EmployeeSkillCertificate routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: EmployeeSkillCertificateRoutingResolveService;
    let service: EmployeeSkillCertificateService;
    let resultEmployeeSkillCertificate: IEmployeeSkillCertificate | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot, DatePipe],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(EmployeeSkillCertificateRoutingResolveService);
      service = TestBed.inject(EmployeeSkillCertificateService);
      resultEmployeeSkillCertificate = null;
    });

    describe('resolve', () => {
      it('should return IEmployeeSkillCertificate returned by find', () => {
        // GIVEN
        service.find = jest.fn(() =>
          of(new HttpResponse({ body: { type: { id: 123 }, skill: { name: 'ABC', employee: { username: 'ABC' } } } }))
        );
        mockActivatedRouteSnapshot.params = { typeId: 123, skillName: 'ABC', skillEmployeeUsername: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeSkillCertificate = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123, 'ABC', 'ABC');
        expect(resultEmployeeSkillCertificate).toEqual({ type: { id: 123 }, skill: { name: 'ABC', employee: { username: 'ABC' } } });
      });

      it('should return null if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeSkillCertificate = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultEmployeeSkillCertificate).toEqual(null);
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { typeId: 123, skillName: 'ABC', skillEmployeeUsername: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeSkillCertificate = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123, 'ABC', 'ABC');
        expect(resultEmployeeSkillCertificate).toEqual(null);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

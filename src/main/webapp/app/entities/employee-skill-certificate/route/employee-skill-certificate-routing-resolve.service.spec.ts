jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IEmployeeSkillCertificate, EmployeeSkillCertificate } from '../employee-skill-certificate.model';
import { EmployeeSkillCertificateService } from '../service/employee-skill-certificate.service';

import { EmployeeSkillCertificateRoutingResolveService } from './employee-skill-certificate-routing-resolve.service';

describe('Service Tests', () => {
  describe('EmployeeSkillCertificate routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: EmployeeSkillCertificateRoutingResolveService;
    let service: EmployeeSkillCertificateService;
    let resultEmployeeSkillCertificate: IEmployeeSkillCertificate | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(EmployeeSkillCertificateRoutingResolveService);
      service = TestBed.inject(EmployeeSkillCertificateService);
      resultEmployeeSkillCertificate = undefined;
    });

    describe('resolve', () => {
      it('should return existing IEmployeeSkillCertificate for existing id', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: new EmployeeSkillCertificate(id) })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeSkillCertificate = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEmployeeSkillCertificate).toEqual(new EmployeeSkillCertificate(123));
      });

      it('should return new IEmployeeSkillCertificate if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeSkillCertificate = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultEmployeeSkillCertificate).toEqual(new EmployeeSkillCertificate());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeSkillCertificate = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEmployeeSkillCertificate).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IEmployeeSkillCertificateDetails } from '../employee-skill-certificate-details.model';
import { EmployeeSkillCertificateDetailsService } from '../service/employee-skill-certificate-details.service';

import { EmployeeSkillCertificateDetailsRoutingResolveService } from './employee-skill-certificate-details-routing-resolve.service';

describe('Service Tests', () => {
  describe('EmployeeSkillCertificateDetails routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: EmployeeSkillCertificateDetailsRoutingResolveService;
    let service: EmployeeSkillCertificateDetailsService;
    let resultEmployeeSkillCertificateDetails: IEmployeeSkillCertificateDetails | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(EmployeeSkillCertificateDetailsRoutingResolveService);
      service = TestBed.inject(EmployeeSkillCertificateDetailsService);
      resultEmployeeSkillCertificateDetails = null;
    });

    describe('resolve', () => {
      it('should return IEmployeeSkillCertificateDetails returned by find', () => {
        // GIVEN
        service.find = jest.fn(() =>
          of(
            new HttpResponse({
              body: { employeeSkillCertificate: { type: { id: 123 }, skill: { name: 'ABC', employee: { username: 'ABC' } } } },
            })
          )
        );
        mockActivatedRouteSnapshot.params = { typeId: 123, skillName: 'ABC', skillEmployeeUsername: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeSkillCertificateDetails = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123, 'ABC', 'ABC');
        expect(resultEmployeeSkillCertificateDetails).toEqual({
          employeeSkillCertificate: { type: { id: 123 }, skill: { name: 'ABC', employee: { username: 'ABC' } } },
        });
      });

      it('should return null if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeSkillCertificateDetails = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultEmployeeSkillCertificateDetails).toEqual(null);
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { typeId: 123, skillName: 'ABC', skillEmployeeUsername: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeSkillCertificateDetails = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123, 'ABC', 'ABC');
        expect(resultEmployeeSkillCertificateDetails).toEqual(null);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

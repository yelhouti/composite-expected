jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICertificateType } from '../certificate-type.model';
import { CertificateTypeService } from '../service/certificate-type.service';

import { CertificateTypeRoutingResolveService } from './certificate-type-routing-resolve.service';

describe('Service Tests', () => {
  describe('CertificateType routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CertificateTypeRoutingResolveService;
    let service: CertificateTypeService;
    let resultCertificateType: ICertificateType | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CertificateTypeRoutingResolveService);
      service = TestBed.inject(CertificateTypeService);
      resultCertificateType = null;
    });

    describe('resolve', () => {
      it('should return ICertificateType returned by find', () => {
        // GIVEN
        service.find = jest.fn(() => of(new HttpResponse({ body: { id: 123 } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCertificateType = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCertificateType).toEqual({ id: 123 });
      });

      it('should return null if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCertificateType = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCertificateType).toEqual(null);
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCertificateType = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCertificateType).toEqual(null);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

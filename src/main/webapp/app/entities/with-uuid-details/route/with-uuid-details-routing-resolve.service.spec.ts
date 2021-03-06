jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IWithUUIDDetails } from '../with-uuid-details.model';
import { WithUUIDDetailsService } from '../service/with-uuid-details.service';

import { WithUUIDDetailsRoutingResolveService } from './with-uuid-details-routing-resolve.service';

describe('Service Tests', () => {
  describe('WithUUIDDetails routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: WithUUIDDetailsRoutingResolveService;
    let service: WithUUIDDetailsService;
    let resultWithUUIDDetails: IWithUUIDDetails | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(WithUUIDDetailsRoutingResolveService);
      service = TestBed.inject(WithUUIDDetailsService);
      resultWithUUIDDetails = null;
    });

    describe('resolve', () => {
      it('should return IWithUUIDDetails returned by find', () => {
        // GIVEN
        service.find = jest.fn(() => of(new HttpResponse({ body: { withUUID: { uuid: '9fec3727-3421-4967-b213-ba36557ca194' } } })));
        mockActivatedRouteSnapshot.params = { uuid: '9fec3727-3421-4967-b213-ba36557ca194' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithUUIDDetails = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('9fec3727-3421-4967-b213-ba36557ca194');
        expect(resultWithUUIDDetails).toEqual({ withUUID: { uuid: '9fec3727-3421-4967-b213-ba36557ca194' } });
      });

      it('should return null if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithUUIDDetails = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultWithUUIDDetails).toEqual(null);
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { uuid: '9fec3727-3421-4967-b213-ba36557ca194' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithUUIDDetails = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('9fec3727-3421-4967-b213-ba36557ca194');
        expect(resultWithUUIDDetails).toEqual(null);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IWithUUID } from '../with-uuid.model';
import { WithUUIDService } from '../service/with-uuid.service';

import { WithUUIDRoutingResolveService } from './with-uuid-routing-resolve.service';

describe('Service Tests', () => {
  describe('WithUUID routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: WithUUIDRoutingResolveService;
    let service: WithUUIDService;
    let resultWithUUID: IWithUUID | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(WithUUIDRoutingResolveService);
      service = TestBed.inject(WithUUIDService);
      resultWithUUID = null;
    });

    describe('resolve', () => {
      it('should return IWithUUID returned by find', () => {
        // GIVEN
        service.find = jest.fn(() => of(new HttpResponse({ body: { uuid: '9fec3727-3421-4967-b213-ba36557ca194' } })));
        mockActivatedRouteSnapshot.params = { uuid: '9fec3727-3421-4967-b213-ba36557ca194' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithUUID = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('9fec3727-3421-4967-b213-ba36557ca194');
        expect(resultWithUUID).toEqual({ uuid: '9fec3727-3421-4967-b213-ba36557ca194' });
      });

      it('should return null if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithUUID = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultWithUUID).toEqual(null);
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { uuid: '9fec3727-3421-4967-b213-ba36557ca194' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithUUID = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('9fec3727-3421-4967-b213-ba36557ca194');
        expect(resultWithUUID).toEqual(null);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

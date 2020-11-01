jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IWithUUID, WithUUID } from '../with-uuid.model';
import { WithUUIDService } from '../service/with-uuid.service';

import { WithUUIDRoutingResolveService } from './with-uuid-routing-resolve.service';

describe('Service Tests', () => {
  describe('WithUUID routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: WithUUIDRoutingResolveService;
    let service: WithUUIDService;
    let resultWithUUID: IWithUUID | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(WithUUIDRoutingResolveService);
      service = TestBed.inject(WithUUIDService);
      resultWithUUID = undefined;
    });

    describe('resolve', () => {
      it('should return existing IWithUUID for existing id', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: new WithUUID(id) })));
        mockActivatedRouteSnapshot.params = { id: '9fec3727-3421-4967-b213-ba36557ca194' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithUUID = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('9fec3727-3421-4967-b213-ba36557ca194');
        expect(resultWithUUID).toEqual(new WithUUID('9fec3727-3421-4967-b213-ba36557ca194'));
      });

      it('should return new IWithUUID if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithUUID = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultWithUUID).toEqual(new WithUUID());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: '9fec3727-3421-4967-b213-ba36557ca194' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithUUID = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('9fec3727-3421-4967-b213-ba36557ca194');
        expect(resultWithUUID).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

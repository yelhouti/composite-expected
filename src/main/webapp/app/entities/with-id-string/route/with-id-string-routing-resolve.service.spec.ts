jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IWithIdString, WithIdString } from '../with-id-string.model';
import { WithIdStringService } from '../service/with-id-string.service';

import { WithIdStringRoutingResolveService } from './with-id-string-routing-resolve.service';

describe('Service Tests', () => {
  describe('WithIdString routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: WithIdStringRoutingResolveService;
    let service: WithIdStringService;
    let resultWithIdString: IWithIdString | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot]
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(WithIdStringRoutingResolveService);
      service = TestBed.inject(WithIdStringService);
      resultWithIdString = undefined;
    });

    describe('resolve', () => {
      it('should return IWithIdString returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithIdString = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultWithIdString).toEqual({ id: 'ABC' });
      });

      it('should return new IWithIdString if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithIdString = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultWithIdString).toEqual(new WithIdString());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithIdString = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultWithIdString).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

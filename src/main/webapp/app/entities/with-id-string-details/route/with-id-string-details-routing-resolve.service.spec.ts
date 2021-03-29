jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IWithIdStringDetails } from '../with-id-string-details.model';
import { WithIdStringDetailsService } from '../service/with-id-string-details.service';

import { WithIdStringDetailsRoutingResolveService } from './with-id-string-details-routing-resolve.service';

describe('Service Tests', () => {
  describe('WithIdStringDetails routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: WithIdStringDetailsRoutingResolveService;
    let service: WithIdStringDetailsService;
    let resultWithIdStringDetails: IWithIdStringDetails | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(WithIdStringDetailsRoutingResolveService);
      service = TestBed.inject(WithIdStringDetailsService);
      resultWithIdStringDetails = null;
    });

    describe('resolve', () => {
      it('should return IWithIdStringDetails returned by find', () => {
        // GIVEN
        service.find = jest.fn(() => of(new HttpResponse({ body: { withIdString: { id: 'ABC' } } })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithIdStringDetails = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultWithIdStringDetails).toEqual({ withIdString: { id: 'ABC' } });
      });

      it('should return null if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithIdStringDetails = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultWithIdStringDetails).toEqual(null);
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithIdStringDetails = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultWithIdStringDetails).toEqual(null);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

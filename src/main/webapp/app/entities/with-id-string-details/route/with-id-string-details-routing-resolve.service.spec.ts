jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IWithIdStringDetails, WithIdStringDetails } from '../with-id-string-details.model';
import { WithIdStringDetailsService } from '../service/with-id-string-details.service';

import { WithIdStringDetailsRoutingResolveService } from './with-id-string-details-routing-resolve.service';

describe('Service Tests', () => {
  describe('WithIdStringDetails routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: WithIdStringDetailsRoutingResolveService;
    let service: WithIdStringDetailsService;
    let resultWithIdStringDetails: IWithIdStringDetails | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(WithIdStringDetailsRoutingResolveService);
      service = TestBed.inject(WithIdStringDetailsService);
      resultWithIdStringDetails = undefined;
    });

    describe('resolve', () => {
      it('should return existing IWithIdStringDetails for existing id', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: new WithIdStringDetails(id) })));
        mockActivatedRouteSnapshot.params = { id: '123' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithIdStringDetails = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('123');
        expect(resultWithIdStringDetails).toEqual(new WithIdStringDetails('123'));
      });

      it('should return new IWithIdStringDetails if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithIdStringDetails = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultWithIdStringDetails).toEqual(new WithIdStringDetails());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: '123' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWithIdStringDetails = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('123');
        expect(resultWithIdStringDetails).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

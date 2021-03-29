jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';
import { DatePipe } from '@angular/common';

import { ITask } from '../task.model';
import { TaskService } from '../service/task.service';

import { TaskRoutingResolveService } from './task-routing-resolve.service';

describe('Service Tests', () => {
  describe('Task routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TaskRoutingResolveService;
    let service: TaskService;
    let resultTask: ITask | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot, DatePipe],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TaskRoutingResolveService);
      service = TestBed.inject(TaskService);
      resultTask = null;
    });

    describe('resolve', () => {
      it('should return ITask returned by find', () => {
        // GIVEN
        service.find = jest.fn(() => of(new HttpResponse({ body: { id: 123 } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTask = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTask).toEqual({ id: 123 });
      });

      it('should return null if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTask = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTask).toEqual(null);
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTask = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTask).toEqual(null);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

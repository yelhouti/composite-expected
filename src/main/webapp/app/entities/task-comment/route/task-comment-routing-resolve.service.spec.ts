jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITaskComment } from '../task-comment.model';
import { TaskCommentService } from '../service/task-comment.service';

import { TaskCommentRoutingResolveService } from './task-comment-routing-resolve.service';

describe('Service Tests', () => {
  describe('TaskComment routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TaskCommentRoutingResolveService;
    let service: TaskCommentService;
    let resultTaskComment: ITaskComment | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TaskCommentRoutingResolveService);
      service = TestBed.inject(TaskCommentService);
      resultTaskComment = null;
    });

    describe('resolve', () => {
      it('should return ITaskComment returned by find', () => {
        // GIVEN
        service.find = jest.fn(() => of(new HttpResponse({ body: { id: 123 } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTaskComment = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTaskComment).toEqual({ id: 123 });
      });

      it('should return null if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTaskComment = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTaskComment).toEqual(null);
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTaskComment = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTaskComment).toEqual(null);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

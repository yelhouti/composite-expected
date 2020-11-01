jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITaskComment, TaskComment } from '../task-comment.model';
import { TaskCommentService } from '../service/task-comment.service';

import { TaskCommentRoutingResolveService } from './task-comment-routing-resolve.service';

describe('Service Tests', () => {
  describe('TaskComment routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TaskCommentRoutingResolveService;
    let service: TaskCommentService;
    let resultTaskComment: ITaskComment | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TaskCommentRoutingResolveService);
      service = TestBed.inject(TaskCommentService);
      resultTaskComment = undefined;
    });

    describe('resolve', () => {
      it('should return existing ITaskComment for existing id', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: new TaskComment(id) })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTaskComment = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTaskComment).toEqual(new TaskComment(123));
      });

      it('should return new ITaskComment if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTaskComment = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTaskComment).toEqual(new TaskComment());
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
        expect(resultTaskComment).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

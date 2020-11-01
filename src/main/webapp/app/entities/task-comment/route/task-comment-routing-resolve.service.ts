import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITaskComment, TaskComment } from '../task-comment.model';
import { TaskCommentService } from '../service/task-comment.service';

@Injectable({ providedIn: 'root' })
export class TaskCommentRoutingResolveService implements Resolve<ITaskComment> {
  constructor(protected service: TaskCommentService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITaskComment> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((taskComment: HttpResponse<TaskComment>) => {
          if (taskComment.body) {
            return of(taskComment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TaskComment());
  }
}

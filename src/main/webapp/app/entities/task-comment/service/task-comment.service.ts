import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITaskComment, getTaskCommentIdentifier } from '../task-comment.model';

export type EntityResponseType = HttpResponse<ITaskComment>;
export type EntityArrayResponseType = HttpResponse<ITaskComment[]>;

@Injectable({ providedIn: 'root' })
export class TaskCommentService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/task-comments');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(taskComment: ITaskComment): Observable<EntityResponseType> {
    return this.http.post<ITaskComment>(this.resourceUrl, taskComment, { observe: 'response' });
  }

  update(taskComment: ITaskComment): Observable<EntityResponseType> {
    return this.http.put<ITaskComment>(`${this.resourceUrl}/${getTaskCommentIdentifier(taskComment) as number}`, taskComment, {
      observe: 'response'
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaskComment>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaskComment[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTaskCommentToCollectionIfMissing(
    taskCommentCollection: ITaskComment[],
    ...taskCommentsToCheck: (ITaskComment | null | undefined)[]
  ): ITaskComment[] {
    const taskComments: ITaskComment[] = taskCommentsToCheck.filter(isPresent);
    if (taskComments.length > 0) {
      const taskCommentCollectionIdentifiers = taskCommentCollection.map(taskCommentItem => getTaskCommentIdentifier(taskCommentItem)!);
      const taskCommentsToAdd = taskComments.filter(taskCommentItem => {
        const taskCommentIdentifier = getTaskCommentIdentifier(taskCommentItem);
        if (taskCommentIdentifier == null || taskCommentCollectionIdentifiers.includes(taskCommentIdentifier)) {
          return false;
        }
        taskCommentCollectionIdentifiers.push(taskCommentIdentifier);
        return true;
      });
      return [...taskCommentsToAdd, ...taskCommentCollection];
    }
    return taskCommentCollection;
  }
}

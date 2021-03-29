import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.put<ITaskComment>(`${this.resourceUrl}/${getTaskCommentIdentifier(taskComment)!}`, taskComment, {
      observe: 'response',
    });
  }

  partialUpdate(taskComment: ITaskComment): Observable<EntityResponseType> {
    return this.http.patch<ITaskComment>(`${this.resourceUrl}/${getTaskCommentIdentifier(taskComment)!}`, taskComment, {
      observe: 'response',
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
}

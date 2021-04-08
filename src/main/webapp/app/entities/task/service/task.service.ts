import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITask, getTaskIdentifier } from '../task.model';

export type EntityResponseType = HttpResponse<ITask>;
export type EntityArrayResponseType = HttpResponse<ITask[]>;

@Injectable({ providedIn: 'root' })
export class TaskService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/tasks');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService, protected datePipe: DatePipe) {}

  create(task: ITask): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(task);
    return this.http
      .post<ITask>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(task: ITask): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(task);
    return this.http
      .put<ITask>(`${this.resourceUrl}/${getTaskIdentifier(task)!}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(task: ITask): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(task);
    return this.http
      .patch<ITask>(`${this.resourceUrl}/${getTaskIdentifier(task)!}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITask>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITask[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(task: ITask): ITask {
    return Object.assign({}, task, {
      endDate: task.endDate != null ? this.datePipe.transform(task.endDate, DATE_FORMAT) : undefined,
      createdAt: task.createdAt != null ? task.createdAt.toJSON() : undefined,
      modifiedAt: task.modifiedAt != null ? task.modifiedAt.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.endDate = res.body.endDate ? new Date(res.body.endDate) : undefined;
      res.body.createdAt = res.body.createdAt ? new Date(res.body.createdAt) : undefined;
      res.body.modifiedAt = res.body.modifiedAt ? new Date(res.body.modifiedAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((task: ITask) => {
        task.endDate = task.endDate ? new Date(task.endDate) : undefined;
        task.createdAt = task.createdAt ? new Date(task.createdAt) : undefined;
        task.modifiedAt = task.modifiedAt ? new Date(task.modifiedAt) : undefined;
      });
    }
    return res;
  }
}

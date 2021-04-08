import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { lazyLoadEventToServerQueryParams } from 'app/core/request/request-util';
import { LazyLoadEvent } from 'primeng/api';

import { IEmployee } from '../employee.model';
import { EmployeeService } from '../service/employee.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'jhi-employee-update',
  templateUrl: './employee-update.component.html',
})
export class EmployeeUpdateComponent implements OnInit {
  edit = false;
  isSaving = false;
  managerOptions: IEmployee[] | null = null;
  managerFilterValue?: any;

  editForm = this.fb.group({
    username: [null, [Validators.required]],
    fullname: [null, [Validators.required]],
    manager: [],
  });

  constructor(
    protected messageService: MessageService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isSaving = false;

    this.activatedRoute.data.subscribe(({ employee }) => {
      this.updateForm(employee);
    });
  }

  onManagerLazyLoadEvent(event: LazyLoadEvent): void {
    this.employeeService.query(lazyLoadEventToServerQueryParams(event, 'fullname.contains')).subscribe(
      (res: HttpResponse<IEmployee[]>) => (this.managerOptions = res.body),
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  updateForm(employee: IEmployee | null): void {
    if (employee) {
      this.edit = true;
      this.editForm.reset({ ...employee }, { emitEvent: false, onlySelf: true });
      if (employee.manager) {
        this.managerOptions = [employee.manager];
        this.managerFilterValue = employee.manager.fullname;
      }
    } else {
      this.edit = false;
      this.editForm.reset({});
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employee = this.editForm.value;
    if (this.edit) {
      this.subscribeToSaveResponse(this.employeeService.update(employee));
    } else {
      this.subscribeToSaveResponse(this.employeeService.create(employee));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployee>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  protected onError(errorMessage: string): void {
    this.messageService.add({ severity: 'error', summary: errorMessage });
  }
}

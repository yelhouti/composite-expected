import { Component, OnInit, Optional } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'jhi-employee-update',
  templateUrl: './employee-update.component.html',
})
export class EmployeeUpdateComponent implements OnInit {
  edit = false;
  isSaving = false;
  employees: IEmployee[] = [];

  editForm = this.fb.group({
    username: [null, [Validators.required]],
    fullname: [null, [Validators.required]],
    manager: [],
  });

  constructor(
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    @Optional() public activeModal?: NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (this.activeModal) {
      return;
    }
    this.activatedRoute.data.subscribe(({ employee }) => {
      this.updateForm(employee);

      this.employeeService.query().subscribe((res: HttpResponse<IEmployee[]>) => (this.employees = res.body ?? []));
    });
  }

  updateForm(employee: IEmployee | null): void {
    if (employee) {
      this.edit = true;
      this.editForm.reset({
        ...employee,
      });
    } else {
      this.edit = false;
      this.editForm.reset({});
    }
  }

  previousState(): void {
    if (this.activeModal) {
      this.activeModal.close();
    } else {
      window.history.back();
    }
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

  trackByUsername(index: number, item: IEmployee): string {
    return item.username!;
  }
}

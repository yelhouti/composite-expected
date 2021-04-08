import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { lazyLoadEventToServerQueryParams } from 'app/core/request/request-util';
import { LazyLoadEvent } from 'primeng/api';

import { IEmployeeSkill } from '../employee-skill.model';
import { EmployeeSkillService } from '../service/employee-skill.service';
import { MessageService } from 'primeng/api';
import { ITask } from 'app/entities/task/task.model';
import { TaskService } from 'app/entities/task/service/task.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';

@Component({
  selector: 'jhi-employee-skill-update',
  templateUrl: './employee-skill-update.component.html',
})
export class EmployeeSkillUpdateComponent implements OnInit {
  edit = false;
  isSaving = false;
  taskOptions: ITask[] | null = null;
  taskSelectedOptions: ITask[] | null = null;
  employeeOptions: IEmployee[] | null = null;
  employeeFilterValue?: any;
  teacherOptions: IEmployee[] | null = null;
  teacherFilterValue?: any;

  editForm = this.fb.group({
    name: [null, [Validators.required]],
    level: [null, [Validators.required]],
    tasks: [],
    employee: [null, [Validators.required]],
    teacher: [null, [Validators.required]],
  });

  constructor(
    protected messageService: MessageService,
    protected employeeSkillService: EmployeeSkillService,
    protected taskService: TaskService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isSaving = false;

    this.activatedRoute.data.subscribe(({ employeeSkill }) => {
      this.updateForm(employeeSkill);
    });
  }

  onTaskLazyLoadEvent(event: LazyLoadEvent): void {
    this.taskService.query(lazyLoadEventToServerQueryParams(event, 'name.contains')).subscribe(
      (res: HttpResponse<ITask[]>) => (this.taskOptions = res.body),
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  onEmployeeLazyLoadEvent(event: LazyLoadEvent): void {
    this.employeeService.query(lazyLoadEventToServerQueryParams(event, 'fullname.contains')).subscribe(
      (res: HttpResponse<IEmployee[]>) => (this.employeeOptions = res.body),
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  onTeacherLazyLoadEvent(event: LazyLoadEvent): void {
    this.employeeService.query(lazyLoadEventToServerQueryParams(event, 'fullname.contains')).subscribe(
      (res: HttpResponse<IEmployee[]>) => (this.teacherOptions = res.body),
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  updateForm(employeeSkill: IEmployeeSkill | null): void {
    if (employeeSkill) {
      this.edit = true;
      this.editForm.reset({ ...employeeSkill }, { emitEvent: false, onlySelf: true });
      this.taskSelectedOptions = employeeSkill.tasks ?? [];
      if (employeeSkill.employee) {
        this.employeeOptions = [employeeSkill.employee];
        this.employeeFilterValue = employeeSkill.employee.fullname;
      }
      if (employeeSkill.teacher) {
        this.teacherOptions = [employeeSkill.teacher];
        this.teacherFilterValue = employeeSkill.teacher.fullname;
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
    const employeeSkill = this.editForm.value;
    if (this.edit) {
      this.subscribeToSaveResponse(this.employeeSkillService.update(employeeSkill));
    } else {
      this.subscribeToSaveResponse(this.employeeSkillService.create(employeeSkill));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeSkill>>): void {
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

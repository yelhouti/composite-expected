import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IEmployeeSkill, EmployeeSkill } from '../employee-skill.model';
import { EmployeeSkillService } from '../service/employee-skill.service';
import { ITask } from 'app/entities/task/task.model';
import { TaskService } from 'app/entities/task/service/task.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';

@Component({
  selector: 'jhi-employee-skill-update',
  templateUrl: './employee-skill-update.component.html'
})
export class EmployeeSkillUpdateComponent implements OnInit {
  isSaving = false;

  tasksSharedCollection: ITask[] = [];
  employeesSharedCollection: IEmployee[] = [];

  editForm = this.fb.group({
    name: [null, [Validators.required]],
    level: [null, [Validators.required]],
    tasks: [],
    employee: [null, Validators.required],
    teacher: [null, Validators.required]
  });

  constructor(
    protected employeeSkillService: EmployeeSkillService,
    protected taskService: TaskService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employeeSkill }) => {
      this.updateForm(employeeSkill);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employeeSkill = this.createFromForm();
    if (employeeSkill.name !== undefined) {
      this.subscribeToSaveResponse(this.employeeSkillService.update(employeeSkill));
    } else {
      this.subscribeToSaveResponse(this.employeeSkillService.create(employeeSkill));
    }
  }

  trackTaskById(index: number, item: ITask): number {
    return item.id!;
  }

  trackEmployeeByUsername(index: number, item: IEmployee): string {
    return item.username!;
  }

  getSelectedTask(option: ITask, selectedVals?: ITask[]): ITask {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeSkill>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(employeeSkill: IEmployeeSkill): void {
    this.editForm.patchValue({
      name: employeeSkill.name,
      level: employeeSkill.level,
      tasks: employeeSkill.tasks,
      employee: employeeSkill.employee,
      teacher: employeeSkill.teacher
    });

    this.tasksSharedCollection = this.taskService.addTaskToCollectionIfMissing(this.tasksSharedCollection, ...(employeeSkill.tasks ?? []));
    this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing(
      this.employeesSharedCollection,
      employeeSkill.employee,
      employeeSkill.teacher
    );
  }

  protected loadRelationshipsOptions(): void {
    this.taskService
      .query()
      .pipe(map((res: HttpResponse<ITask[]>) => res.body ?? []))
      .pipe(map((tasks: ITask[]) => this.taskService.addTaskToCollectionIfMissing(tasks, ...(this.editForm.get('tasks')!.value ?? []))))
      .subscribe((tasks: ITask[]) => (this.tasksSharedCollection = tasks));

    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployee[]) =>
          this.employeeService.addEmployeeToCollectionIfMissing(
            employees,
            this.editForm.get('employee')!.value,
            this.editForm.get('teacher')!.value
          )
        )
      )
      .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));
  }

  protected createFromForm(): IEmployeeSkill {
    return {
      ...new EmployeeSkill(),
      name: this.editForm.get(['name'])!.value,
      level: this.editForm.get(['level'])!.value,
      tasks: this.editForm.get(['tasks'])!.value,
      employee: this.editForm.get(['employee'])!.value,
      teacher: this.editForm.get(['teacher'])!.value
    };
  }
}

import { Component, OnInit, Optional } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmployeeSkill, EmployeeSkill } from 'app/shared/model/employee-skill.model';
import { EmployeeSkillService } from './employee-skill.service';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from 'app/entities/task/task.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee/employee.service';

type SelectableEntity = ITask | IEmployee;

@Component({
  selector: 'jhi-employee-skill-update',
  templateUrl: './employee-skill-update.component.html',
})
export class EmployeeSkillUpdateComponent implements OnInit {
  isSaving = false;
  tasks: ITask[] = [];
  employees: IEmployee[] = [];

  editForm = this.fb.group({
    id: [],
    level: [null, [Validators.required]],
    tasks: [],
    employee: [null, Validators.required],
    teacher: [null, Validators.required],
  });

  constructor(
    protected employeeSkillService: EmployeeSkillService,
    protected taskService: TaskService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    @Optional() public activeModal?: NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (this.activeModal) {
      return;
    }
    this.activatedRoute.data.subscribe(({ employeeSkill }) => {
      this.updateForm(employeeSkill);

      this.taskService.query().subscribe((res: HttpResponse<ITask[]>) => (this.tasks = res.body ?? []));

      this.employeeService.query().subscribe((res: HttpResponse<IEmployee[]>) => (this.employees = res.body ?? []));
    });
  }

  updateForm(employeeSkill: IEmployeeSkill): void {
    this.editForm.patchValue({
      id: employeeSkill.id,
      level: employeeSkill.level,
      tasks: employeeSkill.tasks,
      employee: employeeSkill.employee,
      teacher: employeeSkill.teacher,
    });
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
    const employeeSkill = this.createFromForm();
    if (employeeSkill.id !== undefined) {
      this.subscribeToSaveResponse(this.employeeSkillService.update(employeeSkill));
    } else {
      this.subscribeToSaveResponse(this.employeeSkillService.create(employeeSkill));
    }
  }

  private createFromForm(): IEmployeeSkill {
    return {
      ...new EmployeeSkill(),
      id: this.editForm.get(['id'])!.value,
      level: this.editForm.get(['level'])!.value,
      tasks: this.editForm.get(['tasks'])!.value,
      employee: this.editForm.get(['employee'])!.value,
      teacher: this.editForm.get(['teacher'])!.value,
    };
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

  trackById(index: number, item: SelectableEntity): number {
    return item.id!;
  }

  getSelected(option: ITask, selectedVals?: ITask[]): ITask {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}

jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EmployeeSkillService } from '../service/employee-skill.service';
import { IEmployeeSkill, EmployeeSkill } from '../employee-skill.model';
import { ITask } from 'app/entities/task/task.model';
import { TaskService } from 'app/entities/task/service/task.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';

import { EmployeeSkillUpdateComponent } from './employee-skill-update.component';

describe('Component Tests', () => {
  describe('EmployeeSkill Management Update Component', () => {
    let comp: EmployeeSkillUpdateComponent;
    let fixture: ComponentFixture<EmployeeSkillUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let employeeSkillService: EmployeeSkillService;
    let taskService: TaskService;
    let employeeService: EmployeeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EmployeeSkillUpdateComponent],
        providers: [FormBuilder, ActivatedRoute]
      })
        .overrideTemplate(EmployeeSkillUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeSkillUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      employeeSkillService = TestBed.inject(EmployeeSkillService);
      taskService = TestBed.inject(TaskService);
      employeeService = TestBed.inject(EmployeeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Task query and add missing value', () => {
        const employeeSkill: IEmployeeSkill = { name: 'CBA' };
        const tasks: ITask[] = [{ id: 72900 }];
        employeeSkill.tasks = tasks;

        const taskCollection: ITask[] = [{ id: 29336 }];
        spyOn(taskService, 'query').and.returnValue(of(new HttpResponse({ body: taskCollection })));
        const additionalTasks = [...tasks];
        const expectedCollection: ITask[] = [...additionalTasks, ...taskCollection];
        spyOn(taskService, 'addTaskToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ employeeSkill });
        comp.ngOnInit();

        expect(taskService.query).toHaveBeenCalled();
        expect(taskService.addTaskToCollectionIfMissing).toHaveBeenCalledWith(taskCollection, ...additionalTasks);
        expect(comp.tasksSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Employee query and add missing value', () => {
        const employeeSkill: IEmployeeSkill = { name: 'CBA' };
        const employee: IEmployee = { username: 'Steel navigating' };
        employeeSkill.employee = employee;
        const teacher: IEmployee = { username: 'Refined Convertible' };
        employeeSkill.teacher = teacher;

        const employeeCollection: IEmployee[] = [{ username: 'Realigned' }];
        spyOn(employeeService, 'query').and.returnValue(of(new HttpResponse({ body: employeeCollection })));
        const additionalEmployees = [employee, teacher];
        const expectedCollection: IEmployee[] = [...additionalEmployees, ...employeeCollection];
        spyOn(employeeService, 'addEmployeeToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ employeeSkill });
        comp.ngOnInit();

        expect(employeeService.query).toHaveBeenCalled();
        expect(employeeService.addEmployeeToCollectionIfMissing).toHaveBeenCalledWith(employeeCollection, ...additionalEmployees);
        expect(comp.employeesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const employeeSkill: IEmployeeSkill = { name: 'CBA' };
        const tasks: ITask = { id: 56285 };
        employeeSkill.tasks = [tasks];
        const employee: IEmployee = { username: 'Functionality Incredible' };
        employeeSkill.employee = employee;
        const teacher: IEmployee = { username: 'port' };
        employeeSkill.teacher = teacher;

        activatedRoute.data = of({ employeeSkill });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(employeeSkill));
        expect(comp.tasksSharedCollection).toContain(tasks);
        expect(comp.employeesSharedCollection).toContain(employee);
        expect(comp.employeesSharedCollection).toContain(teacher);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const employeeSkill = { name: 'ABC' };
        spyOn(employeeSkillService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ employeeSkill });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: employeeSkill }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(employeeSkillService.update).toHaveBeenCalledWith(employeeSkill);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const employeeSkill = new EmployeeSkill();
        spyOn(employeeSkillService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ employeeSkill });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: employeeSkill }));
        saveSubject.complete();

        // THEN
        expect(employeeSkillService.create).toHaveBeenCalledWith(employeeSkill);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const employeeSkill = { name: 'ABC' };
        spyOn(employeeSkillService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ employeeSkill });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(employeeSkillService.update).toHaveBeenCalledWith(employeeSkill);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackTaskById', () => {
        it('Should return tracked Task primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTaskById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackEmployeeByUsername', () => {
        it('Should return tracked Employee primary key', () => {
          const entity = { username: 'ABC' };
          const trackResult = comp.trackEmployeeByUsername(0, entity);
          expect(trackResult).toEqual(entity.username);
        });
      });
    });

    describe('Getting selected relationships', () => {
      describe('getSelectedTask', () => {
        it('Should return option if no Task is selected', () => {
          const option = { id: 123 };
          const result = comp.getSelectedTask(option);
          expect(result === option).toEqual(true);
        });

        it('Should return selected Task for according option', () => {
          const option = { id: 123 };
          const selected = { id: 123 };
          const selected2 = { id: 456 };
          const result = comp.getSelectedTask(option, [selected2, selected]);
          expect(result === selected).toEqual(true);
          expect(result === selected2).toEqual(false);
          expect(result === option).toEqual(false);
        });

        it('Should return option if this Task is not selected', () => {
          const option = { id: 123 };
          const selected = { id: 456 };
          const result = comp.getSelectedTask(option, [selected]);
          expect(result === option).toEqual(true);
          expect(result === selected).toEqual(false);
        });
      });
    });
  });
});

jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TaskCommentService } from '../service/task-comment.service';
import { ITaskComment, TaskComment } from '../task-comment.model';
import { ITask, Task } from 'app/entities/task/task.model';
import { TaskService } from 'app/entities/task/service/task.service';

import { TaskCommentUpdateComponent } from './task-comment-update.component';

describe('Component Tests', () => {
  describe('TaskComment Management Update Component', () => {
    let comp: TaskCommentUpdateComponent;
    let fixture: ComponentFixture<TaskCommentUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let taskCommentService: TaskCommentService;
    let taskService: TaskService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TaskCommentUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TaskCommentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TaskCommentUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      taskCommentService = TestBed.inject(TaskCommentService);
      taskService = TestBed.inject(TaskService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Task query and add missing value', () => {
        const taskComment: ITaskComment = { id: 456 };
        const task: ITask = { id: 91232 };
        taskComment.task = task;

        const taskCollection: ITask[] = [{ id: 21367 }];
        spyOn(taskService, 'query').and.returnValue(of(new HttpResponse({ body: taskCollection })));
        const additionalTasks = [task];
        const expectedCollection: ITask[] = [...additionalTasks, ...taskCollection];
        spyOn(taskService, 'addTaskToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ taskComment });
        comp.ngOnInit();

        expect(taskService.query).toHaveBeenCalled();
        expect(taskService.addTaskToCollectionIfMissing).toHaveBeenCalledWith(taskCollection, ...additionalTasks);
        expect(comp.tasksSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const taskComment: ITaskComment = { id: 456 };
        const task: ITask = { id: 59726 };
        taskComment.task = task;

        activatedRoute.data = of({ taskComment });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(taskComment));
        expect(comp.tasksSharedCollection).toContain(task);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const taskComment = new TaskComment(123);
        spyOn(taskCommentService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ taskComment });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: taskComment }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(taskCommentService.update).toHaveBeenCalledWith(taskComment);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const taskComment = new TaskComment();
        spyOn(taskCommentService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ taskComment });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: taskComment }));
        saveSubject.complete();

        // THEN
        expect(taskCommentService.create).toHaveBeenCalledWith(taskComment);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const taskComment = new TaskComment(123);
        spyOn(taskCommentService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ taskComment });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(taskCommentService.update).toHaveBeenCalledWith(taskComment);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackTaskById', () => {
        it('Should return tracked Task primary key', () => {
          const entity = new Task(123);
          const trackResult = comp.trackTaskById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});

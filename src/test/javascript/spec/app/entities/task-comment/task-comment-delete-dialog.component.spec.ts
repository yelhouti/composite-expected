jest.mock('@ng-bootstrap/ng-bootstrap');
jest.mock('app/core/event-manager/event-manager.service');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TaskCommentDeleteDialogComponent } from 'app/entities/task-comment/task-comment-delete-dialog.component';
import { TaskCommentService } from 'app/entities/task-comment/task-comment.service';
import { EventManager } from 'app/core/event-manager/event-manager.service';

describe('Component Tests', () => {
  describe('TaskComment Management Delete Component', () => {
    let comp: TaskCommentDeleteDialogComponent;
    let fixture: ComponentFixture<TaskCommentDeleteDialogComponent>;
    let service: TaskCommentService;
    let mockEventManager: EventManager;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TaskCommentDeleteDialogComponent],
        providers: [NgbActiveModal, EventManager],
      })
        .overrideTemplate(TaskCommentDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TaskCommentDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TaskCommentService);
      mockEventManager = TestBed.inject(EventManager);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.close).toHaveBeenCalled();
          expect(mockEventManager.broadcast).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismiss).toHaveBeenCalled();
      });
    });
  });
});

jest.mock('@ng-bootstrap/ng-bootstrap');
jest.mock('app/core/event-manager/event-manager.service');

import { ComponentFixture, TestBed, waitForAsync, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { UserManagementDeleteDialogComponent } from 'app/admin/user-management/user-management-delete-dialog.component';
import { UserService } from 'app/core/user/user.service';
import { EventManager } from 'app/core/event-manager/event-manager.service';

describe('Component Tests', () => {
  describe('User Management Delete Component', () => {
    let comp: UserManagementDeleteDialogComponent;
    let fixture: ComponentFixture<UserManagementDeleteDialogComponent>;
    let service: UserService;
    let mockEventManager: EventManager;
    let mockActiveModal: NgbActiveModal;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          declarations: [UserManagementDeleteDialogComponent],
          providers: [NgbActiveModal, EventManager],
        })
          .overrideTemplate(UserManagementDeleteDialogComponent, '')
          .compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(UserManagementDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(UserService);
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
          comp.confirmDelete('user');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('user');
          expect(mockActiveModal.close).toHaveBeenCalled();
          expect(mockEventManager.broadcast).toHaveBeenCalled();
        })
      ));
    });
  });
});

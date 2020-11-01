jest.mock('ng-jhipster');
jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WithIdStringDetailsDeleteDialogComponent } from 'app/entities/with-id-string-details/with-id-string-details-delete-dialog.component';
import { WithIdStringDetailsService } from 'app/entities/with-id-string-details/with-id-string-details.service';

describe('Component Tests', () => {
  describe('WithIdStringDetails Management Delete Component', () => {
    let comp: WithIdStringDetailsDeleteDialogComponent;
    let fixture: ComponentFixture<WithIdStringDetailsDeleteDialogComponent>;
    let service: WithIdStringDetailsService;
    let mockEventManager: JhiEventManager;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WithIdStringDetailsDeleteDialogComponent],
        providers: [NgbActiveModal, JhiEventManager],
      })
        .overrideTemplate(WithIdStringDetailsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WithIdStringDetailsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(WithIdStringDetailsService);
      mockEventManager = TestBed.inject(JhiEventManager);
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

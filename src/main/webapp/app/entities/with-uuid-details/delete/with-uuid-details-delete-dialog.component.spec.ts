jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { WithUUIDDetailsService } from '../service/with-uuid-details.service';

import { WithUUIDDetailsDeleteDialogComponent } from './with-uuid-details-delete-dialog.component';

describe('Component Tests', () => {
  describe('WithUUIDDetails Management Delete Component', () => {
    let comp: WithUUIDDetailsDeleteDialogComponent;
    let fixture: ComponentFixture<WithUUIDDetailsDeleteDialogComponent>;
    let service: WithUUIDDetailsService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WithUUIDDetailsDeleteDialogComponent],
        providers: [NgbActiveModal]
      })
        .overrideTemplate(WithUUIDDetailsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WithUUIDDetailsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(WithUUIDDetailsService);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('9fec3727-3421-4967-b213-ba36557ca194');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('9fec3727-3421-4967-b213-ba36557ca194');
          expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.close).not.toHaveBeenCalled();
        expect(mockActiveModal.dismiss).toHaveBeenCalled();
      });
    });
  });
});

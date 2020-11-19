jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { WithIdStringDeleteDialogComponent } from 'app/entities/with-id-string/with-id-string-delete-dialog.component';
import { WithIdStringService } from 'app/entities/with-id-string/with-id-string.service';

describe('Component Tests', () => {
  describe('WithIdString Management Delete Component', () => {
    let comp: WithIdStringDeleteDialogComponent;
    let fixture: ComponentFixture<WithIdStringDeleteDialogComponent>;
    let service: WithIdStringService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WithIdStringDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(WithIdStringDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WithIdStringDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(WithIdStringService);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
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

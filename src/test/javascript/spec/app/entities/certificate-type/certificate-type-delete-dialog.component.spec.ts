jest.mock('@ng-bootstrap/ng-bootstrap');
jest.mock('app/core/event-manager/event-manager.service');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CertificateTypeDeleteDialogComponent } from 'app/entities/certificate-type/certificate-type-delete-dialog.component';
import { CertificateTypeService } from 'app/entities/certificate-type/certificate-type.service';
import { EventManager } from 'app/core/event-manager/event-manager.service';

describe('Component Tests', () => {
  describe('CertificateType Management Delete Component', () => {
    let comp: CertificateTypeDeleteDialogComponent;
    let fixture: ComponentFixture<CertificateTypeDeleteDialogComponent>;
    let service: CertificateTypeService;
    let mockEventManager: EventManager;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CertificateTypeDeleteDialogComponent],
        providers: [NgbActiveModal, EventManager],
      })
        .overrideTemplate(CertificateTypeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CertificateTypeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CertificateTypeService);
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

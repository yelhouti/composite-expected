jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CertificateTypeService } from '../service/certificate-type.service';
import { ICertificateType, CertificateType } from '../certificate-type.model';

import { CertificateTypeUpdateComponent } from './certificate-type-update.component';

describe('Component Tests', () => {
  describe('CertificateType Management Update Component', () => {
    let comp: CertificateTypeUpdateComponent;
    let fixture: ComponentFixture<CertificateTypeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let certificateTypeService: CertificateTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CertificateTypeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute]
      })
        .overrideTemplate(CertificateTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CertificateTypeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      certificateTypeService = TestBed.inject(CertificateTypeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const certificateType: ICertificateType = { id: 456 };

        activatedRoute.data = of({ certificateType });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(certificateType));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const certificateType = { id: 123 };
        spyOn(certificateTypeService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ certificateType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: certificateType }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(certificateTypeService.update).toHaveBeenCalledWith(certificateType);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const certificateType = new CertificateType();
        spyOn(certificateTypeService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ certificateType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: certificateType }));
        saveSubject.complete();

        // THEN
        expect(certificateTypeService.create).toHaveBeenCalledWith(certificateType);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const certificateType = { id: 123 };
        spyOn(certificateTypeService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ certificateType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(certificateTypeService.update).toHaveBeenCalledWith(certificateType);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});

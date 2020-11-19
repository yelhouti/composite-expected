jest.mock('@angular/router');

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CertificateTypeUpdateComponent } from 'app/entities/certificate-type/certificate-type-update.component';
import { CertificateTypeService } from 'app/entities/certificate-type/certificate-type.service';
import { CertificateType } from 'app/shared/model/certificate-type.model';

describe('Component Tests', () => {
  describe('CertificateType Management Update Component', () => {
    let comp: CertificateTypeUpdateComponent;
    let fixture: ComponentFixture<CertificateTypeUpdateComponent>;
    let service: CertificateTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CertificateTypeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CertificateTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CertificateTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CertificateTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CertificateType(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new CertificateType();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

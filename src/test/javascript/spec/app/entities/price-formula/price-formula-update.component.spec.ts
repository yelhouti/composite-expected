jest.mock('@angular/router');

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PriceFormulaUpdateComponent } from 'app/entities/price-formula/price-formula-update.component';
import { PriceFormulaService } from 'app/entities/price-formula/price-formula.service';
import { PriceFormula } from 'app/shared/model/price-formula.model';

describe('Component Tests', () => {
  describe('PriceFormula Management Update Component', () => {
    let comp: PriceFormulaUpdateComponent;
    let fixture: ComponentFixture<PriceFormulaUpdateComponent>;
    let service: PriceFormulaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PriceFormulaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PriceFormulaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PriceFormulaUpdateComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PriceFormulaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PriceFormula(123);
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
        const entity = new PriceFormula();
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

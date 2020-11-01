jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { WithIdStringService } from '../service/with-id-string.service';
import { IWithIdString, WithIdString } from '../with-id-string.model';

import { WithIdStringUpdateComponent } from './with-id-string-update.component';

describe('Component Tests', () => {
  describe('WithIdString Management Update Component', () => {
    let comp: WithIdStringUpdateComponent;
    let fixture: ComponentFixture<WithIdStringUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let withIdStringService: WithIdStringService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WithIdStringUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(WithIdStringUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WithIdStringUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      withIdStringService = TestBed.inject(WithIdStringService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const withIdString: IWithIdString = { id: '456' };

        activatedRoute.data = of({ withIdString });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(withIdString));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const withIdString = new WithIdString('123');
        spyOn(withIdStringService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ withIdString });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: withIdString }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(withIdStringService.update).toHaveBeenCalledWith(withIdString);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const withIdString = new WithIdString();
        spyOn(withIdStringService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ withIdString });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: withIdString }));
        saveSubject.complete();

        // THEN
        expect(withIdStringService.create).toHaveBeenCalledWith(withIdString);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const withIdString = new WithIdString('123');
        spyOn(withIdStringService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ withIdString });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(withIdStringService.update).toHaveBeenCalledWith(withIdString);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});

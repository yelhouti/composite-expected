jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { WithUUIDService } from '../service/with-uuid.service';
import { IWithUUID, WithUUID } from '../with-uuid.model';

import { WithUUIDUpdateComponent } from './with-uuid-update.component';

describe('Component Tests', () => {
  describe('WithUUID Management Update Component', () => {
    let comp: WithUUIDUpdateComponent;
    let fixture: ComponentFixture<WithUUIDUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let withUUIDService: WithUUIDService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WithUUIDUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(WithUUIDUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WithUUIDUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      withUUIDService = TestBed.inject(WithUUIDService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const withUUID: IWithUUID = { uuid: '1361f429-3817-4123-8ee3-fdf8943310b2' };

        activatedRoute.data = of({ withUUID });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(withUUID));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const withUUID = new WithUUID('9fec3727-3421-4967-b213-ba36557ca194');
        spyOn(withUUIDService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ withUUID });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: withUUID }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(withUUIDService.update).toHaveBeenCalledWith(withUUID);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const withUUID = new WithUUID();
        spyOn(withUUIDService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ withUUID });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: withUUID }));
        saveSubject.complete();

        // THEN
        expect(withUUIDService.create).toHaveBeenCalledWith(withUUID);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const withUUID = new WithUUID('9fec3727-3421-4967-b213-ba36557ca194');
        spyOn(withUUIDService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ withUUID });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(withUUIDService.update).toHaveBeenCalledWith(withUUID);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});

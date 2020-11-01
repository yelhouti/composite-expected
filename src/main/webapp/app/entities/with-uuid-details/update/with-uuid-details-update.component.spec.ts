jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { WithUUIDDetailsService } from '../service/with-uuid-details.service';
import { IWithUUIDDetails, WithUUIDDetails } from '../with-uuid-details.model';
import { IWithUUID } from 'app/entities/with-uuid/with-uuid.model';
import { WithUUIDService } from 'app/entities/with-uuid/service/with-uuid.service';

import { WithUUIDDetailsUpdateComponent } from './with-uuid-details-update.component';

describe('Component Tests', () => {
  describe('WithUUIDDetails Management Update Component', () => {
    let comp: WithUUIDDetailsUpdateComponent;
    let fixture: ComponentFixture<WithUUIDDetailsUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let withUUIDDetailsService: WithUUIDDetailsService;
    let withUUIDService: WithUUIDService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WithUUIDDetailsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute]
      })
        .overrideTemplate(WithUUIDDetailsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WithUUIDDetailsUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      withUUIDDetailsService = TestBed.inject(WithUUIDDetailsService);
      withUUIDService = TestBed.inject(WithUUIDService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call withUUID query and add missing value', () => {
        const withUUIDDetails: IWithUUIDDetails = { uuid: '1361f429-3817-4123-8ee3-fdf8943310b2' };
        const withUUID: IWithUUID = { uuid: 'b2af2e51-e58a-4c12-9341-c463797a8429' };
        withUUIDDetails.withUUID = withUUID;

        const withUUIDCollection: IWithUUID[] = [{ uuid: '94582cb3-ba9c-417b-bde8-074a139893fa' }];
        spyOn(withUUIDService, 'query').and.returnValue(of(new HttpResponse({ body: withUUIDCollection })));
        const expectedCollection: IWithUUID[] = [withUUID, ...withUUIDCollection];
        spyOn(withUUIDService, 'addWithUUIDToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ withUUIDDetails });
        comp.ngOnInit();

        expect(withUUIDService.query).toHaveBeenCalled();
        expect(withUUIDService.addWithUUIDToCollectionIfMissing).toHaveBeenCalledWith(withUUIDCollection, withUUID);
        expect(comp.withUUIDSCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const withUUIDDetails: IWithUUIDDetails = { uuid: '1361f429-3817-4123-8ee3-fdf8943310b2' };
        const withUUID: IWithUUID = { uuid: 'b3889890-42b1-473b-84e3-81421d495491' };
        withUUIDDetails.withUUID = withUUID;

        activatedRoute.data = of({ withUUIDDetails });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(withUUIDDetails));
        expect(comp.withUUIDSCollection).toContain(withUUID);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const withUUIDDetails = { uuid: '9fec3727-3421-4967-b213-ba36557ca194' };
        spyOn(withUUIDDetailsService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ withUUIDDetails });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: withUUIDDetails }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(withUUIDDetailsService.update).toHaveBeenCalledWith(withUUIDDetails);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const withUUIDDetails = new WithUUIDDetails();
        spyOn(withUUIDDetailsService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ withUUIDDetails });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: withUUIDDetails }));
        saveSubject.complete();

        // THEN
        expect(withUUIDDetailsService.create).toHaveBeenCalledWith(withUUIDDetails);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const withUUIDDetails = { uuid: '9fec3727-3421-4967-b213-ba36557ca194' };
        spyOn(withUUIDDetailsService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ withUUIDDetails });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(withUUIDDetailsService.update).toHaveBeenCalledWith(withUUIDDetails);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackWithUUIDByUuid', () => {
        it('Should return tracked WithUUID primary key', () => {
          const entity = { uuid: '9fec3727-3421-4967-b213-ba36557ca194' };
          const trackResult = comp.trackWithUUIDByUuid(0, entity);
          expect(trackResult).toEqual(entity.uuid);
        });
      });
    });
  });
});

jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { WithIdStringDetailsService } from '../service/with-id-string-details.service';
import { IWithIdStringDetails, WithIdStringDetails } from '../with-id-string-details.model';
import { IWithIdString } from 'app/entities/with-id-string/with-id-string.model';
import { WithIdStringService } from 'app/entities/with-id-string/service/with-id-string.service';

import { WithIdStringDetailsUpdateComponent } from './with-id-string-details-update.component';

describe('Component Tests', () => {
  describe('WithIdStringDetails Management Update Component', () => {
    let comp: WithIdStringDetailsUpdateComponent;
    let fixture: ComponentFixture<WithIdStringDetailsUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let withIdStringDetailsService: WithIdStringDetailsService;
    let withIdStringService: WithIdStringService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WithIdStringDetailsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute]
      })
        .overrideTemplate(WithIdStringDetailsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WithIdStringDetailsUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      withIdStringDetailsService = TestBed.inject(WithIdStringDetailsService);
      withIdStringService = TestBed.inject(WithIdStringService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call withIdString query and add missing value', () => {
        const withIdStringDetails: IWithIdStringDetails = { id: 'CBA' };
        const withIdString: IWithIdString = { id: 'Kids Louisiana' };
        withIdStringDetails.withIdString = withIdString;

        const withIdStringCollection: IWithIdString[] = [{ id: 'Djibouti' }];
        spyOn(withIdStringService, 'query').and.returnValue(of(new HttpResponse({ body: withIdStringCollection })));
        const expectedCollection: IWithIdString[] = [withIdString, ...withIdStringCollection];
        spyOn(withIdStringService, 'addWithIdStringToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ withIdStringDetails });
        comp.ngOnInit();

        expect(withIdStringService.query).toHaveBeenCalled();
        expect(withIdStringService.addWithIdStringToCollectionIfMissing).toHaveBeenCalledWith(withIdStringCollection, withIdString);
        expect(comp.withIdStringsCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const withIdStringDetails: IWithIdStringDetails = { id: 'CBA' };
        const withIdString: IWithIdString = { id: 'Frozen deposit' };
        withIdStringDetails.withIdString = withIdString;

        activatedRoute.data = of({ withIdStringDetails });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(withIdStringDetails));
        expect(comp.withIdStringsCollection).toContain(withIdString);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const withIdStringDetails = { id: 'ABC' };
        spyOn(withIdStringDetailsService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ withIdStringDetails });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: withIdStringDetails }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(withIdStringDetailsService.update).toHaveBeenCalledWith(withIdStringDetails);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const withIdStringDetails = new WithIdStringDetails();
        spyOn(withIdStringDetailsService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ withIdStringDetails });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: withIdStringDetails }));
        saveSubject.complete();

        // THEN
        expect(withIdStringDetailsService.create).toHaveBeenCalledWith(withIdStringDetails);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const withIdStringDetails = { id: 'ABC' };
        spyOn(withIdStringDetailsService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ withIdStringDetails });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(withIdStringDetailsService.update).toHaveBeenCalledWith(withIdStringDetails);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackWithIdStringById', () => {
        it('Should return tracked WithIdString primary key', () => {
          const entity = { id: 'ABC' };
          const trackResult = comp.trackWithIdStringById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});

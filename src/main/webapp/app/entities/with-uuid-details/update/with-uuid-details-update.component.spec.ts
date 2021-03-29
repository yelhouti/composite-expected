jest.mock('@angular/router');

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

import { WithUUIDDetailsUpdateComponent } from './with-uuid-details-update.component';
import { WithUUIDDetailsService } from '../service/with-uuid-details.service';

describe('Component Tests', () => {
  describe('WithUUIDDetails Management Update Component', () => {
    let comp: WithUUIDDetailsUpdateComponent;
    let fixture: ComponentFixture<WithUUIDDetailsUpdateComponent>;
    let service: WithUUIDDetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WithUUIDDetailsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute, MessageService],
      })
        .overrideTemplate(WithUUIDDetailsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WithUUIDDetailsUpdateComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(WithUUIDDetailsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = { withUUID: { uuid: '9fec3727-3421-4967-b213-ba36557ca194' } };
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(jasmine.objectContaining(entity));
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: null })));
        comp.updateForm(null);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(comp.editForm.value);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

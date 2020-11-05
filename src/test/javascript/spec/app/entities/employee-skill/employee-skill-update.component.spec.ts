jest.mock('@angular/router');

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmployeeSkillUpdateComponent } from 'app/entities/employee-skill/employee-skill-update.component';
import { EmployeeSkillService } from 'app/entities/employee-skill/employee-skill.service';
import { EmployeeSkill } from 'app/shared/model/employee-skill.model';

describe('Component Tests', () => {
  describe('EmployeeSkill Management Update Component', () => {
    let comp: EmployeeSkillUpdateComponent;
    let fixture: ComponentFixture<EmployeeSkillUpdateComponent>;
    let service: EmployeeSkillService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EmployeeSkillUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EmployeeSkillUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeSkillUpdateComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EmployeeSkillService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EmployeeSkill('123');
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
        const entity = new EmployeeSkill();
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

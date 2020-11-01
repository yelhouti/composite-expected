jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EmployeeSkillCertificateService } from '../service/employee-skill-certificate.service';
import { IEmployeeSkillCertificate, EmployeeSkillCertificate } from '../employee-skill-certificate.model';
import { ICertificateType } from 'app/entities/certificate-type/certificate-type.model';
import { CertificateTypeService } from 'app/entities/certificate-type/service/certificate-type.service';
import { IEmployeeSkill } from 'app/entities/employee-skill/employee-skill.model';
import { EmployeeSkillService } from 'app/entities/employee-skill/service/employee-skill.service';

import { EmployeeSkillCertificateUpdateComponent } from './employee-skill-certificate-update.component';

describe('Component Tests', () => {
  describe('EmployeeSkillCertificate Management Update Component', () => {
    let comp: EmployeeSkillCertificateUpdateComponent;
    let fixture: ComponentFixture<EmployeeSkillCertificateUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let employeeSkillCertificateService: EmployeeSkillCertificateService;
    let certificateTypeService: CertificateTypeService;
    let employeeSkillService: EmployeeSkillService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EmployeeSkillCertificateUpdateComponent],
        providers: [FormBuilder, ActivatedRoute]
      })
        .overrideTemplate(EmployeeSkillCertificateUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeSkillCertificateUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      employeeSkillCertificateService = TestBed.inject(EmployeeSkillCertificateService);
      certificateTypeService = TestBed.inject(CertificateTypeService);
      employeeSkillService = TestBed.inject(EmployeeSkillService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call CertificateType query and add missing value', () => {
        const employeeSkillCertificate: IEmployeeSkillCertificate = { id: 456 };
        const type: ICertificateType = { id: 32542 };
        employeeSkillCertificate.type = type;

        const certificateTypeCollection: ICertificateType[] = [{ id: 71328 }];
        spyOn(certificateTypeService, 'query').and.returnValue(of(new HttpResponse({ body: certificateTypeCollection })));
        const additionalCertificateTypes = [type];
        const expectedCollection: ICertificateType[] = [...additionalCertificateTypes, ...certificateTypeCollection];
        spyOn(certificateTypeService, 'addCertificateTypeToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ employeeSkillCertificate });
        comp.ngOnInit();

        expect(certificateTypeService.query).toHaveBeenCalled();
        expect(certificateTypeService.addCertificateTypeToCollectionIfMissing).toHaveBeenCalledWith(
          certificateTypeCollection,
          ...additionalCertificateTypes
        );
        expect(comp.certificateTypesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call EmployeeSkill query and add missing value', () => {
        const employeeSkillCertificate: IEmployeeSkillCertificate = { id: 456 };
        const skill: IEmployeeSkill = { name: 'Baby' };
        employeeSkillCertificate.skill = skill;

        const employeeSkillCollection: IEmployeeSkill[] = [{ name: 'Soft' }];
        spyOn(employeeSkillService, 'query').and.returnValue(of(new HttpResponse({ body: employeeSkillCollection })));
        const additionalEmployeeSkills = [skill];
        const expectedCollection: IEmployeeSkill[] = [...additionalEmployeeSkills, ...employeeSkillCollection];
        spyOn(employeeSkillService, 'addEmployeeSkillToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ employeeSkillCertificate });
        comp.ngOnInit();

        expect(employeeSkillService.query).toHaveBeenCalled();
        expect(employeeSkillService.addEmployeeSkillToCollectionIfMissing).toHaveBeenCalledWith(
          employeeSkillCollection,
          ...additionalEmployeeSkills
        );
        expect(comp.employeeSkillsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const employeeSkillCertificate: IEmployeeSkillCertificate = { id: 456 };
        const type: ICertificateType = { id: 17395 };
        employeeSkillCertificate.type = type;
        const skill: IEmployeeSkill = { name: 'Producer alarm' };
        employeeSkillCertificate.skill = skill;

        activatedRoute.data = of({ employeeSkillCertificate });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(employeeSkillCertificate));
        expect(comp.certificateTypesSharedCollection).toContain(type);
        expect(comp.employeeSkillsSharedCollection).toContain(skill);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const employeeSkillCertificate = { id: 123 };
        spyOn(employeeSkillCertificateService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ employeeSkillCertificate });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: employeeSkillCertificate }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(employeeSkillCertificateService.update).toHaveBeenCalledWith(employeeSkillCertificate);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const employeeSkillCertificate = new EmployeeSkillCertificate();
        spyOn(employeeSkillCertificateService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ employeeSkillCertificate });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: employeeSkillCertificate }));
        saveSubject.complete();

        // THEN
        expect(employeeSkillCertificateService.create).toHaveBeenCalledWith(employeeSkillCertificate);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const employeeSkillCertificate = { id: 123 };
        spyOn(employeeSkillCertificateService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ employeeSkillCertificate });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(employeeSkillCertificateService.update).toHaveBeenCalledWith(employeeSkillCertificate);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackCertificateTypeById', () => {
        it('Should return tracked CertificateType primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCertificateTypeById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackEmployeeSkillByName', () => {
        it('Should return tracked EmployeeSkill primary key', () => {
          const entity = { name: 'ABC' };
          const trackResult = comp.trackEmployeeSkillByName(0, entity);
          expect(trackResult).toEqual(entity.name);
        });
      });
    });
  });
});

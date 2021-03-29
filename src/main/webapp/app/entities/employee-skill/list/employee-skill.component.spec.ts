jest.mock('@angular/router');
jest.mock('primeng/api');
jest.mock('@ngx-translate/core');

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, BehaviorSubject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Confirmation, ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';

import { EmployeeSkillComponent } from './employee-skill.component';
import { EmployeeSkillService } from '../service/employee-skill.service';

describe('Component Tests', () => {
  describe('EmployeeSkill Management Component', () => {
    let comp: EmployeeSkillComponent;
    let fixture: ComponentFixture<EmployeeSkillComponent>;
    let service: EmployeeSkillService;
    let confirmationService: ConfirmationService;

    let activatedRoute: ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EmployeeSkillComponent],
        providers: [
          ConfirmationService,
          MessageService,
          TranslateService,
          Router,
          {
            provide: ActivatedRoute,
            useValue: { data: of(), queryParams: new BehaviorSubject({}) },
          },
          DatePipe,
        ],
      })
        .overrideTemplate(EmployeeSkillComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeSkillComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EmployeeSkillService);
      confirmationService = fixture.debugElement.injector.get(ConfirmationService);
      activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);

      comp.employeeSkillTable = { filters: {}, createLazyLoadMetadata: () => undefined } as Table;
    });

    it('Should call load all on init', fakeAsync(() => {
      // GIVEN
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ name: 'ABC', employee: { username: 'ABC' } }],
          })
        )
      );

      // WHEN
      fixture.detectChanges();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.employeeSkills?.[0]).toEqual(jasmine.objectContaining({ name: 'ABC', employee: { username: 'ABC' } }));
    }));

    it('should load a page', fakeAsync(() => {
      // GIVEN
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ name: 'ABC', employee: { username: 'ABC' } }],
          })
        )
      );

      // WHEN
      fixture.detectChanges();
      tick(100);
      (activatedRoute.queryParams as BehaviorSubject<any>).next({ first: 3 });

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.employeeSkills?.[0]).toEqual(jasmine.objectContaining({ name: 'ABC', employee: { username: 'ABC' } }));
    }));

    it('should call delete service using confirmDialog', fakeAsync(() => {
      // GIVEN
      spyOn(service, 'delete').and.returnValue(of({}));
      spyOn(confirmationService, 'confirm').and.callFake((confirmation: Confirmation) => {
        if (confirmation.accept) {
          confirmation.accept();
        }
      });

      // WHEN
      comp.delete('ABC', 'ABC');

      // THEN
      expect(confirmationService.confirm).toHaveBeenCalled();
      expect(service.delete).toHaveBeenCalledWith('ABC', 'ABC');
    }));
  });
});

jest.mock('@angular/router');
jest.mock('@ngx-translate/core');
jest.mock('primeng/api');
jest.mock('app/core/auth/account.service');

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, BehaviorSubject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Table } from 'primeng/table';
import { ConfirmationService, Confirmation, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

import { UserManagementService } from '../service/user-management.service';
import { User } from '../user-management.model';
import { AccountService } from 'app/core/auth/account.service';

import { UserManagementComponent } from './user-management.component';

describe('Component Tests', () => {
  describe('User Management Component', () => {
    let comp: UserManagementComponent;
    let fixture: ComponentFixture<UserManagementComponent>;
    let service: UserManagementService;
    let confirmationService: ConfirmationService;
    let activatedRoute: ActivatedRoute;
    let accountService: AccountService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [UserManagementComponent],
        providers: [
          Router,
          ConfirmationService,
          {
            provide: ActivatedRoute,
            useValue: { data: of(), queryParams: new BehaviorSubject({}) },
          },
          AccountService,
          MessageService,
          TranslateService,
        ],
      })
        .overrideTemplate(UserManagementComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserManagementComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(UserManagementService);
      confirmationService = fixture.debugElement.injector.get(ConfirmationService);
      activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
      accountService = TestBed.inject(AccountService);
      accountService.identity = jest.fn(() => of(null));

      comp.userTable = { filters: {}, createLazyLoadMetadata: () => undefined } as Table;
    });

    it('Should call load all on init', fakeAsync(() => {
      // GIVEN
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new User(123)],
          })
        )
      );

      // WHEN
      fixture.detectChanges();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.users![0]).toEqual(jasmine.objectContaining({ id: 123 }));
    }));

    it('should load a page', fakeAsync(() => {
      // GIVEN
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new User(123)],
          })
        )
      );

      // WHEN
      fixture.detectChanges();
      tick(100);
      (activatedRoute.queryParams as BehaviorSubject<any>).next({ first: 3 });

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.users![0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
      comp.delete('AAAAAAA');

      // THEN
      expect(confirmationService.confirm).toHaveBeenCalled();
      expect(service.delete).toHaveBeenCalledWith('AAAAAAA');
    }));
  });
});

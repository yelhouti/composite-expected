jest.mock('@ngx-translate/core');

import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Confirmation, ConfirmationService, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

import { WithIdStringComponent } from './with-id-string.component';
import { WithIdStringService } from '../service/with-id-string.service';

describe('Component Tests', () => {
  describe('WithIdString Management Component', () => {
    let comp: WithIdStringComponent;
    let fixture: ComponentFixture<WithIdStringComponent>;
    let service: WithIdStringService;
    let confirmationService: ConfirmationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WithIdStringComponent],
        providers: [ConfirmationService, MessageService, TranslateService],
      })
        .overrideTemplate(WithIdStringComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WithIdStringComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(WithIdStringService);
      confirmationService = fixture.debugElement.injector.get(ConfirmationService);
    });

    it('Should call load all on init', fakeAsync(() => {
      // GIVEN
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 'ABC' }],
          })
        )
      );

      // WHEN
      fixture.detectChanges();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.withIdStrings?.[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
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
      comp.delete('ABC');

      // THEN
      expect(confirmationService.confirm).toHaveBeenCalled();
      expect(service.delete).toHaveBeenCalledWith('ABC');
    }));
  });
});

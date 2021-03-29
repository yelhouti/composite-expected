jest.mock('@ngx-translate/core');

import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Confirmation, ConfirmationService, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

import { WithUUIDDetailsComponent } from './with-uuid-details.component';
import { WithUUIDDetailsService } from '../service/with-uuid-details.service';

describe('Component Tests', () => {
  describe('WithUUIDDetails Management Component', () => {
    let comp: WithUUIDDetailsComponent;
    let fixture: ComponentFixture<WithUUIDDetailsComponent>;
    let service: WithUUIDDetailsService;
    let confirmationService: ConfirmationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WithUUIDDetailsComponent],
        providers: [ConfirmationService, MessageService, TranslateService],
      })
        .overrideTemplate(WithUUIDDetailsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WithUUIDDetailsComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(WithUUIDDetailsService);
      confirmationService = fixture.debugElement.injector.get(ConfirmationService);
    });

    it('Should call load all on init', fakeAsync(() => {
      // GIVEN
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ withUUID: { uuid: '9fec3727-3421-4967-b213-ba36557ca194' } }],
          })
        )
      );

      // WHEN
      fixture.detectChanges();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.withUUIDDetails?.[0]).toEqual(jasmine.objectContaining({ withUUID: { uuid: '9fec3727-3421-4967-b213-ba36557ca194' } }));
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
      comp.delete('9fec3727-3421-4967-b213-ba36557ca194');

      // THEN
      expect(confirmationService.confirm).toHaveBeenCalled();
      expect(service.delete).toHaveBeenCalledWith('9fec3727-3421-4967-b213-ba36557ca194');
    }));
  });
});

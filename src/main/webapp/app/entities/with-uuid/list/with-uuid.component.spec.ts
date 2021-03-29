jest.mock('@ngx-translate/core');

import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Confirmation, ConfirmationService, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

import { WithUUIDComponent } from './with-uuid.component';
import { WithUUIDService } from '../service/with-uuid.service';

describe('Component Tests', () => {
  describe('WithUUID Management Component', () => {
    let comp: WithUUIDComponent;
    let fixture: ComponentFixture<WithUUIDComponent>;
    let service: WithUUIDService;
    let confirmationService: ConfirmationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WithUUIDComponent],
        providers: [ConfirmationService, MessageService, TranslateService],
      })
        .overrideTemplate(WithUUIDComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WithUUIDComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(WithUUIDService);
      confirmationService = fixture.debugElement.injector.get(ConfirmationService);
    });

    it('Should call load all on init', fakeAsync(() => {
      // GIVEN
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ uuid: '9fec3727-3421-4967-b213-ba36557ca194' }],
          })
        )
      );

      // WHEN
      fixture.detectChanges();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.withUUIDS?.[0]).toEqual(jasmine.objectContaining({ uuid: '9fec3727-3421-4967-b213-ba36557ca194' }));
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

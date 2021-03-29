jest.mock('@ngx-translate/core');

import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Confirmation, ConfirmationService, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

import { WithIdStringDetailsComponent } from './with-id-string-details.component';
import { WithIdStringDetailsService } from '../service/with-id-string-details.service';

describe('Component Tests', () => {
  describe('WithIdStringDetails Management Component', () => {
    let comp: WithIdStringDetailsComponent;
    let fixture: ComponentFixture<WithIdStringDetailsComponent>;
    let service: WithIdStringDetailsService;
    let confirmationService: ConfirmationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WithIdStringDetailsComponent],
        providers: [ConfirmationService, MessageService, TranslateService],
      })
        .overrideTemplate(WithIdStringDetailsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WithIdStringDetailsComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(WithIdStringDetailsService);
      confirmationService = fixture.debugElement.injector.get(ConfirmationService);
    });

    it('Should call load all on init', fakeAsync(() => {
      // GIVEN
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ withIdString: { id: 'ABC' } }],
          })
        )
      );

      // WHEN
      fixture.detectChanges();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.withIdStringDetails?.[0]).toEqual(jasmine.objectContaining({ withIdString: { id: 'ABC' } }));
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { WithIdStringService } from '../service/with-id-string.service';
import { WithIdString } from '../with-id-string.model';

import { WithIdStringComponent } from './with-id-string.component';

describe('Component Tests', () => {
  describe('WithIdString Management Component', () => {
    let comp: WithIdStringComponent;
    let fixture: ComponentFixture<WithIdStringComponent>;
    let service: WithIdStringService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WithIdStringComponent],
      })
        .overrideTemplate(WithIdStringComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WithIdStringComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(WithIdStringService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new WithIdString('123')],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.withIdStrings?.[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});

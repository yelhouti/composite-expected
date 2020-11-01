import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { WithIdStringDetailsService } from '../service/with-id-string-details.service';

import { WithIdStringDetailsComponent } from './with-id-string-details.component';

describe('Component Tests', () => {
  describe('WithIdStringDetails Management Component', () => {
    let comp: WithIdStringDetailsComponent;
    let fixture: ComponentFixture<WithIdStringDetailsComponent>;
    let service: WithIdStringDetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WithIdStringDetailsComponent]
      })
        .overrideTemplate(WithIdStringDetailsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WithIdStringDetailsComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(WithIdStringDetailsService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 'ABC' }],
            headers
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.withIdStringDetails?.[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });
  });
});

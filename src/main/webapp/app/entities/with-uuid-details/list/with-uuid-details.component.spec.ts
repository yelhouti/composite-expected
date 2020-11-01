import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { WithUUIDDetailsService } from '../service/with-uuid-details.service';

import { WithUUIDDetailsComponent } from './with-uuid-details.component';

describe('Component Tests', () => {
  describe('WithUUIDDetails Management Component', () => {
    let comp: WithUUIDDetailsComponent;
    let fixture: ComponentFixture<WithUUIDDetailsComponent>;
    let service: WithUUIDDetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WithUUIDDetailsComponent]
      })
        .overrideTemplate(WithUUIDDetailsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WithUUIDDetailsComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(WithUUIDDetailsService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ uuid: '9fec3727-3421-4967-b213-ba36557ca194' }],
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
      expect(comp.withUUIDDetails?.[0]).toEqual(jasmine.objectContaining({ uuid: '9fec3727-3421-4967-b213-ba36557ca194' }));
    });
  });
});

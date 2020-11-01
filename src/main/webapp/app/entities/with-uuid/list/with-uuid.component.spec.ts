import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { WithUUIDService } from '../service/with-uuid.service';

import { WithUUIDComponent } from './with-uuid.component';

describe('Component Tests', () => {
  describe('WithUUID Management Component', () => {
    let comp: WithUUIDComponent;
    let fixture: ComponentFixture<WithUUIDComponent>;
    let service: WithUUIDService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WithUUIDComponent]
      })
        .overrideTemplate(WithUUIDComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WithUUIDComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(WithUUIDService);

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
      expect(comp.withUUIDS?.[0]).toEqual(jasmine.objectContaining({ uuid: '9fec3727-3421-4967-b213-ba36557ca194' }));
    });
  });
});

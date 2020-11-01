import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WithUUID } from '../with-uuid.model';

import { WithUUIDDetailComponent } from './with-uuid-detail.component';

describe('Component Tests', () => {
  describe('WithUUID Management Detail Component', () => {
    let comp: WithUUIDDetailComponent;
    let fixture: ComponentFixture<WithUUIDDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [WithUUIDDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ withUUID: new WithUUID('9fec3727-3421-4967-b213-ba36557ca194') }) },
          },
        ],
      })
        .overrideTemplate(WithUUIDDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WithUUIDDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load withUUID on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.withUUID).toEqual(jasmine.objectContaining({ uuid: '9fec3727-3421-4967-b213-ba36557ca194' }));
      });
    });
  });
});

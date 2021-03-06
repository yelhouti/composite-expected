import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WithUUIDDetailsDetailComponent } from './with-uuid-details-detail.component';

describe('Component Tests', () => {
  describe('WithUUIDDetails Management Detail Component', () => {
    let comp: WithUUIDDetailsDetailComponent;
    let fixture: ComponentFixture<WithUUIDDetailsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [WithUUIDDetailsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ withUUIDDetails: { withUUID: { uuid: '9fec3727-3421-4967-b213-ba36557ca194' } } }) },
          },
        ],
      })
        .overrideTemplate(WithUUIDDetailsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WithUUIDDetailsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load withUUIDDetails on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.withUUIDDetails).toEqual(jasmine.objectContaining({ withUUID: { uuid: '9fec3727-3421-4967-b213-ba36557ca194' } }));
      });
    });
  });
});

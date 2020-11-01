import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WithIdStringDetailsDetailComponent } from 'app/entities/with-id-string-details/with-id-string-details-detail.component';
import { WithIdStringDetails } from 'app/shared/model/with-id-string-details.model';

describe('Component Tests', () => {
  describe('WithIdStringDetails Management Detail Component', () => {
    let comp: WithIdStringDetailsDetailComponent;
    let fixture: ComponentFixture<WithIdStringDetailsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [WithIdStringDetailsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ withIdStringDetails: new WithIdStringDetails(123) }) },
          },
        ],
      })
        .overrideTemplate(WithIdStringDetailsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WithIdStringDetailsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load withIdStringDetails on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.withIdStringDetails).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

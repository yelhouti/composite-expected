import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PriceFormulaDetailComponent } from 'app/entities/price-formula/price-formula-detail.component';
import { PriceFormula } from 'app/shared/model/price-formula.model';

describe('Component Tests', () => {
  describe('PriceFormula Management Detail Component', () => {
    let comp: PriceFormulaDetailComponent;
    let fixture: ComponentFixture<PriceFormulaDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PriceFormulaDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ priceFormula: new PriceFormula(123) }) },
          },
        ],
      })
        .overrideTemplate(PriceFormulaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PriceFormulaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load priceFormula on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.priceFormula).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

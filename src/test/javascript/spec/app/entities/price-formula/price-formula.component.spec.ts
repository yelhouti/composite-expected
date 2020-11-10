import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PriceFormulaComponent } from 'app/entities/price-formula/price-formula.component';
import { PriceFormulaService } from 'app/entities/price-formula/price-formula.service';
import { PriceFormula } from 'app/shared/model/price-formula.model';

describe('Component Tests', () => {
  describe('PriceFormula Management Component', () => {
    let comp: PriceFormulaComponent;
    let fixture: ComponentFixture<PriceFormulaComponent>;
    let service: PriceFormulaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PriceFormulaComponent],
      })
        .overrideTemplate(PriceFormulaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PriceFormulaComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PriceFormulaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PriceFormula(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.priceFormulas?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

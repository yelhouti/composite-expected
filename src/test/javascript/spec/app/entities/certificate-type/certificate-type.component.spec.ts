import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CertificateTypeComponent } from 'app/entities/certificate-type/certificate-type.component';
import { CertificateTypeService } from 'app/entities/certificate-type/certificate-type.service';
import { CertificateType } from 'app/shared/model/certificate-type.model';

describe('Component Tests', () => {
  describe('CertificateType Management Component', () => {
    let comp: CertificateTypeComponent;
    let fixture: ComponentFixture<CertificateTypeComponent>;
    let service: CertificateTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CertificateTypeComponent],
      })
        .overrideTemplate(CertificateTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CertificateTypeComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CertificateTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CertificateType(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.certificateTypes?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

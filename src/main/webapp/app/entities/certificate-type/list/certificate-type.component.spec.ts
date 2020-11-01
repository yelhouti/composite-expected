import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CertificateTypeService } from '../service/certificate-type.service';
import { CertificateType } from '../certificate-type.model';

import { CertificateTypeComponent } from './certificate-type.component';

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

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CertificateType(123)],
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
      expect(comp.certificateTypes?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

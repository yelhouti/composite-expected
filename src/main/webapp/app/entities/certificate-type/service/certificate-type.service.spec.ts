import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICertificateType, CertificateType } from '../certificate-type.model';

import { CertificateTypeService } from './certificate-type.service';

describe('Service Tests', () => {
  describe('CertificateType Service', () => {
    let service: CertificateTypeService;
    let httpMock: HttpTestingController;
    let elemDefault: ICertificateType;
    let expectedResult: ICertificateType | ICertificateType[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CertificateTypeService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = new CertificateType(0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a CertificateType', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CertificateType()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CertificateType', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CertificateType', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a CertificateType', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCertificateTypeToCollectionIfMissing', () => {
        it('should add a CertificateType to an empty array', () => {
          const certificateType: ICertificateType = { id: 123 };
          expectedResult = service.addCertificateTypeToCollectionIfMissing([], certificateType);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(certificateType);
        });

        it('should not add a CertificateType to an array that contains it', () => {
          const certificateType: ICertificateType = { id: 123 };
          const certificateTypeCollection: ICertificateType[] = [
            {
              ...certificateType,
            },
            { id: 456 },
          ];
          expectedResult = service.addCertificateTypeToCollectionIfMissing(certificateTypeCollection, certificateType);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CertificateType to an array that doesn't contain it", () => {
          const certificateType: ICertificateType = { id: 123 };
          const certificateTypeCollection: ICertificateType[] = [{ id: 456 }];
          expectedResult = service.addCertificateTypeToCollectionIfMissing(certificateTypeCollection, certificateType);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(certificateType);
        });

        it('should add only unique CertificateType to an array', () => {
          const certificateTypeArray: ICertificateType[] = [{ id: 123 }, { id: 456 }, { id: 44708 }];
          const certificateTypeCollection: ICertificateType[] = [{ id: 456 }];
          expectedResult = service.addCertificateTypeToCollectionIfMissing(certificateTypeCollection, ...certificateTypeArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const certificateType: ICertificateType = { id: 123 };
          const certificateType2: ICertificateType = { id: 456 };
          expectedResult = service.addCertificateTypeToCollectionIfMissing([], certificateType, certificateType2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(certificateType);
          expect(expectedResult).toContain(certificateType2);
        });

        it('should accept null and undefined values', () => {
          const certificateType: ICertificateType = { id: 123 };
          expectedResult = service.addCertificateTypeToCollectionIfMissing([], null, certificateType, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(certificateType);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IWithIdStringDetails, WithIdStringDetails } from '../with-id-string-details.model';

import { WithIdStringDetailsService } from './with-id-string-details.service';

describe('Service Tests', () => {
  describe('WithIdStringDetails Service', () => {
    let service: WithIdStringDetailsService;
    let httpMock: HttpTestingController;
    let elemDefault: IWithIdStringDetails;
    let expectedResult: IWithIdStringDetails | IWithIdStringDetails[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      service = TestBed.inject(WithIdStringDetailsService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 'AAAAAAA',
        details: 'AAAAAAA'
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find('ABC').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a WithIdStringDetails', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new WithIdStringDetails()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a WithIdStringDetails', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            details: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of WithIdStringDetails', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            details: 'BBBBBB'
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

      it('should delete a WithIdStringDetails', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addWithIdStringDetailsToCollectionIfMissing', () => {
        it('should add a WithIdStringDetails to an empty array', () => {
          const withIdStringDetails: IWithIdStringDetails = { id: 'ABC' };
          expectedResult = service.addWithIdStringDetailsToCollectionIfMissing([], withIdStringDetails);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(withIdStringDetails);
        });

        it('should not add a WithIdStringDetails to an array that contains it', () => {
          const withIdStringDetails: IWithIdStringDetails = { id: 'ABC' };
          const withIdStringDetailsCollection: IWithIdStringDetails[] = [
            {
              ...withIdStringDetails
            },
            { id: 'CBA' }
          ];
          expectedResult = service.addWithIdStringDetailsToCollectionIfMissing(withIdStringDetailsCollection, withIdStringDetails);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a WithIdStringDetails to an array that doesn't contain it", () => {
          const withIdStringDetails: IWithIdStringDetails = { id: 'ABC' };
          const withIdStringDetailsCollection: IWithIdStringDetails[] = [{ id: 'CBA' }];
          expectedResult = service.addWithIdStringDetailsToCollectionIfMissing(withIdStringDetailsCollection, withIdStringDetails);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(withIdStringDetails);
        });

        it('should add only unique WithIdStringDetails to an array', () => {
          const withIdStringDetailsArray: IWithIdStringDetails[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'parse' }];
          const withIdStringDetailsCollection: IWithIdStringDetails[] = [{ id: 'ABC' }];
          expectedResult = service.addWithIdStringDetailsToCollectionIfMissing(withIdStringDetailsCollection, ...withIdStringDetailsArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const withIdStringDetails: IWithIdStringDetails = { id: 'ABC' };
          const withIdStringDetails2: IWithIdStringDetails = { id: 'CBA' };
          expectedResult = service.addWithIdStringDetailsToCollectionIfMissing([], withIdStringDetails, withIdStringDetails2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(withIdStringDetails);
          expect(expectedResult).toContain(withIdStringDetails2);
        });

        it('should accept null and undefined values', () => {
          const withIdStringDetails: IWithIdStringDetails = { id: 'ABC' };
          expectedResult = service.addWithIdStringDetailsToCollectionIfMissing([], null, withIdStringDetails, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(withIdStringDetails);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IWithIdString, WithIdString } from '../with-id-string.model';

import { WithIdStringService } from './with-id-string.service';

describe('Service Tests', () => {
  describe('WithIdString Service', () => {
    let service: WithIdStringService;
    let httpMock: HttpTestingController;
    let elemDefault: IWithIdString;
    let expectedResult: IWithIdString | IWithIdString[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      service = TestBed.inject(WithIdStringService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 'AAAAAAA',
        name: 'AAAAAAA'
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

      it('should create a WithIdString', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new WithIdString()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a WithIdString', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of WithIdString', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB'
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

      it('should delete a WithIdString', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addWithIdStringToCollectionIfMissing', () => {
        it('should add a WithIdString to an empty array', () => {
          const withIdString: IWithIdString = { id: 'ABC' };
          expectedResult = service.addWithIdStringToCollectionIfMissing([], withIdString);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(withIdString);
        });

        it('should not add a WithIdString to an array that contains it', () => {
          const withIdString: IWithIdString = { id: 'ABC' };
          const withIdStringCollection: IWithIdString[] = [
            {
              ...withIdString
            },
            { id: 'CBA' }
          ];
          expectedResult = service.addWithIdStringToCollectionIfMissing(withIdStringCollection, withIdString);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a WithIdString to an array that doesn't contain it", () => {
          const withIdString: IWithIdString = { id: 'ABC' };
          const withIdStringCollection: IWithIdString[] = [{ id: 'CBA' }];
          expectedResult = service.addWithIdStringToCollectionIfMissing(withIdStringCollection, withIdString);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(withIdString);
        });

        it('should add only unique WithIdString to an array', () => {
          const withIdStringArray: IWithIdString[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'FTP hack' }];
          const withIdStringCollection: IWithIdString[] = [{ id: 'ABC' }];
          expectedResult = service.addWithIdStringToCollectionIfMissing(withIdStringCollection, ...withIdStringArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const withIdString: IWithIdString = { id: 'ABC' };
          const withIdString2: IWithIdString = { id: 'CBA' };
          expectedResult = service.addWithIdStringToCollectionIfMissing([], withIdString, withIdString2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(withIdString);
          expect(expectedResult).toContain(withIdString2);
        });

        it('should accept null and undefined values', () => {
          const withIdString: IWithIdString = { id: 'ABC' };
          expectedResult = service.addWithIdStringToCollectionIfMissing([], null, withIdString, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(withIdString);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

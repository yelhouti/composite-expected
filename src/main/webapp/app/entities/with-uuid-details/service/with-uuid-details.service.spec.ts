import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IWithUUIDDetails, WithUUIDDetails } from '../with-uuid-details.model';

import { WithUUIDDetailsService } from './with-uuid-details.service';

describe('Service Tests', () => {
  describe('WithUUIDDetails Service', () => {
    let service: WithUUIDDetailsService;
    let httpMock: HttpTestingController;
    let elemDefault: IWithUUIDDetails;
    let expectedResult: IWithUUIDDetails | IWithUUIDDetails[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      service = TestBed.inject(WithUUIDDetailsService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        uuid: 'AAAAAAA',
        details: 'AAAAAAA'
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a WithUUIDDetails', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new WithUUIDDetails()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a WithUUIDDetails', () => {
        const returnedFromService = Object.assign(
          {
            uuid: 'BBBBBB',
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

      it('should return a list of WithUUIDDetails', () => {
        const returnedFromService = Object.assign(
          {
            uuid: 'BBBBBB',
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

      it('should delete a WithUUIDDetails', () => {
        service.delete('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addWithUUIDDetailsToCollectionIfMissing', () => {
        it('should add a WithUUIDDetails to an empty array', () => {
          const withUUIDDetails: IWithUUIDDetails = { uuid: '9fec3727-3421-4967-b213-ba36557ca194' };
          expectedResult = service.addWithUUIDDetailsToCollectionIfMissing([], withUUIDDetails);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(withUUIDDetails);
        });

        it('should not add a WithUUIDDetails to an array that contains it', () => {
          const withUUIDDetails: IWithUUIDDetails = { uuid: '9fec3727-3421-4967-b213-ba36557ca194' };
          const withUUIDDetailsCollection: IWithUUIDDetails[] = [
            {
              ...withUUIDDetails
            },
            { uuid: '1361f429-3817-4123-8ee3-fdf8943310b2' }
          ];
          expectedResult = service.addWithUUIDDetailsToCollectionIfMissing(withUUIDDetailsCollection, withUUIDDetails);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a WithUUIDDetails to an array that doesn't contain it", () => {
          const withUUIDDetails: IWithUUIDDetails = { uuid: '9fec3727-3421-4967-b213-ba36557ca194' };
          const withUUIDDetailsCollection: IWithUUIDDetails[] = [{ uuid: '1361f429-3817-4123-8ee3-fdf8943310b2' }];
          expectedResult = service.addWithUUIDDetailsToCollectionIfMissing(withUUIDDetailsCollection, withUUIDDetails);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(withUUIDDetails);
        });

        it('should add only unique WithUUIDDetails to an array', () => {
          const withUUIDDetailsArray: IWithUUIDDetails[] = [
            { uuid: '9fec3727-3421-4967-b213-ba36557ca194' },
            { uuid: '1361f429-3817-4123-8ee3-fdf8943310b2' },
            { uuid: 'a08a6559-e1dc-446a-a7cc-6ee70c79686c' }
          ];
          const withUUIDDetailsCollection: IWithUUIDDetails[] = [{ uuid: '9fec3727-3421-4967-b213-ba36557ca194' }];
          expectedResult = service.addWithUUIDDetailsToCollectionIfMissing(withUUIDDetailsCollection, ...withUUIDDetailsArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const withUUIDDetails: IWithUUIDDetails = { uuid: '9fec3727-3421-4967-b213-ba36557ca194' };
          const withUUIDDetails2: IWithUUIDDetails = { uuid: '1361f429-3817-4123-8ee3-fdf8943310b2' };
          expectedResult = service.addWithUUIDDetailsToCollectionIfMissing([], withUUIDDetails, withUUIDDetails2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(withUUIDDetails);
          expect(expectedResult).toContain(withUUIDDetails2);
        });

        it('should accept null and undefined values', () => {
          const withUUIDDetails: IWithUUIDDetails = { uuid: '9fec3727-3421-4967-b213-ba36557ca194' };
          expectedResult = service.addWithUUIDDetailsToCollectionIfMissing([], null, withUUIDDetails, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(withUUIDDetails);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

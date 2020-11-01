import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IWithUUID, WithUUID } from '../with-uuid.model';

import { WithUUIDService } from './with-uuid.service';

describe('Service Tests', () => {
  describe('WithUUID Service', () => {
    let service: WithUUIDService;
    let httpMock: HttpTestingController;
    let elemDefault: IWithUUID;
    let expectedResult: IWithUUID | IWithUUID[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(WithUUIDService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = new WithUUID('AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a WithUUID', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new WithUUID()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a WithUUID', () => {
        const returnedFromService = Object.assign(
          {
            uuid: 'BBBBBB',
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

      it('should return a list of WithUUID', () => {
        const returnedFromService = Object.assign(
          {
            uuid: 'BBBBBB',
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

      it('should delete a WithUUID', () => {
        service.delete('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addWithUUIDToCollectionIfMissing', () => {
        it('should add a WithUUID to an empty array', () => {
          const withUUID: IWithUUID = { uuid: '9fec3727-3421-4967-b213-ba36557ca194' };
          expectedResult = service.addWithUUIDToCollectionIfMissing([], withUUID);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(withUUID);
        });

        it('should not add a WithUUID to an array that contains it', () => {
          const withUUID: IWithUUID = { uuid: '9fec3727-3421-4967-b213-ba36557ca194' };
          const withUUIDCollection: IWithUUID[] = [
            {
              ...withUUID,
            },
            { uuid: '1361f429-3817-4123-8ee3-fdf8943310b2' },
          ];
          expectedResult = service.addWithUUIDToCollectionIfMissing(withUUIDCollection, withUUID);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a WithUUID to an array that doesn't contain it", () => {
          const withUUID: IWithUUID = { uuid: '9fec3727-3421-4967-b213-ba36557ca194' };
          const withUUIDCollection: IWithUUID[] = [{ uuid: '1361f429-3817-4123-8ee3-fdf8943310b2' }];
          expectedResult = service.addWithUUIDToCollectionIfMissing(withUUIDCollection, withUUID);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(withUUID);
        });

        it('should add only unique WithUUID to an array', () => {
          const withUUIDArray: IWithUUID[] = [
            { uuid: '9fec3727-3421-4967-b213-ba36557ca194' },
            { uuid: '1361f429-3817-4123-8ee3-fdf8943310b2' },
            { uuid: '6799bb68-79fb-48aa-b9bd-74f4f4551464' },
          ];
          const withUUIDCollection: IWithUUID[] = [{ uuid: '1361f429-3817-4123-8ee3-fdf8943310b2' }];
          expectedResult = service.addWithUUIDToCollectionIfMissing(withUUIDCollection, ...withUUIDArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const withUUID: IWithUUID = { uuid: '9fec3727-3421-4967-b213-ba36557ca194' };
          const withUUID2: IWithUUID = { uuid: '1361f429-3817-4123-8ee3-fdf8943310b2' };
          expectedResult = service.addWithUUIDToCollectionIfMissing([], withUUID, withUUID2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(withUUID);
          expect(expectedResult).toContain(withUUID2);
        });

        it('should accept null and undefined values', () => {
          const withUUID: IWithUUID = { uuid: '9fec3727-3421-4967-b213-ba36557ca194' };
          expectedResult = service.addWithUUIDToCollectionIfMissing([], null, withUUID, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(withUUID);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

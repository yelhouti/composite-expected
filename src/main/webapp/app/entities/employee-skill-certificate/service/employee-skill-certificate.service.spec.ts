import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IEmployeeSkillCertificate, EmployeeSkillCertificate } from '../employee-skill-certificate.model';

import { EmployeeSkillCertificateService } from './employee-skill-certificate.service';

describe('Service Tests', () => {
  describe('EmployeeSkillCertificate Service', () => {
    let service: EmployeeSkillCertificateService;
    let httpMock: HttpTestingController;
    let elemDefault: IEmployeeSkillCertificate;
    let expectedResult: IEmployeeSkillCertificate | IEmployeeSkillCertificate[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      service = TestBed.inject(EmployeeSkillCertificateService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        grade: 0,
        date: currentDate
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            date: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a EmployeeSkillCertificate', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            date: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate
          },
          returnedFromService
        );

        service.create(new EmployeeSkillCertificate()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EmployeeSkillCertificate', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            grade: 1,
            date: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EmployeeSkillCertificate', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            grade: 1,
            date: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a EmployeeSkillCertificate', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addEmployeeSkillCertificateToCollectionIfMissing', () => {
        it('should add a EmployeeSkillCertificate to an empty array', () => {
          const employeeSkillCertificate: IEmployeeSkillCertificate = { id: 123 };
          expectedResult = service.addEmployeeSkillCertificateToCollectionIfMissing([], employeeSkillCertificate);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(employeeSkillCertificate);
        });

        it('should not add a EmployeeSkillCertificate to an array that contains it', () => {
          const employeeSkillCertificate: IEmployeeSkillCertificate = { id: 123 };
          const employeeSkillCertificateCollection: IEmployeeSkillCertificate[] = [
            {
              ...employeeSkillCertificate
            },
            { id: 456 }
          ];
          expectedResult = service.addEmployeeSkillCertificateToCollectionIfMissing(
            employeeSkillCertificateCollection,
            employeeSkillCertificate
          );
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a EmployeeSkillCertificate to an array that doesn't contain it", () => {
          const employeeSkillCertificate: IEmployeeSkillCertificate = { id: 123 };
          const employeeSkillCertificateCollection: IEmployeeSkillCertificate[] = [{ id: 456 }];
          expectedResult = service.addEmployeeSkillCertificateToCollectionIfMissing(
            employeeSkillCertificateCollection,
            employeeSkillCertificate
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(employeeSkillCertificate);
        });

        it('should add only unique EmployeeSkillCertificate to an array', () => {
          const employeeSkillCertificateArray: IEmployeeSkillCertificate[] = [{ id: 123 }, { id: 456 }, { id: 94448 }];
          const employeeSkillCertificateCollection: IEmployeeSkillCertificate[] = [{ id: 123 }];
          expectedResult = service.addEmployeeSkillCertificateToCollectionIfMissing(
            employeeSkillCertificateCollection,
            ...employeeSkillCertificateArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const employeeSkillCertificate: IEmployeeSkillCertificate = { id: 123 };
          const employeeSkillCertificate2: IEmployeeSkillCertificate = { id: 456 };
          expectedResult = service.addEmployeeSkillCertificateToCollectionIfMissing(
            [],
            employeeSkillCertificate,
            employeeSkillCertificate2
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(employeeSkillCertificate);
          expect(expectedResult).toContain(employeeSkillCertificate2);
        });

        it('should accept null and undefined values', () => {
          const employeeSkillCertificate: IEmployeeSkillCertificate = { id: 123 };
          expectedResult = service.addEmployeeSkillCertificateToCollectionIfMissing([], null, employeeSkillCertificate, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(employeeSkillCertificate);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

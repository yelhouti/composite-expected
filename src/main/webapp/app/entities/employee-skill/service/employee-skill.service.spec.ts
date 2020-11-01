import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEmployeeSkill, EmployeeSkill } from '../employee-skill.model';

import { EmployeeSkillService } from './employee-skill.service';

describe('Service Tests', () => {
  describe('EmployeeSkill Service', () => {
    let service: EmployeeSkillService;
    let httpMock: HttpTestingController;
    let elemDefault: IEmployeeSkill;
    let expectedResult: IEmployeeSkill | IEmployeeSkill[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      service = TestBed.inject(EmployeeSkillService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        name: 'AAAAAAA',
        level: 0
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

      it('should create a EmployeeSkill', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new EmployeeSkill()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EmployeeSkill', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            level: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EmployeeSkill', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            level: 1
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

      it('should delete a EmployeeSkill', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addEmployeeSkillToCollectionIfMissing', () => {
        it('should add a EmployeeSkill to an empty array', () => {
          const employeeSkill: IEmployeeSkill = { name: 'ABC' };
          expectedResult = service.addEmployeeSkillToCollectionIfMissing([], employeeSkill);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(employeeSkill);
        });

        it('should not add a EmployeeSkill to an array that contains it', () => {
          const employeeSkill: IEmployeeSkill = { name: 'ABC' };
          const employeeSkillCollection: IEmployeeSkill[] = [
            {
              ...employeeSkill
            },
            { name: 'CBA' }
          ];
          expectedResult = service.addEmployeeSkillToCollectionIfMissing(employeeSkillCollection, employeeSkill);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a EmployeeSkill to an array that doesn't contain it", () => {
          const employeeSkill: IEmployeeSkill = { name: 'ABC' };
          const employeeSkillCollection: IEmployeeSkill[] = [{ name: 'CBA' }];
          expectedResult = service.addEmployeeSkillToCollectionIfMissing(employeeSkillCollection, employeeSkill);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(employeeSkill);
        });

        it('should add only unique EmployeeSkill to an array', () => {
          const employeeSkillArray: IEmployeeSkill[] = [{ name: 'ABC' }, { name: 'CBA' }, { name: 'Kenya' }];
          const employeeSkillCollection: IEmployeeSkill[] = [{ name: 'ABC' }];
          expectedResult = service.addEmployeeSkillToCollectionIfMissing(employeeSkillCollection, ...employeeSkillArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const employeeSkill: IEmployeeSkill = { name: 'ABC' };
          const employeeSkill2: IEmployeeSkill = { name: 'CBA' };
          expectedResult = service.addEmployeeSkillToCollectionIfMissing([], employeeSkill, employeeSkill2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(employeeSkill);
          expect(expectedResult).toContain(employeeSkill2);
        });

        it('should accept null and undefined values', () => {
          const employeeSkill: IEmployeeSkill = { name: 'ABC' };
          expectedResult = service.addEmployeeSkillToCollectionIfMissing([], null, employeeSkill, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(employeeSkill);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

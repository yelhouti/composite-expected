import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IEmployeeSkillCertificateDetails, EmployeeSkillCertificateDetails } from '../employee-skill-certificate-details.model';

import { EmployeeSkillCertificateDetailsService } from './employee-skill-certificate-details.service';

describe('Service Tests', () => {
  describe('EmployeeSkillCertificateDetails Service', () => {
    let service: EmployeeSkillCertificateDetailsService;
    let httpMock: HttpTestingController;
    let elemDefault: IEmployeeSkillCertificateDetails;
    let expectedResult: IEmployeeSkillCertificateDetails | IEmployeeSkillCertificateDetails[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(EmployeeSkillCertificateDetailsService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        detail: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123, 'ABC', 'ABC').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a EmployeeSkillCertificateDetails', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new EmployeeSkillCertificateDetails()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EmployeeSkillCertificateDetails', () => {
        const returnedFromService = Object.assign(
          {
            detail: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EmployeeSkillCertificateDetails', () => {
        const returnedFromService = Object.assign(
          {
            detail: 'BBBBBB',
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

      it('should delete a EmployeeSkillCertificateDetails', () => {
        service.delete(123, 'ABC', 'ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

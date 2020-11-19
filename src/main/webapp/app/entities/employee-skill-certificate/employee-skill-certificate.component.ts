import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmployeeSkillCertificate } from 'app/shared/model/employee-skill-certificate.model';

import { ITEMS_PER_PAGE } from 'app/core/config/pagination.constants';
import { EmployeeSkillCertificateService } from './employee-skill-certificate.service';
import { EmployeeSkillCertificateDeleteDialogComponent } from './employee-skill-certificate-delete-dialog.component';

@Component({
  selector: 'jhi-employee-skill-certificate',
  templateUrl: './employee-skill-certificate.component.html',
})
export class EmployeeSkillCertificateComponent implements OnInit {
  employeeSkillCertificates?: IEmployeeSkillCertificate[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected employeeSkillCertificateService: EmployeeSkillCertificateService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.employeeSkillCertificateService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IEmployeeSkillCertificate[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        () => {
          this.isLoading = false;
          this.onError();
        }
      );
  }

  handleSyncList(): void {
    this.loadPage();
  }

  ngOnInit(): void {
    this.handleNavigation();
  }

  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get('sort') ?? data['defaultSort']).split(',');
      const predicate = sort[0] || '';
      const ascending = sort[1] === 'asc';
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    });
  }

  trackId(index: number, item: IEmployeeSkillCertificate): string {
    return `${item.type!.id!},${item.skill!.name!},${item.skill!.employee!.username!}`;
  }

  delete(employeeSkillCertificate: IEmployeeSkillCertificate): void {
    const modalRef = this.modalService.open(EmployeeSkillCertificateDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.employeeSkillCertificate = employeeSkillCertificate;
    modalRef.result.then(reason => {
      if (reason === 'deleted') {
        this.loadPage();
      }
    });
  }

  sort(): string[] {
    const result = [];
    if (this.predicate.length) {
      result.push(this.predicate + ',' + (this.ascending ? 'asc' : 'desc'));
    }
    return result;
  }

  protected onSuccess(data: IEmployeeSkillCertificate[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/employee-skill-certificate'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.employeeSkillCertificates = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}

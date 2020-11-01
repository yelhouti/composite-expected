import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWithUUIDDetails } from '../with-uuid-details.model';

@Component({
  selector: 'jhi-with-uuid-details-detail',
  templateUrl: './with-uuid-details-detail.component.html'
})
export class WithUUIDDetailsDetailComponent implements OnInit {
  withUUIDDetails: IWithUUIDDetails | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ withUUIDDetails }) => {
      this.withUUIDDetails = withUUIDDetails;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

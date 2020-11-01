import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWithUUID } from '../with-uuid.model';

@Component({
  selector: 'jhi-with-uuid-detail',
  templateUrl: './with-uuid-detail.component.html',
})
export class WithUUIDDetailComponent implements OnInit {
  withUUID: IWithUUID | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ withUUID }) => {
      this.withUUID = withUUID;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

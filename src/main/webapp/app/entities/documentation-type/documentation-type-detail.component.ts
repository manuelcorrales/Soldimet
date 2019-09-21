import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocumentationType } from 'app/shared/model/documentation-type.model';

@Component({
  selector: 'jhi-documentation-type-detail',
  templateUrl: './documentation-type-detail.component.html'
})
export class DocumentationTypeDetailComponent implements OnInit {
  documentationType: IDocumentationType;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ documentationType }) => {
      this.documentationType = documentationType;
    });
  }

  previousState() {
    window.history.back();
  }
}

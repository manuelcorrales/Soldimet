import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocumentationType } from '../documentation-type.model';

@Component({
  selector: 'jhi-documentation-type-detail',
  templateUrl: './documentation-type-detail.component.html',
})
export class DocumentationTypeDetailComponent implements OnInit {
  documentationType: IDocumentationType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documentationType }) => {
      this.documentationType = documentationType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRubro } from '../rubro.model';

@Component({
  selector: 'jhi-rubro-detail',
  templateUrl: './rubro-detail.component.html',
})
export class RubroDetailComponent implements OnInit {
  rubro: IRubro | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rubro }) => {
      this.rubro = rubro;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

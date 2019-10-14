import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRubro } from 'app/shared/model/rubro.model';

@Component({
  selector: 'jhi-rubro-detail',
  templateUrl: './rubro-detail.component.html'
})
export class RubroDetailComponent implements OnInit {
  rubro: IRubro;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rubro }) => {
      this.rubro = rubro;
    });
  }

  previousState() {
    window.history.back();
  }
}

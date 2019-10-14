import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBanco } from 'app/shared/model/banco.model';

@Component({
  selector: 'jhi-banco-detail',
  templateUrl: './banco-detail.component.html'
})
export class BancoDetailComponent implements OnInit {
  banco: IBanco;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ banco }) => {
      this.banco = banco;
    });
  }

  previousState() {
    window.history.back();
  }
}

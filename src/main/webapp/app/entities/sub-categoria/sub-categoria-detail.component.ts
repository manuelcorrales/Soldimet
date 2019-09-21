import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubCategoria } from 'app/shared/model/sub-categoria.model';

@Component({
  selector: 'jhi-sub-categoria-detail',
  templateUrl: './sub-categoria-detail.component.html'
})
export class SubCategoriaDetailComponent implements OnInit {
  subCategoria: ISubCategoria;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ subCategoria }) => {
      this.subCategoria = subCategoria;
    });
  }

  previousState() {
    window.history.back();
  }
}

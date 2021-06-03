import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMedidaArticulo } from 'app/shared/model/medida-articulo.model';

@Component({
  selector: 'jhi-medida-articulo-detail',
  templateUrl: './medida-articulo-detail.component.html'
})
export class MedidaArticuloDetailComponent implements OnInit {
  medidaArticulo: IMedidaArticulo;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ medidaArticulo }) => {
      this.medidaArticulo = medidaArticulo;
    });
  }

  previousState() {
    window.history.back();
  }
}

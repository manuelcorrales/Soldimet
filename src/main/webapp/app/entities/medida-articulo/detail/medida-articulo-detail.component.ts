import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMedidaArticulo } from '../medida-articulo.model';

@Component({
  selector: 'jhi-medida-articulo-detail',
  templateUrl: './medida-articulo-detail.component.html',
})
export class MedidaArticuloDetailComponent implements OnInit {
  medidaArticulo: IMedidaArticulo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medidaArticulo }) => {
      this.medidaArticulo = medidaArticulo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

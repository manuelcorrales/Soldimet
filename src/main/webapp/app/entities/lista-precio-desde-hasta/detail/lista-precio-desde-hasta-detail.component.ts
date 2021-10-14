import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IListaPrecioDesdeHasta } from '../lista-precio-desde-hasta.model';

@Component({
  selector: 'jhi-lista-precio-desde-hasta-detail',
  templateUrl: './lista-precio-desde-hasta-detail.component.html',
})
export class ListaPrecioDesdeHastaDetailComponent implements OnInit {
  listaPrecioDesdeHasta: IListaPrecioDesdeHasta | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ listaPrecioDesdeHasta }) => {
      this.listaPrecioDesdeHasta = listaPrecioDesdeHasta;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

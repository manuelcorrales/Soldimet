import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IListaPrecioRectificacionCRAM } from '../lista-precio-rectificacion-cram.model';

@Component({
  selector: 'jhi-lista-precio-rectificacion-cram-detail',
  templateUrl: './lista-precio-rectificacion-cram-detail.component.html',
})
export class ListaPrecioRectificacionCRAMDetailComponent implements OnInit {
  listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ listaPrecioRectificacionCRAM }) => {
      this.listaPrecioRectificacionCRAM = listaPrecioRectificacionCRAM;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

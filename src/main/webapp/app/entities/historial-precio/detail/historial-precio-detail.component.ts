import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHistorialPrecio } from '../historial-precio.model';

@Component({
  selector: 'jhi-historial-precio-detail',
  templateUrl: './historial-precio-detail.component.html',
})
export class HistorialPrecioDetailComponent implements OnInit {
  historialPrecio: IHistorialPrecio | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historialPrecio }) => {
      this.historialPrecio = historialPrecio;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

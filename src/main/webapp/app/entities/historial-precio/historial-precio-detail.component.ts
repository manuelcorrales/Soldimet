import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHistorialPrecio } from 'app/shared/model/historial-precio.model';

@Component({
  selector: 'jhi-historial-precio-detail',
  templateUrl: './historial-precio-detail.component.html'
})
export class HistorialPrecioDetailComponent implements OnInit {
  historialPrecio: IHistorialPrecio;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ historialPrecio }) => {
      this.historialPrecio = historialPrecio;
    });
  }

  previousState() {
    window.history.back();
  }
}

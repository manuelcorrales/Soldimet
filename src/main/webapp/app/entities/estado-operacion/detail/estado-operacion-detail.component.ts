import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoOperacion } from '../estado-operacion.model';

@Component({
  selector: 'jhi-estado-operacion-detail',
  templateUrl: './estado-operacion-detail.component.html',
})
export class EstadoOperacionDetailComponent implements OnInit {
  estadoOperacion: IEstadoOperacion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoOperacion }) => {
      this.estadoOperacion = estadoOperacion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

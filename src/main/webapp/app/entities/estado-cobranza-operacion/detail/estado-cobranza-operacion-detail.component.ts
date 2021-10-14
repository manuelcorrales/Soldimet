import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoCobranzaOperacion } from '../estado-cobranza-operacion.model';

@Component({
  selector: 'jhi-estado-cobranza-operacion-detail',
  templateUrl: './estado-cobranza-operacion-detail.component.html',
})
export class EstadoCobranzaOperacionDetailComponent implements OnInit {
  estadoCobranzaOperacion: IEstadoCobranzaOperacion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoCobranzaOperacion }) => {
      this.estadoCobranzaOperacion = estadoCobranzaOperacion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

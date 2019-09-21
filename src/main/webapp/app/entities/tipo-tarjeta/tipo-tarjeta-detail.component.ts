import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';

@Component({
  selector: 'jhi-tipo-tarjeta-detail',
  templateUrl: './tipo-tarjeta-detail.component.html'
})
export class TipoTarjetaDetailComponent implements OnInit {
  tipoTarjeta: ITipoTarjeta;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoTarjeta }) => {
      this.tipoTarjeta = tipoTarjeta;
    });
  }

  previousState() {
    window.history.back();
  }
}

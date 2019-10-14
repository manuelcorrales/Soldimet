import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICobranzaOperacion } from 'app/shared/model/cobranza-operacion.model';

@Component({
  selector: 'jhi-cobranza-operacion-detail',
  templateUrl: './cobranza-operacion-detail.component.html'
})
export class CobranzaOperacionDetailComponent implements OnInit {
  cobranzaOperacion: ICobranzaOperacion;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cobranzaOperacion }) => {
      this.cobranzaOperacion = cobranzaOperacion;
    });
  }

  previousState() {
    window.history.back();
  }
}

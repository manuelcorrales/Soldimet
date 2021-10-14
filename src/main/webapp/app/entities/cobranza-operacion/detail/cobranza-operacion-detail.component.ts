import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICobranzaOperacion } from '../cobranza-operacion.model';

@Component({
  selector: 'jhi-cobranza-operacion-detail',
  templateUrl: './cobranza-operacion-detail.component.html',
})
export class CobranzaOperacionDetailComponent implements OnInit {
  cobranzaOperacion: ICobranzaOperacion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cobranzaOperacion }) => {
      this.cobranzaOperacion = cobranzaOperacion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

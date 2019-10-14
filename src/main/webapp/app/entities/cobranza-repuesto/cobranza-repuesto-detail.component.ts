import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';

@Component({
  selector: 'jhi-cobranza-repuesto-detail',
  templateUrl: './cobranza-repuesto-detail.component.html'
})
export class CobranzaRepuestoDetailComponent implements OnInit {
  cobranzaRepuesto: ICobranzaRepuesto;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cobranzaRepuesto }) => {
      this.cobranzaRepuesto = cobranzaRepuesto;
    });
  }

  previousState() {
    window.history.back();
  }
}

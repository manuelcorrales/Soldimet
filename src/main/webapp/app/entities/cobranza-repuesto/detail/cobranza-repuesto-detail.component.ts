import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICobranzaRepuesto } from '../cobranza-repuesto.model';

@Component({
  selector: 'jhi-cobranza-repuesto-detail',
  templateUrl: './cobranza-repuesto-detail.component.html',
})
export class CobranzaRepuestoDetailComponent implements OnInit {
  cobranzaRepuesto: ICobranzaRepuesto | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cobranzaRepuesto }) => {
      this.cobranzaRepuesto = cobranzaRepuesto;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

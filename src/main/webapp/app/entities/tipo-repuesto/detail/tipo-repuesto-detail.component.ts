import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoRepuesto } from '../tipo-repuesto.model';

@Component({
  selector: 'jhi-tipo-repuesto-detail',
  templateUrl: './tipo-repuesto-detail.component.html',
})
export class TipoRepuestoDetailComponent implements OnInit {
  tipoRepuesto: ITipoRepuesto | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoRepuesto }) => {
      this.tipoRepuesto = tipoRepuesto;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

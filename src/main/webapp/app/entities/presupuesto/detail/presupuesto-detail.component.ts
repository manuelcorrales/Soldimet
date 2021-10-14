import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPresupuesto } from '../presupuesto.model';

@Component({
  selector: 'jhi-presupuesto-detail',
  templateUrl: './presupuesto-detail.component.html',
})
export class PresupuestoDetailComponent implements OnInit {
  presupuesto: IPresupuesto | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ presupuesto }) => {
      this.presupuesto = presupuesto;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

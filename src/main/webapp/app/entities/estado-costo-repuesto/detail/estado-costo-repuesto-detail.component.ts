import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoCostoRepuesto } from '../estado-costo-repuesto.model';

@Component({
  selector: 'jhi-estado-costo-repuesto-detail',
  templateUrl: './estado-costo-repuesto-detail.component.html',
})
export class EstadoCostoRepuestoDetailComponent implements OnInit {
  estadoCostoRepuesto: IEstadoCostoRepuesto | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoCostoRepuesto }) => {
      this.estadoCostoRepuesto = estadoCostoRepuesto;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

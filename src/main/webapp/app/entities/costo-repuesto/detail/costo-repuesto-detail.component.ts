import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICostoRepuesto } from '../costo-repuesto.model';

@Component({
  selector: 'jhi-costo-repuesto-detail',
  templateUrl: './costo-repuesto-detail.component.html',
})
export class CostoRepuestoDetailComponent implements OnInit {
  costoRepuesto: ICostoRepuesto | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ costoRepuesto }) => {
      this.costoRepuesto = costoRepuesto;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

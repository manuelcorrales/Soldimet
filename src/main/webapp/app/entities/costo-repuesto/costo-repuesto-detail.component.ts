import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICostoRepuesto } from 'app/shared/model/costo-repuesto.model';

@Component({
  selector: 'jhi-costo-repuesto-detail',
  templateUrl: './costo-repuesto-detail.component.html'
})
export class CostoRepuestoDetailComponent implements OnInit {
  costoRepuesto: ICostoRepuesto;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ costoRepuesto }) => {
      this.costoRepuesto = costoRepuesto;
    });
  }

  previousState() {
    window.history.back();
  }
}

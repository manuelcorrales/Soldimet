import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrecioRepuesto } from '../precio-repuesto.model';

@Component({
  selector: 'jhi-precio-repuesto-detail',
  templateUrl: './precio-repuesto-detail.component.html',
})
export class PrecioRepuestoDetailComponent implements OnInit {
  precioRepuesto: IPrecioRepuesto | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ precioRepuesto }) => {
      this.precioRepuesto = precioRepuesto;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICostoOperacion } from '../costo-operacion.model';

@Component({
  selector: 'jhi-costo-operacion-detail',
  templateUrl: './costo-operacion-detail.component.html',
})
export class CostoOperacionDetailComponent implements OnInit {
  costoOperacion: ICostoOperacion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ costoOperacion }) => {
      this.costoOperacion = costoOperacion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

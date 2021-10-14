import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAplicacion } from '../aplicacion.model';

@Component({
  selector: 'jhi-aplicacion-detail',
  templateUrl: './aplicacion-detail.component.html',
})
export class AplicacionDetailComponent implements OnInit {
  aplicacion: IAplicacion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aplicacion }) => {
      this.aplicacion = aplicacion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

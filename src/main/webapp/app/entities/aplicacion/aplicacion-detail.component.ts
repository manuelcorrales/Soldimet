import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAplicacion } from 'app/shared/model/aplicacion.model';

@Component({
  selector: 'jhi-aplicacion-detail',
  templateUrl: './aplicacion-detail.component.html'
})
export class AplicacionDetailComponent implements OnInit {
  aplicacion: IAplicacion;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ aplicacion }) => {
      this.aplicacion = aplicacion;
    });
  }

  previousState() {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocalidad } from 'app/shared/model/localidad.model';

@Component({
  selector: 'jhi-localidad-detail',
  templateUrl: './localidad-detail.component.html'
})
export class LocalidadDetailComponent implements OnInit {
  localidad: ILocalidad;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ localidad }) => {
      this.localidad = localidad;
    });
  }

  previousState() {
    window.history.back();
  }
}

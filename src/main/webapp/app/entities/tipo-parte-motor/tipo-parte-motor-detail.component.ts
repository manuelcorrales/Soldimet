import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';

@Component({
  selector: 'jhi-tipo-parte-motor-detail',
  templateUrl: './tipo-parte-motor-detail.component.html'
})
export class TipoParteMotorDetailComponent implements OnInit {
  tipoParteMotor: ITipoParteMotor;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoParteMotor }) => {
      this.tipoParteMotor = tipoParteMotor;
    });
  }

  previousState() {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoParteMotor } from '../tipo-parte-motor.model';

@Component({
  selector: 'jhi-tipo-parte-motor-detail',
  templateUrl: './tipo-parte-motor-detail.component.html',
})
export class TipoParteMotorDetailComponent implements OnInit {
  tipoParteMotor: ITipoParteMotor | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoParteMotor }) => {
      this.tipoParteMotor = tipoParteMotor;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

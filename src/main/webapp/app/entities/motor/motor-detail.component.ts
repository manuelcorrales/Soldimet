import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMotor } from 'app/shared/model/motor.model';

@Component({
  selector: 'jhi-motor-detail',
  templateUrl: './motor-detail.component.html'
})
export class MotorDetailComponent implements OnInit {
  motor: IMotor;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ motor }) => {
      this.motor = motor;
    });
  }

  previousState() {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMotor } from '../motor.model';

@Component({
  selector: 'jhi-motor-detail',
  templateUrl: './motor-detail.component.html',
})
export class MotorDetailComponent implements OnInit {
  motor: IMotor | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ motor }) => {
      this.motor = motor;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

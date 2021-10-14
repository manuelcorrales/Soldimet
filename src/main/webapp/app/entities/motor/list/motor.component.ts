import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMotor } from '../motor.model';
import { MotorService } from '../service/motor.service';
import { MotorDeleteDialogComponent } from '../delete/motor-delete-dialog.component';

@Component({
  selector: 'jhi-motor',
  templateUrl: './motor.component.html',
})
export class MotorComponent implements OnInit {
  motors?: IMotor[];
  isLoading = false;

  constructor(protected motorService: MotorService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.motorService.query().subscribe(
      (res: HttpResponse<IMotor[]>) => {
        this.isLoading = false;
        this.motors = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMotor): number {
    return item.id!;
  }

  delete(motor: IMotor): void {
    const modalRef = this.modalService.open(MotorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.motor = motor;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

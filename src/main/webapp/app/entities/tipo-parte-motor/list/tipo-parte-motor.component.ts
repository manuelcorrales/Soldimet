import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoParteMotor } from '../tipo-parte-motor.model';
import { TipoParteMotorService } from '../service/tipo-parte-motor.service';
import { TipoParteMotorDeleteDialogComponent } from '../delete/tipo-parte-motor-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-parte-motor',
  templateUrl: './tipo-parte-motor.component.html',
})
export class TipoParteMotorComponent implements OnInit {
  tipoParteMotors?: ITipoParteMotor[];
  isLoading = false;

  constructor(protected tipoParteMotorService: TipoParteMotorService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.tipoParteMotorService.query().subscribe(
      (res: HttpResponse<ITipoParteMotor[]>) => {
        this.isLoading = false;
        this.tipoParteMotors = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITipoParteMotor): number {
    return item.id!;
  }

  delete(tipoParteMotor: ITipoParteMotor): void {
    const modalRef = this.modalService.open(TipoParteMotorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoParteMotor = tipoParteMotor;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

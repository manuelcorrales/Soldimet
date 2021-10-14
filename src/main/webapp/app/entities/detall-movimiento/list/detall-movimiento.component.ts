import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetallMovimiento } from '../detall-movimiento.model';
import { DetallMovimientoService } from '../service/detall-movimiento.service';
import { DetallMovimientoDeleteDialogComponent } from '../delete/detall-movimiento-delete-dialog.component';

@Component({
  selector: 'jhi-detall-movimiento',
  templateUrl: './detall-movimiento.component.html',
})
export class DetallMovimientoComponent implements OnInit {
  detallMovimientos?: IDetallMovimiento[];
  isLoading = false;

  constructor(protected detallMovimientoService: DetallMovimientoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.detallMovimientoService.query().subscribe(
      (res: HttpResponse<IDetallMovimiento[]>) => {
        this.isLoading = false;
        this.detallMovimientos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IDetallMovimiento): number {
    return item.id!;
  }

  delete(detallMovimiento: IDetallMovimiento): void {
    const modalRef = this.modalService.open(DetallMovimientoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.detallMovimiento = detallMovimiento;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

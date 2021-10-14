import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoMovimiento } from '../estado-movimiento.model';
import { EstadoMovimientoService } from '../service/estado-movimiento.service';
import { EstadoMovimientoDeleteDialogComponent } from '../delete/estado-movimiento-delete-dialog.component';

@Component({
  selector: 'jhi-estado-movimiento',
  templateUrl: './estado-movimiento.component.html',
})
export class EstadoMovimientoComponent implements OnInit {
  estadoMovimientos?: IEstadoMovimiento[];
  isLoading = false;

  constructor(protected estadoMovimientoService: EstadoMovimientoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.estadoMovimientoService.query().subscribe(
      (res: HttpResponse<IEstadoMovimiento[]>) => {
        this.isLoading = false;
        this.estadoMovimientos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IEstadoMovimiento): number {
    return item.id!;
  }

  delete(estadoMovimiento: IEstadoMovimiento): void {
    const modalRef = this.modalService.open(EstadoMovimientoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estadoMovimiento = estadoMovimiento;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

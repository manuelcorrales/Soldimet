import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetalleMovimiento } from '../detalle-movimiento.model';
import { DetalleMovimientoService } from '../service/detalle-movimiento.service';
import { DetalleMovimientoDeleteDialogComponent } from '../delete/detalle-movimiento-delete-dialog.component';

@Component({
  selector: 'jhi-detalle-movimiento',
  templateUrl: './detalle-movimiento.component.html',
})
export class DetalleMovimientoComponent implements OnInit {
  detalleMovimientos?: IDetalleMovimiento[];
  isLoading = false;

  constructor(protected detalleMovimientoService: DetalleMovimientoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.detalleMovimientoService.query().subscribe(
      (res: HttpResponse<IDetalleMovimiento[]>) => {
        this.isLoading = false;
        this.detalleMovimientos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IDetalleMovimiento): number {
    return item.id!;
  }

  delete(detalleMovimiento: IDetalleMovimiento): void {
    const modalRef = this.modalService.open(DetalleMovimientoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.detalleMovimiento = detalleMovimiento;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

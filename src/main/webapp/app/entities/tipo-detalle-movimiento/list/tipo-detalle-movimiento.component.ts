import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoDetalleMovimiento } from '../tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoService } from '../service/tipo-detalle-movimiento.service';
import { TipoDetalleMovimientoDeleteDialogComponent } from '../delete/tipo-detalle-movimiento-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-detalle-movimiento',
  templateUrl: './tipo-detalle-movimiento.component.html',
})
export class TipoDetalleMovimientoComponent implements OnInit {
  tipoDetalleMovimientos?: ITipoDetalleMovimiento[];
  isLoading = false;

  constructor(protected tipoDetalleMovimientoService: TipoDetalleMovimientoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.tipoDetalleMovimientoService.query().subscribe(
      (res: HttpResponse<ITipoDetalleMovimiento[]>) => {
        this.isLoading = false;
        this.tipoDetalleMovimientos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITipoDetalleMovimiento): number {
    return item.id!;
  }

  delete(tipoDetalleMovimiento: ITipoDetalleMovimiento): void {
    const modalRef = this.modalService.open(TipoDetalleMovimientoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoDetalleMovimiento = tipoDetalleMovimiento;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

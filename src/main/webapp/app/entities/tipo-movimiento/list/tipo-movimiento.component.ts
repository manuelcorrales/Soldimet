import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoMovimiento } from '../tipo-movimiento.model';
import { TipoMovimientoService } from '../service/tipo-movimiento.service';
import { TipoMovimientoDeleteDialogComponent } from '../delete/tipo-movimiento-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-movimiento',
  templateUrl: './tipo-movimiento.component.html',
})
export class TipoMovimientoComponent implements OnInit {
  tipoMovimientos?: ITipoMovimiento[];
  isLoading = false;

  constructor(protected tipoMovimientoService: TipoMovimientoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.tipoMovimientoService.query().subscribe(
      (res: HttpResponse<ITipoMovimiento[]>) => {
        this.isLoading = false;
        this.tipoMovimientos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITipoMovimiento): number {
    return item.id!;
  }

  delete(tipoMovimiento: ITipoMovimiento): void {
    const modalRef = this.modalService.open(TipoMovimientoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoMovimiento = tipoMovimiento;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

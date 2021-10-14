import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetallePresupuesto } from '../detalle-presupuesto.model';
import { DetallePresupuestoService } from '../service/detalle-presupuesto.service';
import { DetallePresupuestoDeleteDialogComponent } from '../delete/detalle-presupuesto-delete-dialog.component';

@Component({
  selector: 'jhi-detalle-presupuesto',
  templateUrl: './detalle-presupuesto.component.html',
})
export class DetallePresupuestoComponent implements OnInit {
  detallePresupuestos?: IDetallePresupuesto[];
  isLoading = false;

  constructor(protected detallePresupuestoService: DetallePresupuestoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.detallePresupuestoService.query().subscribe(
      (res: HttpResponse<IDetallePresupuesto[]>) => {
        this.isLoading = false;
        this.detallePresupuestos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IDetallePresupuesto): number {
    return item.id!;
  }

  delete(detallePresupuesto: IDetallePresupuesto): void {
    const modalRef = this.modalService.open(DetallePresupuestoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.detallePresupuesto = detallePresupuesto;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

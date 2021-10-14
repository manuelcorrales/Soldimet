import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMovimientoPresupuesto } from '../movimiento-presupuesto.model';
import { MovimientoPresupuestoService } from '../service/movimiento-presupuesto.service';
import { MovimientoPresupuestoDeleteDialogComponent } from '../delete/movimiento-presupuesto-delete-dialog.component';

@Component({
  selector: 'jhi-movimiento-presupuesto',
  templateUrl: './movimiento-presupuesto.component.html',
})
export class MovimientoPresupuestoComponent implements OnInit {
  movimientoPresupuestos?: IMovimientoPresupuesto[];
  isLoading = false;

  constructor(protected movimientoPresupuestoService: MovimientoPresupuestoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.movimientoPresupuestoService.query().subscribe(
      (res: HttpResponse<IMovimientoPresupuesto[]>) => {
        this.isLoading = false;
        this.movimientoPresupuestos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMovimientoPresupuesto): number {
    return item.id!;
  }

  delete(movimientoPresupuesto: IMovimientoPresupuesto): void {
    const modalRef = this.modalService.open(MovimientoPresupuestoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.movimientoPresupuesto = movimientoPresupuesto;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

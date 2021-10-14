import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoPresupuesto } from '../estado-presupuesto.model';
import { EstadoPresupuestoService } from '../service/estado-presupuesto.service';
import { EstadoPresupuestoDeleteDialogComponent } from '../delete/estado-presupuesto-delete-dialog.component';

@Component({
  selector: 'jhi-estado-presupuesto',
  templateUrl: './estado-presupuesto.component.html',
})
export class EstadoPresupuestoComponent implements OnInit {
  estadoPresupuestos?: IEstadoPresupuesto[];
  isLoading = false;

  constructor(protected estadoPresupuestoService: EstadoPresupuestoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.estadoPresupuestoService.query().subscribe(
      (res: HttpResponse<IEstadoPresupuesto[]>) => {
        this.isLoading = false;
        this.estadoPresupuestos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IEstadoPresupuesto): number {
    return item.id!;
  }

  delete(estadoPresupuesto: IEstadoPresupuesto): void {
    const modalRef = this.modalService.open(EstadoPresupuestoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estadoPresupuesto = estadoPresupuesto;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

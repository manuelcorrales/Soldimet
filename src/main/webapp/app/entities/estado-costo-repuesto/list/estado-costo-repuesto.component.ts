import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoCostoRepuesto } from '../estado-costo-repuesto.model';
import { EstadoCostoRepuestoService } from '../service/estado-costo-repuesto.service';
import { EstadoCostoRepuestoDeleteDialogComponent } from '../delete/estado-costo-repuesto-delete-dialog.component';

@Component({
  selector: 'jhi-estado-costo-repuesto',
  templateUrl: './estado-costo-repuesto.component.html',
})
export class EstadoCostoRepuestoComponent implements OnInit {
  estadoCostoRepuestos?: IEstadoCostoRepuesto[];
  isLoading = false;

  constructor(protected estadoCostoRepuestoService: EstadoCostoRepuestoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.estadoCostoRepuestoService.query().subscribe(
      (res: HttpResponse<IEstadoCostoRepuesto[]>) => {
        this.isLoading = false;
        this.estadoCostoRepuestos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IEstadoCostoRepuesto): number {
    return item.id!;
  }

  delete(estadoCostoRepuesto: IEstadoCostoRepuesto): void {
    const modalRef = this.modalService.open(EstadoCostoRepuestoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estadoCostoRepuesto = estadoCostoRepuesto;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

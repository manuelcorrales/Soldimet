import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoPedidoRepuesto } from '../estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoService } from '../service/estado-pedido-repuesto.service';
import { EstadoPedidoRepuestoDeleteDialogComponent } from '../delete/estado-pedido-repuesto-delete-dialog.component';

@Component({
  selector: 'jhi-estado-pedido-repuesto',
  templateUrl: './estado-pedido-repuesto.component.html',
})
export class EstadoPedidoRepuestoComponent implements OnInit {
  estadoPedidoRepuestos?: IEstadoPedidoRepuesto[];
  isLoading = false;

  constructor(protected estadoPedidoRepuestoService: EstadoPedidoRepuestoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.estadoPedidoRepuestoService.query().subscribe(
      (res: HttpResponse<IEstadoPedidoRepuesto[]>) => {
        this.isLoading = false;
        this.estadoPedidoRepuestos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IEstadoPedidoRepuesto): number {
    return item.id!;
  }

  delete(estadoPedidoRepuesto: IEstadoPedidoRepuesto): void {
    const modalRef = this.modalService.open(EstadoPedidoRepuestoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estadoPedidoRepuesto = estadoPedidoRepuesto;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

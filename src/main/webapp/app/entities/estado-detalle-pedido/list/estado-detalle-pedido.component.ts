import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoDetallePedido } from '../estado-detalle-pedido.model';
import { EstadoDetallePedidoService } from '../service/estado-detalle-pedido.service';
import { EstadoDetallePedidoDeleteDialogComponent } from '../delete/estado-detalle-pedido-delete-dialog.component';

@Component({
  selector: 'jhi-estado-detalle-pedido',
  templateUrl: './estado-detalle-pedido.component.html',
})
export class EstadoDetallePedidoComponent implements OnInit {
  estadoDetallePedidos?: IEstadoDetallePedido[];
  isLoading = false;

  constructor(protected estadoDetallePedidoService: EstadoDetallePedidoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.estadoDetallePedidoService.query().subscribe(
      (res: HttpResponse<IEstadoDetallePedido[]>) => {
        this.isLoading = false;
        this.estadoDetallePedidos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IEstadoDetallePedido): number {
    return item.id!;
  }

  delete(estadoDetallePedido: IEstadoDetallePedido): void {
    const modalRef = this.modalService.open(EstadoDetallePedidoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estadoDetallePedido = estadoDetallePedido;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

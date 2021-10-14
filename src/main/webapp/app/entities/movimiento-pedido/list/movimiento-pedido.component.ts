import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMovimientoPedido } from '../movimiento-pedido.model';
import { MovimientoPedidoService } from '../service/movimiento-pedido.service';
import { MovimientoPedidoDeleteDialogComponent } from '../delete/movimiento-pedido-delete-dialog.component';

@Component({
  selector: 'jhi-movimiento-pedido',
  templateUrl: './movimiento-pedido.component.html',
})
export class MovimientoPedidoComponent implements OnInit {
  movimientoPedidos?: IMovimientoPedido[];
  isLoading = false;

  constructor(protected movimientoPedidoService: MovimientoPedidoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.movimientoPedidoService.query().subscribe(
      (res: HttpResponse<IMovimientoPedido[]>) => {
        this.isLoading = false;
        this.movimientoPedidos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMovimientoPedido): number {
    return item.id!;
  }

  delete(movimientoPedido: IMovimientoPedido): void {
    const modalRef = this.modalService.open(MovimientoPedidoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.movimientoPedido = movimientoPedido;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

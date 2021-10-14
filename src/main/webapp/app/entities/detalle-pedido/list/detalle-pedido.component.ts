import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetallePedido } from '../detalle-pedido.model';
import { DetallePedidoService } from '../service/detalle-pedido.service';
import { DetallePedidoDeleteDialogComponent } from '../delete/detalle-pedido-delete-dialog.component';

@Component({
  selector: 'jhi-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
})
export class DetallePedidoComponent implements OnInit {
  detallePedidos?: IDetallePedido[];
  isLoading = false;

  constructor(protected detallePedidoService: DetallePedidoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.detallePedidoService.query().subscribe(
      (res: HttpResponse<IDetallePedido[]>) => {
        this.isLoading = false;
        this.detallePedidos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IDetallePedido): number {
    return item.id!;
  }

  delete(detallePedido: IDetallePedido): void {
    const modalRef = this.modalService.open(DetallePedidoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.detallePedido = detallePedido;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

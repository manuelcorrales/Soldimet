import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMovimientoPedido } from 'app/shared/model/movimiento-pedido.model';
import { MovimientoPedidoService } from './movimiento-pedido.service';

@Component({
  selector: 'jhi-movimiento-pedido-delete-dialog',
  templateUrl: './movimiento-pedido-delete-dialog.component.html'
})
export class MovimientoPedidoDeleteDialogComponent {
  movimientoPedido: IMovimientoPedido;

  constructor(
    protected movimientoPedidoService: MovimientoPedidoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.movimientoPedidoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'movimientoPedidoListModification',
        content: 'Deleted an movimientoPedido'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-movimiento-pedido-delete-popup',
  template: ''
})
export class MovimientoPedidoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ movimientoPedido }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MovimientoPedidoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.movimientoPedido = movimientoPedido;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/movimiento-pedido', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/movimiento-pedido', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}

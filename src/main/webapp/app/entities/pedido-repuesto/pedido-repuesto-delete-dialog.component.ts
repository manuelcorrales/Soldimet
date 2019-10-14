import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { PedidoRepuestoService } from './pedido-repuesto.service';

@Component({
  selector: 'jhi-pedido-repuesto-delete-dialog',
  templateUrl: './pedido-repuesto-delete-dialog.component.html'
})
export class PedidoRepuestoDeleteDialogComponent {
  pedidoRepuesto: IPedidoRepuesto;

  constructor(
    protected pedidoRepuestoService: PedidoRepuestoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.pedidoRepuestoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'pedidoRepuestoListModification',
        content: 'Deleted an pedidoRepuesto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-pedido-repuesto-delete-popup',
  template: ''
})
export class PedidoRepuestoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pedidoRepuesto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PedidoRepuestoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.pedidoRepuesto = pedidoRepuesto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/pedido-repuesto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/pedido-repuesto', { outlets: { popup: null } }]);
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

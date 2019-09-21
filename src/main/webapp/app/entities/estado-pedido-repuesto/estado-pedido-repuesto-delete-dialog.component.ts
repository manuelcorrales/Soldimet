import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoService } from './estado-pedido-repuesto.service';

@Component({
  selector: 'jhi-estado-pedido-repuesto-delete-dialog',
  templateUrl: './estado-pedido-repuesto-delete-dialog.component.html'
})
export class EstadoPedidoRepuestoDeleteDialogComponent {
  estadoPedidoRepuesto: IEstadoPedidoRepuesto;

  constructor(
    protected estadoPedidoRepuestoService: EstadoPedidoRepuestoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.estadoPedidoRepuestoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'estadoPedidoRepuestoListModification',
        content: 'Deleted an estadoPedidoRepuesto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-estado-pedido-repuesto-delete-popup',
  template: ''
})
export class EstadoPedidoRepuestoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ estadoPedidoRepuesto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EstadoPedidoRepuestoDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.estadoPedidoRepuesto = estadoPedidoRepuesto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/estado-pedido-repuesto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/estado-pedido-repuesto', { outlets: { popup: null } }]);
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

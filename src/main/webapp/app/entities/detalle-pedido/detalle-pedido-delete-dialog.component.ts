import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDetallePedido } from 'app/shared/model/detalle-pedido.model';
import { DetallePedidoService } from 'app/entities/detalle-pedido/detalle-pedido.service';

@Component({
  selector: 'jhi-detalle-pedido-delete-dialog',
  templateUrl: './detalle-pedido-delete-dialog.component.html'
})
export class DetallePedidoDeleteDialogComponent {
  detallePedido: IDetallePedido;

  constructor(
    protected detallePedidoService: DetallePedidoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.detallePedidoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'detallePedidoListModification',
        content: 'Deleted an detallePedido'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-detalle-pedido-delete-popup',
  template: ''
})
export class DetallePedidoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ detallePedido }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DetallePedidoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.detallePedido = detallePedido;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/detalle-pedido', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/detalle-pedido', { outlets: { popup: null } }]);
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

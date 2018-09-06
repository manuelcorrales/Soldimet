import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstadoDetallePedido } from 'app/shared/model/estado-detalle-pedido.model';
import { EstadoDetallePedidoService } from 'app/entities/estado-detalle-pedido/estado-detalle-pedido.service';

@Component({
    selector: 'jhi-estado-detalle-pedido-delete-dialog',
    templateUrl: './estado-detalle-pedido-delete-dialog.component.html'
})
export class EstadoDetallePedidoDeleteDialogComponent {
    estadoDetallePedido: IEstadoDetallePedido;

    constructor(
        private estadoDetallePedidoService: EstadoDetallePedidoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estadoDetallePedidoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'estadoDetallePedidoListModification',
                content: 'Deleted an estadoDetallePedido'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estado-detalle-pedido-delete-popup',
    template: ''
})
export class EstadoDetallePedidoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ estadoDetallePedido }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EstadoDetallePedidoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.estadoDetallePedido = estadoDetallePedido;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
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

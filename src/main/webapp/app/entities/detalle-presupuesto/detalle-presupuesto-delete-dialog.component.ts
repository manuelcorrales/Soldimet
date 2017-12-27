import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DetallePresupuesto } from './detalle-presupuesto.model';
import { DetallePresupuestoPopupService } from './detalle-presupuesto-popup.service';
import { DetallePresupuestoService } from './detalle-presupuesto.service';

@Component({
    selector: 'jhi-detalle-presupuesto-delete-dialog',
    templateUrl: './detalle-presupuesto-delete-dialog.component.html'
})
export class DetallePresupuestoDeleteDialogComponent {

    detallePresupuesto: DetallePresupuesto;

    constructor(
        private detallePresupuestoService: DetallePresupuestoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.detallePresupuestoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'detallePresupuestoListModification',
                content: 'Deleted an detallePresupuesto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-detalle-presupuesto-delete-popup',
    template: ''
})
export class DetallePresupuestoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private detallePresupuestoPopupService: DetallePresupuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.detallePresupuestoPopupService
                .open(DetallePresupuestoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

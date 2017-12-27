import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DetalleMovimiento } from './detalle-movimiento.model';
import { DetalleMovimientoPopupService } from './detalle-movimiento-popup.service';
import { DetalleMovimientoService } from './detalle-movimiento.service';

@Component({
    selector: 'jhi-detalle-movimiento-delete-dialog',
    templateUrl: './detalle-movimiento-delete-dialog.component.html'
})
export class DetalleMovimientoDeleteDialogComponent {

    detalleMovimiento: DetalleMovimiento;

    constructor(
        private detalleMovimientoService: DetalleMovimientoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.detalleMovimientoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'detalleMovimientoListModification',
                content: 'Deleted an detalleMovimiento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-detalle-movimiento-delete-popup',
    template: ''
})
export class DetalleMovimientoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private detalleMovimientoPopupService: DetalleMovimientoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.detalleMovimientoPopupService
                .open(DetalleMovimientoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

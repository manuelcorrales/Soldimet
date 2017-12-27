import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoDetalleMovimiento } from './tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoPopupService } from './tipo-detalle-movimiento-popup.service';
import { TipoDetalleMovimientoService } from './tipo-detalle-movimiento.service';

@Component({
    selector: 'jhi-tipo-detalle-movimiento-delete-dialog',
    templateUrl: './tipo-detalle-movimiento-delete-dialog.component.html'
})
export class TipoDetalleMovimientoDeleteDialogComponent {

    tipoDetalleMovimiento: TipoDetalleMovimiento;

    constructor(
        private tipoDetalleMovimientoService: TipoDetalleMovimientoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoDetalleMovimientoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipoDetalleMovimientoListModification',
                content: 'Deleted an tipoDetalleMovimiento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-detalle-movimiento-delete-popup',
    template: ''
})
export class TipoDetalleMovimientoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoDetalleMovimientoPopupService: TipoDetalleMovimientoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoDetalleMovimientoPopupService
                .open(TipoDetalleMovimientoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

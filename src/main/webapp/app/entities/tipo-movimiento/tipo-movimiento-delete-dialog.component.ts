import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoMovimiento } from './tipo-movimiento.model';
import { TipoMovimientoPopupService } from './tipo-movimiento-popup.service';
import { TipoMovimientoService } from './tipo-movimiento.service';

@Component({
    selector: 'jhi-tipo-movimiento-delete-dialog',
    templateUrl: './tipo-movimiento-delete-dialog.component.html'
})
export class TipoMovimientoDeleteDialogComponent {

    tipoMovimiento: TipoMovimiento;

    constructor(
        private tipoMovimientoService: TipoMovimientoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoMovimientoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipoMovimientoListModification',
                content: 'Deleted an tipoMovimiento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-movimiento-delete-popup',
    template: ''
})
export class TipoMovimientoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoMovimientoPopupService: TipoMovimientoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoMovimientoPopupService
                .open(TipoMovimientoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

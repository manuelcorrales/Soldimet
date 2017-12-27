import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { HistorialPrecio } from './historial-precio.model';
import { HistorialPrecioPopupService } from './historial-precio-popup.service';
import { HistorialPrecioService } from './historial-precio.service';

@Component({
    selector: 'jhi-historial-precio-delete-dialog',
    templateUrl: './historial-precio-delete-dialog.component.html'
})
export class HistorialPrecioDeleteDialogComponent {

    historialPrecio: HistorialPrecio;

    constructor(
        private historialPrecioService: HistorialPrecioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.historialPrecioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'historialPrecioListModification',
                content: 'Deleted an historialPrecio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-historial-precio-delete-popup',
    template: ''
})
export class HistorialPrecioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private historialPrecioPopupService: HistorialPrecioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.historialPrecioPopupService
                .open(HistorialPrecioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

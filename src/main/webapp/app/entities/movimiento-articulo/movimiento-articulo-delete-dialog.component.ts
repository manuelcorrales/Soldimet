import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MovimientoArticulo } from './movimiento-articulo.model';
import { MovimientoArticuloPopupService } from './movimiento-articulo-popup.service';
import { MovimientoArticuloService } from './movimiento-articulo.service';

@Component({
    selector: 'jhi-movimiento-articulo-delete-dialog',
    templateUrl: './movimiento-articulo-delete-dialog.component.html'
})
export class MovimientoArticuloDeleteDialogComponent {

    movimientoArticulo: MovimientoArticulo;

    constructor(
        private movimientoArticuloService: MovimientoArticuloService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.movimientoArticuloService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'movimientoArticuloListModification',
                content: 'Deleted an movimientoArticulo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-movimiento-articulo-delete-popup',
    template: ''
})
export class MovimientoArticuloDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private movimientoArticuloPopupService: MovimientoArticuloPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.movimientoArticuloPopupService
                .open(MovimientoArticuloDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

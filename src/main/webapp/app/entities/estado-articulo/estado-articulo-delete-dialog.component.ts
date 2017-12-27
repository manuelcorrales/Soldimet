import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EstadoArticulo } from './estado-articulo.model';
import { EstadoArticuloPopupService } from './estado-articulo-popup.service';
import { EstadoArticuloService } from './estado-articulo.service';

@Component({
    selector: 'jhi-estado-articulo-delete-dialog',
    templateUrl: './estado-articulo-delete-dialog.component.html'
})
export class EstadoArticuloDeleteDialogComponent {

    estadoArticulo: EstadoArticulo;

    constructor(
        private estadoArticuloService: EstadoArticuloService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estadoArticuloService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'estadoArticuloListModification',
                content: 'Deleted an estadoArticulo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estado-articulo-delete-popup',
    template: ''
})
export class EstadoArticuloDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estadoArticuloPopupService: EstadoArticuloPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.estadoArticuloPopupService
                .open(EstadoArticuloDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

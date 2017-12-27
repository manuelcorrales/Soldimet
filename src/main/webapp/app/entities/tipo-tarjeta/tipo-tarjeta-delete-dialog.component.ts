import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoTarjeta } from './tipo-tarjeta.model';
import { TipoTarjetaPopupService } from './tipo-tarjeta-popup.service';
import { TipoTarjetaService } from './tipo-tarjeta.service';

@Component({
    selector: 'jhi-tipo-tarjeta-delete-dialog',
    templateUrl: './tipo-tarjeta-delete-dialog.component.html'
})
export class TipoTarjetaDeleteDialogComponent {

    tipoTarjeta: TipoTarjeta;

    constructor(
        private tipoTarjetaService: TipoTarjetaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoTarjetaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipoTarjetaListModification',
                content: 'Deleted an tipoTarjeta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-tarjeta-delete-popup',
    template: ''
})
export class TipoTarjetaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoTarjetaPopupService: TipoTarjetaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoTarjetaPopupService
                .open(TipoTarjetaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

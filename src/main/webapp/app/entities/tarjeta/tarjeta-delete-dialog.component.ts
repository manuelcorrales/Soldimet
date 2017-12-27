import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tarjeta } from './tarjeta.model';
import { TarjetaPopupService } from './tarjeta-popup.service';
import { TarjetaService } from './tarjeta.service';

@Component({
    selector: 'jhi-tarjeta-delete-dialog',
    templateUrl: './tarjeta-delete-dialog.component.html'
})
export class TarjetaDeleteDialogComponent {

    tarjeta: Tarjeta;

    constructor(
        private tarjetaService: TarjetaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tarjetaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tarjetaListModification',
                content: 'Deleted an tarjeta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tarjeta-delete-popup',
    template: ''
})
export class TarjetaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tarjetaPopupService: TarjetaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tarjetaPopupService
                .open(TarjetaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

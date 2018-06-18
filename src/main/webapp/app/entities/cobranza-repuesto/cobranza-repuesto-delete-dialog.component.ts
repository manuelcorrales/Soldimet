import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CobranzaRepuesto } from './cobranza-repuesto.model';
import { CobranzaRepuestoPopupService } from './cobranza-repuesto-popup.service';
import { CobranzaRepuestoService } from './cobranza-repuesto.service';

@Component({
    selector: 'jhi-cobranza-repuesto-delete-dialog',
    templateUrl: './cobranza-repuesto-delete-dialog.component.html'
})
export class CobranzaRepuestoDeleteDialogComponent {

    cobranzaRepuesto: CobranzaRepuesto;

    constructor(
        private cobranzaRepuestoService: CobranzaRepuestoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cobranzaRepuestoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cobranzaRepuestoListModification',
                content: 'Deleted an cobranzaRepuesto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cobranza-repuesto-delete-popup',
    template: ''
})
export class CobranzaRepuestoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cobranzaRepuestoPopupService: CobranzaRepuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cobranzaRepuestoPopupService
                .open(CobranzaRepuestoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

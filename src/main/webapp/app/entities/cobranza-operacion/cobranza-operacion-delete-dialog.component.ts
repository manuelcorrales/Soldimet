import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CobranzaOperacion } from './cobranza-operacion.model';
import { CobranzaOperacionPopupService } from './cobranza-operacion-popup.service';
import { CobranzaOperacionService } from './cobranza-operacion.service';

@Component({
    selector: 'jhi-cobranza-operacion-delete-dialog',
    templateUrl: './cobranza-operacion-delete-dialog.component.html'
})
export class CobranzaOperacionDeleteDialogComponent {

    cobranzaOperacion: CobranzaOperacion;

    constructor(
        private cobranzaOperacionService: CobranzaOperacionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cobranzaOperacionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cobranzaOperacionListModification',
                content: 'Deleted an cobranzaOperacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cobranza-operacion-delete-popup',
    template: ''
})
export class CobranzaOperacionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cobranzaOperacionPopupService: CobranzaOperacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cobranzaOperacionPopupService
                .open(CobranzaOperacionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

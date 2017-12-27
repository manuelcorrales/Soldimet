import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoRepuesto } from './tipo-repuesto.model';
import { TipoRepuestoPopupService } from './tipo-repuesto-popup.service';
import { TipoRepuestoService } from './tipo-repuesto.service';

@Component({
    selector: 'jhi-tipo-repuesto-delete-dialog',
    templateUrl: './tipo-repuesto-delete-dialog.component.html'
})
export class TipoRepuestoDeleteDialogComponent {

    tipoRepuesto: TipoRepuesto;

    constructor(
        private tipoRepuestoService: TipoRepuestoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoRepuestoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipoRepuestoListModification',
                content: 'Deleted an tipoRepuesto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-repuesto-delete-popup',
    template: ''
})
export class TipoRepuestoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoRepuestoPopupService: TipoRepuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoRepuestoPopupService
                .open(TipoRepuestoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

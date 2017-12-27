import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Aplicacion } from './aplicacion.model';
import { AplicacionPopupService } from './aplicacion-popup.service';
import { AplicacionService } from './aplicacion.service';

@Component({
    selector: 'jhi-aplicacion-delete-dialog',
    templateUrl: './aplicacion-delete-dialog.component.html'
})
export class AplicacionDeleteDialogComponent {

    aplicacion: Aplicacion;

    constructor(
        private aplicacionService: AplicacionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.aplicacionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'aplicacionListModification',
                content: 'Deleted an aplicacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-aplicacion-delete-popup',
    template: ''
})
export class AplicacionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private aplicacionPopupService: AplicacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.aplicacionPopupService
                .open(AplicacionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

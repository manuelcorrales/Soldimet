import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Localidad } from './localidad.model';
import { LocalidadPopupService } from './localidad-popup.service';
import { LocalidadService } from './localidad.service';

@Component({
    selector: 'jhi-localidad-delete-dialog',
    templateUrl: './localidad-delete-dialog.component.html'
})
export class LocalidadDeleteDialogComponent {

    localidad: Localidad;

    constructor(
        private localidadService: LocalidadService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.localidadService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'localidadListModification',
                content: 'Deleted an localidad'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-localidad-delete-popup',
    template: ''
})
export class LocalidadDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private localidadPopupService: LocalidadPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.localidadPopupService
                .open(LocalidadDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

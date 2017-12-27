import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EstadoPersona } from './estado-persona.model';
import { EstadoPersonaPopupService } from './estado-persona-popup.service';
import { EstadoPersonaService } from './estado-persona.service';

@Component({
    selector: 'jhi-estado-persona-delete-dialog',
    templateUrl: './estado-persona-delete-dialog.component.html'
})
export class EstadoPersonaDeleteDialogComponent {

    estadoPersona: EstadoPersona;

    constructor(
        private estadoPersonaService: EstadoPersonaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estadoPersonaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'estadoPersonaListModification',
                content: 'Deleted an estadoPersona'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estado-persona-delete-popup',
    template: ''
})
export class EstadoPersonaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estadoPersonaPopupService: EstadoPersonaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.estadoPersonaPopupService
                .open(EstadoPersonaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EstadoOperacion } from './estado-operacion.model';
import { EstadoOperacionPopupService } from './estado-operacion-popup.service';
import { EstadoOperacionService } from './estado-operacion.service';

@Component({
    selector: 'jhi-estado-operacion-delete-dialog',
    templateUrl: './estado-operacion-delete-dialog.component.html'
})
export class EstadoOperacionDeleteDialogComponent {

    estadoOperacion: EstadoOperacion;

    constructor(
        private estadoOperacionService: EstadoOperacionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estadoOperacionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'estadoOperacionListModification',
                content: 'Deleted an estadoOperacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estado-operacion-delete-popup',
    template: ''
})
export class EstadoOperacionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estadoOperacionPopupService: EstadoOperacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.estadoOperacionPopupService
                .open(EstadoOperacionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

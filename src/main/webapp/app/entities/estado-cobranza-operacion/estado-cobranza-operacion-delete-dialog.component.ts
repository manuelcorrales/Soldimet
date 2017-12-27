import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EstadoCobranzaOperacion } from './estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionPopupService } from './estado-cobranza-operacion-popup.service';
import { EstadoCobranzaOperacionService } from './estado-cobranza-operacion.service';

@Component({
    selector: 'jhi-estado-cobranza-operacion-delete-dialog',
    templateUrl: './estado-cobranza-operacion-delete-dialog.component.html'
})
export class EstadoCobranzaOperacionDeleteDialogComponent {

    estadoCobranzaOperacion: EstadoCobranzaOperacion;

    constructor(
        private estadoCobranzaOperacionService: EstadoCobranzaOperacionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estadoCobranzaOperacionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'estadoCobranzaOperacionListModification',
                content: 'Deleted an estadoCobranzaOperacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estado-cobranza-operacion-delete-popup',
    template: ''
})
export class EstadoCobranzaOperacionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estadoCobranzaOperacionPopupService: EstadoCobranzaOperacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.estadoCobranzaOperacionPopupService
                .open(EstadoCobranzaOperacionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

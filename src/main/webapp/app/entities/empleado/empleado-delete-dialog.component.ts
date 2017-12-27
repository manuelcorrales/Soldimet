import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Empleado } from './empleado.model';
import { EmpleadoPopupService } from './empleado-popup.service';
import { EmpleadoService } from './empleado.service';

@Component({
    selector: 'jhi-empleado-delete-dialog',
    templateUrl: './empleado-delete-dialog.component.html'
})
export class EmpleadoDeleteDialogComponent {

    empleado: Empleado;

    constructor(
        private empleadoService: EmpleadoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.empleadoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'empleadoListModification',
                content: 'Deleted an empleado'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-empleado-delete-popup',
    template: ''
})
export class EmpleadoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private empleadoPopupService: EmpleadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.empleadoPopupService
                .open(EmpleadoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

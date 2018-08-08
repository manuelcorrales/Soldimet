import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PrecioRepuesto } from './precio-repuesto.model';
import { PrecioRepuestoPopupService } from './precio-repuesto-popup.service';
import { PrecioRepuestoService } from './precio-repuesto.service';

@Component({
    selector: 'jhi-precio-repuesto-dialog',
    templateUrl: './precio-repuesto-dialog.component.html'
})
export class PrecioRepuestoDialogComponent implements OnInit {
    precioRepuesto: PrecioRepuesto;
    isSaving: boolean;
    fechaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private precioRepuestoService: PrecioRepuestoService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.precioRepuesto.id !== undefined) {
            this.subscribeToSaveResponse(this.precioRepuestoService.update(this.precioRepuesto));
        } else {
            this.subscribeToSaveResponse(this.precioRepuestoService.create(this.precioRepuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<PrecioRepuesto>) {
        result.subscribe((res: PrecioRepuesto) => this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PrecioRepuesto) {
        this.eventManager.broadcast({ name: 'precioRepuestoListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-precio-repuesto-popup',
    template: ''
})
export class PrecioRepuestoPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private precioRepuestoPopupService: PrecioRepuestoPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.precioRepuestoPopupService.open(PrecioRepuestoDialogComponent as Component, params['id']);
            } else {
                this.precioRepuestoPopupService.open(PrecioRepuestoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

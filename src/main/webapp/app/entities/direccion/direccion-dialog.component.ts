import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Direccion } from './direccion.model';
import { DireccionPopupService } from './direccion-popup.service';
import { DireccionService } from './direccion.service';
import { Localidad, LocalidadService } from '../localidad';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-direccion-dialog',
    templateUrl: './direccion-dialog.component.html'
})
export class DireccionDialogComponent implements OnInit {

    direccion: Direccion;
    isSaving: boolean;

    localidads: Localidad[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private direccionService: DireccionService,
        private localidadService: LocalidadService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.localidadService.query()
            .subscribe((res: ResponseWrapper) => { this.localidads = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.direccion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.direccionService.update(this.direccion));
        } else {
            this.subscribeToSaveResponse(
                this.direccionService.create(this.direccion));
        }
    }

    private subscribeToSaveResponse(result: Observable<Direccion>) {
        result.subscribe((res: Direccion) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Direccion) {
        this.eventManager.broadcast({ name: 'direccionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLocalidadById(index: number, item: Localidad) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-direccion-popup',
    template: ''
})
export class DireccionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private direccionPopupService: DireccionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.direccionPopupService
                    .open(DireccionDialogComponent as Component, params['id']);
            } else {
                this.direccionPopupService
                    .open(DireccionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Operacion } from './operacion.model';
import { OperacionPopupService } from './operacion-popup.service';
import { OperacionService } from './operacion.service';
import { TipoParteMotor, TipoParteMotorService } from '../tipo-parte-motor';
import { EstadoOperacion, EstadoOperacionService } from '../estado-operacion';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-operacion-dialog',
    templateUrl: './operacion-dialog.component.html'
})
export class OperacionDialogComponent implements OnInit {
    operacion: Operacion;
    isSaving: boolean;

    tipopartemotors: TipoParteMotor[];

    estadooperacions: EstadoOperacion[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private operacionService: OperacionService,
        private tipoParteMotorService: TipoParteMotorService,
        private estadoOperacionService: EstadoOperacionService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.tipoParteMotorService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tipopartemotors = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.estadoOperacionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.estadooperacions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.operacion.id !== undefined) {
            this.subscribeToSaveResponse(this.operacionService.update(this.operacion));
        } else {
            this.subscribeToSaveResponse(this.operacionService.create(this.operacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<Operacion>) {
        result.subscribe((res: Operacion) => this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Operacion) {
        this.eventManager.broadcast({ name: 'operacionListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipoParteMotorById(index: number, item: TipoParteMotor) {
        return item.id;
    }

    trackEstadoOperacionById(index: number, item: EstadoOperacion) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-operacion-popup',
    template: ''
})
export class OperacionPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private operacionPopupService: OperacionPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.operacionPopupService.open(OperacionDialogComponent as Component, params['id']);
            } else {
                this.operacionPopupService.open(OperacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DetallePresupuesto } from './detalle-presupuesto.model';
import { DetallePresupuestoPopupService } from './detalle-presupuesto-popup.service';
import { DetallePresupuestoService } from './detalle-presupuesto.service';
import { Aplicacion, AplicacionService } from '../aplicacion';
import { Cilindrada, CilindradaService } from '../cilindrada';
import { Motor, MotorService } from '../motor';
import { TipoParteMotor, TipoParteMotorService } from '../tipo-parte-motor';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-detalle-presupuesto-dialog',
    templateUrl: './detalle-presupuesto-dialog.component.html'
})
export class DetallePresupuestoDialogComponent implements OnInit {
    detallePresupuesto: DetallePresupuesto;
    isSaving: boolean;

    aplicacions: Aplicacion[];

    cilindradas: Cilindrada[];

    motors: Motor[];

    tipopartemotors: TipoParteMotor[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private detallePresupuestoService: DetallePresupuestoService,
        private aplicacionService: AplicacionService,
        private cilindradaService: CilindradaService,
        private motorService: MotorService,
        private tipoParteMotorService: TipoParteMotorService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.aplicacionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.aplicacions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.cilindradaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.cilindradas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.motorService.query().subscribe(
            (res: ResponseWrapper) => {
                this.motors = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.tipoParteMotorService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tipopartemotors = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.detallePresupuesto.id !== undefined) {
            this.subscribeToSaveResponse(this.detallePresupuestoService.update(this.detallePresupuesto));
        } else {
            this.subscribeToSaveResponse(this.detallePresupuestoService.create(this.detallePresupuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<DetallePresupuesto>) {
        result.subscribe((res: DetallePresupuesto) => this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DetallePresupuesto) {
        this.eventManager.broadcast({ name: 'detallePresupuestoListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAplicacionById(index: number, item: Aplicacion) {
        return item.id;
    }

    trackCilindradaById(index: number, item: Cilindrada) {
        return item.id;
    }

    trackMotorById(index: number, item: Motor) {
        return item.id;
    }

    trackTipoParteMotorById(index: number, item: TipoParteMotor) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-detalle-presupuesto-popup',
    template: ''
})
export class DetallePresupuestoPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private detallePresupuestoPopupService: DetallePresupuestoPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.detallePresupuestoPopupService.open(DetallePresupuestoDialogComponent as Component, params['id']);
            } else {
                this.detallePresupuestoPopupService.open(DetallePresupuestoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

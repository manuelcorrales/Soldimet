import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Presupuesto } from './presupuesto.model';
import { PresupuestoPopupService } from './presupuesto-popup.service';
import { PresupuestoService } from './presupuesto.service';
import { Cliente, ClienteService } from '../cliente';
import { EstadoPresupuesto, EstadoPresupuestoService } from '../estado-presupuesto';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-presupuesto-dialog',
    templateUrl: './presupuesto-dialog.component.html'
})
export class PresupuestoDialogComponent implements OnInit {

    presupuesto: Presupuesto;
    isSaving: boolean;

    clientes: Cliente[];

    estadopresupuestos: EstadoPresupuesto[];
    fechaCreacionDp: any;
    fechaAceptadoDp: any;
    fechaEntregadoDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private presupuestoService: PresupuestoService,
        private clienteService: ClienteService,
        private estadoPresupuestoService: EstadoPresupuestoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clienteService.query()
            .subscribe((res: ResponseWrapper) => { this.clientes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.estadoPresupuestoService.query()
            .subscribe((res: ResponseWrapper) => { this.estadopresupuestos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.presupuesto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.presupuestoService.update(this.presupuesto));
        } else {
            this.subscribeToSaveResponse(
                this.presupuestoService.create(this.presupuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<Presupuesto>) {
        result.subscribe((res: Presupuesto) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Presupuesto) {
        this.eventManager.broadcast({ name: 'presupuestoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClienteById(index: number, item: Cliente) {
        return item.id;
    }

    trackEstadoPresupuestoById(index: number, item: EstadoPresupuesto) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-presupuesto-popup',
    template: ''
})
export class PresupuestoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private presupuestoPopupService: PresupuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.presupuestoPopupService
                    .open(PresupuestoDialogComponent as Component, params['id']);
            } else {
                this.presupuestoPopupService
                    .open(PresupuestoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

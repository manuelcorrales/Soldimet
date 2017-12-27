import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Movimiento } from './movimiento.model';
import { MovimientoPopupService } from './movimiento-popup.service';
import { MovimientoService } from './movimiento.service';
import { EstadoMovimiento, EstadoMovimientoService } from '../estado-movimiento';
import { FormaDePago, FormaDePagoService } from '../forma-de-pago';
import { TipoMovimiento, TipoMovimientoService } from '../tipo-movimiento';
import { Empleado, EmpleadoService } from '../empleado';
import { Persona, PersonaService } from '../persona';
import { SubCategoria, SubCategoriaService } from '../sub-categoria';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-movimiento-dialog',
    templateUrl: './movimiento-dialog.component.html'
})
export class MovimientoDialogComponent implements OnInit {

    movimiento: Movimiento;
    isSaving: boolean;

    estadomovimientos: EstadoMovimiento[];

    formadepagos: FormaDePago[];

    tipomovimientos: TipoMovimiento[];

    empleados: Empleado[];

    personas: Persona[];

    subcategorias: SubCategoria[];
    fechaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private movimientoService: MovimientoService,
        private estadoMovimientoService: EstadoMovimientoService,
        private formaDePagoService: FormaDePagoService,
        private tipoMovimientoService: TipoMovimientoService,
        private empleadoService: EmpleadoService,
        private personaService: PersonaService,
        private subCategoriaService: SubCategoriaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.estadoMovimientoService.query()
            .subscribe((res: ResponseWrapper) => { this.estadomovimientos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.formaDePagoService.query()
            .subscribe((res: ResponseWrapper) => { this.formadepagos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipoMovimientoService.query()
            .subscribe((res: ResponseWrapper) => { this.tipomovimientos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.empleadoService.query()
            .subscribe((res: ResponseWrapper) => { this.empleados = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.personaService.query()
            .subscribe((res: ResponseWrapper) => { this.personas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.subCategoriaService.query()
            .subscribe((res: ResponseWrapper) => { this.subcategorias = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.movimiento.id !== undefined) {
            this.subscribeToSaveResponse(
                this.movimientoService.update(this.movimiento));
        } else {
            this.subscribeToSaveResponse(
                this.movimientoService.create(this.movimiento));
        }
    }

    private subscribeToSaveResponse(result: Observable<Movimiento>) {
        result.subscribe((res: Movimiento) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Movimiento) {
        this.eventManager.broadcast({ name: 'movimientoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEstadoMovimientoById(index: number, item: EstadoMovimiento) {
        return item.id;
    }

    trackFormaDePagoById(index: number, item: FormaDePago) {
        return item.id;
    }

    trackTipoMovimientoById(index: number, item: TipoMovimiento) {
        return item.id;
    }

    trackEmpleadoById(index: number, item: Empleado) {
        return item.id;
    }

    trackPersonaById(index: number, item: Persona) {
        return item.id;
    }

    trackSubCategoriaById(index: number, item: SubCategoria) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-movimiento-popup',
    template: ''
})
export class MovimientoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private movimientoPopupService: MovimientoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.movimientoPopupService
                    .open(MovimientoDialogComponent as Component, params['id']);
            } else {
                this.movimientoPopupService
                    .open(MovimientoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

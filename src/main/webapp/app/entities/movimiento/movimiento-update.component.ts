import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IMovimiento } from 'app/shared/model/movimiento.model';
import { MovimientoService } from './movimiento.service';
import { IEstadoMovimiento } from 'app/shared/model/estado-movimiento.model';
import { EstadoMovimientoService } from 'app/entities/estado-movimiento';
import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago';
import { ITipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { TipoMovimientoService } from 'app/entities/tipo-movimiento';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona';
import { ISubCategoria } from 'app/shared/model/sub-categoria.model';
import { SubCategoriaService } from 'app/entities/sub-categoria';

@Component({
    selector: 'jhi-movimiento-update',
    templateUrl: './movimiento-update.component.html'
})
export class MovimientoUpdateComponent implements OnInit {
    private _movimiento: IMovimiento;
    isSaving: boolean;

    estadomovimientos: IEstadoMovimiento[];

    formadepagos: IFormaDePago[];

    tipomovimientos: ITipoMovimiento[];

    empleados: IEmpleado[];

    personas: IPersona[];

    subcategorias: ISubCategoria[];
    fechaDp: any;
    hora: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private movimientoService: MovimientoService,
        private estadoMovimientoService: EstadoMovimientoService,
        private formaDePagoService: FormaDePagoService,
        private tipoMovimientoService: TipoMovimientoService,
        private empleadoService: EmpleadoService,
        private personaService: PersonaService,
        private subCategoriaService: SubCategoriaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ movimiento }) => {
            this.movimiento = movimiento;
        });
        this.estadoMovimientoService.query().subscribe(
            (res: HttpResponse<IEstadoMovimiento[]>) => {
                this.estadomovimientos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.formaDePagoService.query().subscribe(
            (res: HttpResponse<IFormaDePago[]>) => {
                this.formadepagos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.tipoMovimientoService.query().subscribe(
            (res: HttpResponse<ITipoMovimiento[]>) => {
                this.tipomovimientos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.empleadoService.query().subscribe(
            (res: HttpResponse<IEmpleado[]>) => {
                this.empleados = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.personaService.query().subscribe(
            (res: HttpResponse<IPersona[]>) => {
                this.personas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.subCategoriaService.query().subscribe(
            (res: HttpResponse<ISubCategoria[]>) => {
                this.subcategorias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.movimiento.hora = moment(this.hora, DATE_TIME_FORMAT);
        if (this.movimiento.id !== undefined) {
            this.subscribeToSaveResponse(this.movimientoService.update(this.movimiento));
        } else {
            this.subscribeToSaveResponse(this.movimientoService.create(this.movimiento));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMovimiento>>) {
        result.subscribe((res: HttpResponse<IMovimiento>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEstadoMovimientoById(index: number, item: IEstadoMovimiento) {
        return item.id;
    }

    trackFormaDePagoById(index: number, item: IFormaDePago) {
        return item.id;
    }

    trackTipoMovimientoById(index: number, item: ITipoMovimiento) {
        return item.id;
    }

    trackEmpleadoById(index: number, item: IEmpleado) {
        return item.id;
    }

    trackPersonaById(index: number, item: IPersona) {
        return item.id;
    }

    trackSubCategoriaById(index: number, item: ISubCategoria) {
        return item.id;
    }
    get movimiento() {
        return this._movimiento;
    }

    set movimiento(movimiento: IMovimiento) {
        this._movimiento = movimiento;
        this.hora = moment(movimiento.hora).format(DATE_TIME_FORMAT);
    }
}

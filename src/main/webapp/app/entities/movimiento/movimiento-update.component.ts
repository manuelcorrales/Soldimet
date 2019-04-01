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
import { ITipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { TipoMovimientoService } from 'app/entities/tipo-movimiento';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona';
import { ICaja } from 'app/shared/model/caja.model';
import { CajaService } from 'app/entities/caja';
import { ISubCategoria } from 'app/shared/model/sub-categoria.model';
import { SubCategoriaService } from 'app/entities/sub-categoria';
import { IMedioDePago } from 'app/shared/model/medio-de-pago.model';
import { MedioDePagoService } from 'app/entities/medio-de-pago';

@Component({
    selector: 'jhi-movimiento-update',
    templateUrl: './movimiento-update.component.html'
})
export class MovimientoUpdateComponent implements OnInit {
    private _movimiento: IMovimiento;
    isSaving: boolean;

    estadomovimientos: IEstadoMovimiento[];

    tipomovimientos: ITipoMovimiento[];

    empleados: IEmpleado[];

    personas: IPersona[];

    cajas: ICaja[];

    subcategorias: ISubCategoria[];

    mediodepagos: IMedioDePago[];
    fechaDp: any;
    hora: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private movimientoService: MovimientoService,
        private estadoMovimientoService: EstadoMovimientoService,
        private tipoMovimientoService: TipoMovimientoService,
        private empleadoService: EmpleadoService,
        private personaService: PersonaService,
        private cajaService: CajaService,
        private subCategoriaService: SubCategoriaService,
        private medioDePagoService: MedioDePagoService,
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
        this.cajaService.query().subscribe(
            (res: HttpResponse<ICaja[]>) => {
                this.cajas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.subCategoriaService.query().subscribe(
            (res: HttpResponse<ISubCategoria[]>) => {
                this.subcategorias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.medioDePagoService.query({ filter: 'movimiento-is-null' }).subscribe(
            (res: HttpResponse<IMedioDePago[]>) => {
                if (!this.movimiento.medioDePago || !this.movimiento.medioDePago.id) {
                    this.mediodepagos = res.body;
                } else {
                    this.medioDePagoService.find(this.movimiento.medioDePago.id).subscribe(
                        (subRes: HttpResponse<IMedioDePago>) => {
                            this.mediodepagos = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
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

    trackTipoMovimientoById(index: number, item: ITipoMovimiento) {
        return item.id;
    }

    trackEmpleadoById(index: number, item: IEmpleado) {
        return item.id;
    }

    trackPersonaById(index: number, item: IPersona) {
        return item.id;
    }

    trackCajaById(index: number, item: ICaja) {
        return item.id;
    }

    trackSubCategoriaById(index: number, item: ISubCategoria) {
        return item.id;
    }

    trackMedioDePagoById(index: number, item: IMedioDePago) {
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

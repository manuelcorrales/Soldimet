import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { DetallePresupuestoService } from './detalle-presupuesto.service';
import { IAplicacion } from 'app/shared/model/aplicacion.model';
import { AplicacionService } from 'app/entities/aplicacion';
import { ICilindrada } from 'app/shared/model/cilindrada.model';
import { CilindradaService } from 'app/entities/cilindrada';
import { IMotor } from 'app/shared/model/motor.model';
import { MotorService } from 'app/entities/motor';
import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor';

@Component({
    selector: 'jhi-detalle-presupuesto-update',
    templateUrl: './detalle-presupuesto-update.component.html'
})
export class DetallePresupuestoUpdateComponent implements OnInit {
    private _detallePresupuesto: IDetallePresupuesto;
    isSaving: boolean;

    aplicacions: IAplicacion[];

    cilindradas: ICilindrada[];

    motors: IMotor[];

    tipopartemotors: ITipoParteMotor[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private detallePresupuestoService: DetallePresupuestoService,
        private aplicacionService: AplicacionService,
        private cilindradaService: CilindradaService,
        private motorService: MotorService,
        private tipoParteMotorService: TipoParteMotorService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ detallePresupuesto }) => {
            this.detallePresupuesto = detallePresupuesto;
        });
        this.aplicacionService.query().subscribe(
            (res: HttpResponse<IAplicacion[]>) => {
                this.aplicacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.cilindradaService.query().subscribe(
            (res: HttpResponse<ICilindrada[]>) => {
                this.cilindradas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.motorService.query().subscribe(
            (res: HttpResponse<IMotor[]>) => {
                this.motors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.tipoParteMotorService.query().subscribe(
            (res: HttpResponse<ITipoParteMotor[]>) => {
                this.tipopartemotors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.detallePresupuesto.id !== undefined) {
            this.subscribeToSaveResponse(this.detallePresupuestoService.update(this.detallePresupuesto));
        } else {
            this.subscribeToSaveResponse(this.detallePresupuestoService.create(this.detallePresupuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDetallePresupuesto>>) {
        result.subscribe((res: HttpResponse<IDetallePresupuesto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAplicacionById(index: number, item: IAplicacion) {
        return item.id;
    }

    trackCilindradaById(index: number, item: ICilindrada) {
        return item.id;
    }

    trackMotorById(index: number, item: IMotor) {
        return item.id;
    }

    trackTipoParteMotorById(index: number, item: ITipoParteMotor) {
        return item.id;
    }
    get detallePresupuesto() {
        return this._detallePresupuesto;
    }

    set detallePresupuesto(detallePresupuesto: IDetallePresupuesto) {
        this._detallePresupuesto = detallePresupuesto;
    }
}

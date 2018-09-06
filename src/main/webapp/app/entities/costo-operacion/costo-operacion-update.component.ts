import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICostoOperacion } from 'app/shared/model/costo-operacion.model';
import { CostoOperacionService } from 'app/entities/costo-operacion/costo-operacion.service';
import { ICilindrada } from 'app/shared/model/cilindrada.model';
import { CilindradaService } from 'app/entities/cilindrada';
import { IOperacion } from 'app/shared/model/operacion.model';
import { OperacionService } from 'app/entities/operacion';
import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor';

@Component({
    selector: 'jhi-costo-operacion-update',
    templateUrl: './costo-operacion-update.component.html'
})
export class CostoOperacionUpdateComponent implements OnInit {
    private _costoOperacion: ICostoOperacion;
    isSaving: boolean;

    cilindradas: ICilindrada[];

    operacions: IOperacion[];

    tipopartemotors: ITipoParteMotor[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private costoOperacionService: CostoOperacionService,
        private cilindradaService: CilindradaService,
        private operacionService: OperacionService,
        private tipoParteMotorService: TipoParteMotorService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ costoOperacion }) => {
            this.costoOperacion = costoOperacion;
        });
        this.cilindradaService.query().subscribe(
            (res: HttpResponse<ICilindrada[]>) => {
                this.cilindradas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.operacionService.query().subscribe(
            (res: HttpResponse<IOperacion[]>) => {
                this.operacions = res.body;
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
        if (this.costoOperacion.id !== undefined) {
            this.subscribeToSaveResponse(this.costoOperacionService.update(this.costoOperacion));
        } else {
            this.subscribeToSaveResponse(this.costoOperacionService.create(this.costoOperacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICostoOperacion>>) {
        result.subscribe((res: HttpResponse<ICostoOperacion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCilindradaById(index: number, item: ICilindrada) {
        return item.id;
    }

    trackOperacionById(index: number, item: IOperacion) {
        return item.id;
    }

    trackTipoParteMotorById(index: number, item: ITipoParteMotor) {
        return item.id;
    }
    get costoOperacion() {
        return this._costoOperacion;
    }

    set costoOperacion(costoOperacion: ICostoOperacion) {
        this._costoOperacion = costoOperacion;
    }
}

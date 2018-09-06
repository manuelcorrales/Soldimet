import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IOperacion } from 'app/shared/model/operacion.model';
import { OperacionService } from 'app/entities/operacion/operacion.service';
import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor';
import { IEstadoOperacion } from 'app/shared/model/estado-operacion.model';
import { EstadoOperacionService } from 'app/entities/estado-operacion';

@Component({
    selector: 'jhi-operacion-update',
    templateUrl: './operacion-update.component.html'
})
export class OperacionUpdateComponent implements OnInit {
    private _operacion: IOperacion;
    isSaving: boolean;

    tipopartemotors: ITipoParteMotor[];

    estadooperacions: IEstadoOperacion[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private operacionService: OperacionService,
        private tipoParteMotorService: TipoParteMotorService,
        private estadoOperacionService: EstadoOperacionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ operacion }) => {
            this.operacion = operacion;
        });
        this.tipoParteMotorService.query().subscribe(
            (res: HttpResponse<ITipoParteMotor[]>) => {
                this.tipopartemotors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.estadoOperacionService.query().subscribe(
            (res: HttpResponse<IEstadoOperacion[]>) => {
                this.estadooperacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.operacion.id !== undefined) {
            this.subscribeToSaveResponse(this.operacionService.update(this.operacion));
        } else {
            this.subscribeToSaveResponse(this.operacionService.create(this.operacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOperacion>>) {
        result.subscribe((res: HttpResponse<IOperacion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTipoParteMotorById(index: number, item: ITipoParteMotor) {
        return item.id;
    }

    trackEstadoOperacionById(index: number, item: IEstadoOperacion) {
        return item.id;
    }
    get operacion() {
        return this._operacion;
    }

    set operacion(operacion: IOperacion) {
        this._operacion = operacion;
    }
}

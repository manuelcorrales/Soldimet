import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICobranzaOperacion } from 'app/shared/model/cobranza-operacion.model';
import { CobranzaOperacionService } from './cobranza-operacion.service';
import { IEstadoCobranzaOperacion } from 'app/shared/model/estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionService } from 'app/entities/estado-cobranza-operacion';
import { IOperacion } from 'app/shared/model/operacion.model';
import { OperacionService } from 'app/entities/operacion';

@Component({
    selector: 'jhi-cobranza-operacion-update',
    templateUrl: './cobranza-operacion-update.component.html'
})
export class CobranzaOperacionUpdateComponent implements OnInit {
    private _cobranzaOperacion: ICobranzaOperacion;
    isSaving: boolean;

    estadocobranzaoperacions: IEstadoCobranzaOperacion[];

    operacions: IOperacion[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private cobranzaOperacionService: CobranzaOperacionService,
        private estadoCobranzaOperacionService: EstadoCobranzaOperacionService,
        private operacionService: OperacionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cobranzaOperacion }) => {
            this.cobranzaOperacion = cobranzaOperacion;
        });
        this.estadoCobranzaOperacionService.query().subscribe(
            (res: HttpResponse<IEstadoCobranzaOperacion[]>) => {
                this.estadocobranzaoperacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.operacionService.query().subscribe(
            (res: HttpResponse<IOperacion[]>) => {
                this.operacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cobranzaOperacion.id !== undefined) {
            this.subscribeToSaveResponse(this.cobranzaOperacionService.update(this.cobranzaOperacion));
        } else {
            this.subscribeToSaveResponse(this.cobranzaOperacionService.create(this.cobranzaOperacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICobranzaOperacion>>) {
        result.subscribe((res: HttpResponse<ICobranzaOperacion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEstadoCobranzaOperacionById(index: number, item: IEstadoCobranzaOperacion) {
        return item.id;
    }

    trackOperacionById(index: number, item: IOperacion) {
        return item.id;
    }
    get cobranzaOperacion() {
        return this._cobranzaOperacion;
    }

    set cobranzaOperacion(cobranzaOperacion: ICobranzaOperacion) {
        this._cobranzaOperacion = cobranzaOperacion;
    }
}

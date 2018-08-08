import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';
import { TipoTarjetaService } from './tipo-tarjeta.service';

@Component({
    selector: 'jhi-tipo-tarjeta-update',
    templateUrl: './tipo-tarjeta-update.component.html'
})
export class TipoTarjetaUpdateComponent implements OnInit {
    private _tipoTarjeta: ITipoTarjeta;
    isSaving: boolean;

    constructor(private tipoTarjetaService: TipoTarjetaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tipoTarjeta }) => {
            this.tipoTarjeta = tipoTarjeta;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tipoTarjeta.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoTarjetaService.update(this.tipoTarjeta));
        } else {
            this.subscribeToSaveResponse(this.tipoTarjetaService.create(this.tipoTarjeta));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITipoTarjeta>>) {
        result.subscribe((res: HttpResponse<ITipoTarjeta>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get tipoTarjeta() {
        return this._tipoTarjeta;
    }

    set tipoTarjeta(tipoTarjeta: ITipoTarjeta) {
        this._tipoTarjeta = tipoTarjeta;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEstadoCobranzaOperacion } from 'app/shared/model/estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionService } from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion.service';

@Component({
    selector: 'jhi-estado-cobranza-operacion-update',
    templateUrl: './estado-cobranza-operacion-update.component.html'
})
export class EstadoCobranzaOperacionUpdateComponent implements OnInit {
    private _estadoCobranzaOperacion: IEstadoCobranzaOperacion;
    isSaving: boolean;

    constructor(private estadoCobranzaOperacionService: EstadoCobranzaOperacionService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ estadoCobranzaOperacion }) => {
            this.estadoCobranzaOperacion = estadoCobranzaOperacion;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.estadoCobranzaOperacion.id !== undefined) {
            this.subscribeToSaveResponse(this.estadoCobranzaOperacionService.update(this.estadoCobranzaOperacion));
        } else {
            this.subscribeToSaveResponse(this.estadoCobranzaOperacionService.create(this.estadoCobranzaOperacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoCobranzaOperacion>>) {
        result.subscribe(
            (res: HttpResponse<IEstadoCobranzaOperacion>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get estadoCobranzaOperacion() {
        return this._estadoCobranzaOperacion;
    }

    set estadoCobranzaOperacion(estadoCobranzaOperacion: IEstadoCobranzaOperacion) {
        this._estadoCobranzaOperacion = estadoCobranzaOperacion;
    }
}

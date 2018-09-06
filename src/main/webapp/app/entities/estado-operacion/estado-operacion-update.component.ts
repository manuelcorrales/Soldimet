import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEstadoOperacion } from 'app/shared/model/estado-operacion.model';
import { EstadoOperacionService } from 'app/entities/estado-operacion/estado-operacion.service';

@Component({
    selector: 'jhi-estado-operacion-update',
    templateUrl: './estado-operacion-update.component.html'
})
export class EstadoOperacionUpdateComponent implements OnInit {
    private _estadoOperacion: IEstadoOperacion;
    isSaving: boolean;

    constructor(private estadoOperacionService: EstadoOperacionService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ estadoOperacion }) => {
            this.estadoOperacion = estadoOperacion;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.estadoOperacion.id !== undefined) {
            this.subscribeToSaveResponse(this.estadoOperacionService.update(this.estadoOperacion));
        } else {
            this.subscribeToSaveResponse(this.estadoOperacionService.create(this.estadoOperacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoOperacion>>) {
        result.subscribe((res: HttpResponse<IEstadoOperacion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get estadoOperacion() {
        return this._estadoOperacion;
    }

    set estadoOperacion(estadoOperacion: IEstadoOperacion) {
        this._estadoOperacion = estadoOperacion;
    }
}

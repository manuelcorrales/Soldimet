import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEstadoArticulo } from 'app/shared/model/estado-articulo.model';
import { EstadoArticuloService } from './estado-articulo.service';

@Component({
    selector: 'jhi-estado-articulo-update',
    templateUrl: './estado-articulo-update.component.html'
})
export class EstadoArticuloUpdateComponent implements OnInit {
    private _estadoArticulo: IEstadoArticulo;
    isSaving: boolean;

    constructor(private estadoArticuloService: EstadoArticuloService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ estadoArticulo }) => {
            this.estadoArticulo = estadoArticulo;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.estadoArticulo.id !== undefined) {
            this.subscribeToSaveResponse(this.estadoArticuloService.update(this.estadoArticulo));
        } else {
            this.subscribeToSaveResponse(this.estadoArticuloService.create(this.estadoArticulo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoArticulo>>) {
        result.subscribe((res: HttpResponse<IEstadoArticulo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get estadoArticulo() {
        return this._estadoArticulo;
    }

    set estadoArticulo(estadoArticulo: IEstadoArticulo) {
        this._estadoArticulo = estadoArticulo;
    }
}

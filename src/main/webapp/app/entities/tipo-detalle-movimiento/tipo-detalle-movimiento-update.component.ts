import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoService } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.service';

@Component({
    selector: 'jhi-tipo-detalle-movimiento-update',
    templateUrl: './tipo-detalle-movimiento-update.component.html'
})
export class TipoDetalleMovimientoUpdateComponent implements OnInit {
    private _tipoDetalleMovimiento: ITipoDetalleMovimiento;
    isSaving: boolean;

    constructor(private tipoDetalleMovimientoService: TipoDetalleMovimientoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tipoDetalleMovimiento }) => {
            this.tipoDetalleMovimiento = tipoDetalleMovimiento;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tipoDetalleMovimiento.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoDetalleMovimientoService.update(this.tipoDetalleMovimiento));
        } else {
            this.subscribeToSaveResponse(this.tipoDetalleMovimientoService.create(this.tipoDetalleMovimiento));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITipoDetalleMovimiento>>) {
        result.subscribe(
            (res: HttpResponse<ITipoDetalleMovimiento>) => this.onSaveSuccess(),
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
    get tipoDetalleMovimiento() {
        return this._tipoDetalleMovimiento;
    }

    set tipoDetalleMovimiento(tipoDetalleMovimiento: ITipoDetalleMovimiento) {
        this._tipoDetalleMovimiento = tipoDetalleMovimiento;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEstadoMovimiento } from 'app/shared/model/estado-movimiento.model';
import { EstadoMovimientoService } from 'app/entities/estado-movimiento/estado-movimiento.service';

@Component({
    selector: 'jhi-estado-movimiento-update',
    templateUrl: './estado-movimiento-update.component.html'
})
export class EstadoMovimientoUpdateComponent implements OnInit {
    private _estadoMovimiento: IEstadoMovimiento;
    isSaving: boolean;

    constructor(private estadoMovimientoService: EstadoMovimientoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ estadoMovimiento }) => {
            this.estadoMovimiento = estadoMovimiento;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.estadoMovimiento.id !== undefined) {
            this.subscribeToSaveResponse(this.estadoMovimientoService.update(this.estadoMovimiento));
        } else {
            this.subscribeToSaveResponse(this.estadoMovimientoService.create(this.estadoMovimiento));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoMovimiento>>) {
        result.subscribe((res: HttpResponse<IEstadoMovimiento>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get estadoMovimiento() {
        return this._estadoMovimiento;
    }

    set estadoMovimiento(estadoMovimiento: IEstadoMovimiento) {
        this._estadoMovimiento = estadoMovimiento;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { TipoMovimientoService } from './tipo-movimiento.service';

@Component({
    selector: 'jhi-tipo-movimiento-update',
    templateUrl: './tipo-movimiento-update.component.html'
})
export class TipoMovimientoUpdateComponent implements OnInit {
    private _tipoMovimiento: ITipoMovimiento;
    isSaving: boolean;

    constructor(private tipoMovimientoService: TipoMovimientoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tipoMovimiento }) => {
            this.tipoMovimiento = tipoMovimiento;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tipoMovimiento.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoMovimientoService.update(this.tipoMovimiento));
        } else {
            this.subscribeToSaveResponse(this.tipoMovimientoService.create(this.tipoMovimiento));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITipoMovimiento>>) {
        result.subscribe((res: HttpResponse<ITipoMovimiento>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get tipoMovimiento() {
        return this._tipoMovimiento;
    }

    set tipoMovimiento(tipoMovimiento: ITipoMovimiento) {
        this._tipoMovimiento = tipoMovimiento;
    }
}

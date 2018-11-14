import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';
import { EstadoCostoRepuestoService } from './estado-costo-repuesto.service';

@Component({
    selector: 'jhi-estado-costo-repuesto-update',
    templateUrl: './estado-costo-repuesto-update.component.html'
})
export class EstadoCostoRepuestoUpdateComponent implements OnInit {
    private _estadoCostoRepuesto: IEstadoCostoRepuesto;
    isSaving: boolean;

    constructor(private estadoCostoRepuestoService: EstadoCostoRepuestoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ estadoCostoRepuesto }) => {
            this.estadoCostoRepuesto = estadoCostoRepuesto;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.estadoCostoRepuesto.id !== undefined) {
            this.subscribeToSaveResponse(this.estadoCostoRepuestoService.update(this.estadoCostoRepuesto));
        } else {
            this.subscribeToSaveResponse(this.estadoCostoRepuestoService.create(this.estadoCostoRepuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoCostoRepuesto>>) {
        result.subscribe((res: HttpResponse<IEstadoCostoRepuesto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get estadoCostoRepuesto() {
        return this._estadoCostoRepuesto;
    }

    set estadoCostoRepuesto(estadoCostoRepuesto: IEstadoCostoRepuesto) {
        this._estadoCostoRepuesto = estadoCostoRepuesto;
    }
}

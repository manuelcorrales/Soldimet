import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';
import { EstadoPresupuestoService } from 'app/entities/estado-presupuesto/estado-presupuesto.service';

@Component({
    selector: 'jhi-estado-presupuesto-update',
    templateUrl: './estado-presupuesto-update.component.html'
})
export class EstadoPresupuestoUpdateComponent implements OnInit {
    private _estadoPresupuesto: IEstadoPresupuesto;
    isSaving: boolean;

    constructor(private estadoPresupuestoService: EstadoPresupuestoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ estadoPresupuesto }) => {
            this.estadoPresupuesto = estadoPresupuesto;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.estadoPresupuesto.id !== undefined) {
            this.subscribeToSaveResponse(this.estadoPresupuestoService.update(this.estadoPresupuesto));
        } else {
            this.subscribeToSaveResponse(this.estadoPresupuestoService.create(this.estadoPresupuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoPresupuesto>>) {
        result.subscribe((res: HttpResponse<IEstadoPresupuesto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get estadoPresupuesto() {
        return this._estadoPresupuesto;
    }

    set estadoPresupuesto(estadoPresupuesto: IEstadoPresupuesto) {
        this._estadoPresupuesto = estadoPresupuesto;
    }
}

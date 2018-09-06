import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPrecioRepuesto } from 'app/shared/model/precio-repuesto.model';
import { PrecioRepuestoService } from 'app/entities/precio-repuesto/precio-repuesto.service';

@Component({
    selector: 'jhi-precio-repuesto-update',
    templateUrl: './precio-repuesto-update.component.html'
})
export class PrecioRepuestoUpdateComponent implements OnInit {
    private _precioRepuesto: IPrecioRepuesto;
    isSaving: boolean;
    fechaDp: any;

    constructor(private precioRepuestoService: PrecioRepuestoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ precioRepuesto }) => {
            this.precioRepuesto = precioRepuesto;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.precioRepuesto.id !== undefined) {
            this.subscribeToSaveResponse(this.precioRepuestoService.update(this.precioRepuesto));
        } else {
            this.subscribeToSaveResponse(this.precioRepuestoService.create(this.precioRepuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPrecioRepuesto>>) {
        result.subscribe((res: HttpResponse<IPrecioRepuesto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get precioRepuesto() {
        return this._precioRepuesto;
    }

    set precioRepuesto(precioRepuesto: IPrecioRepuesto) {
        this._precioRepuesto = precioRepuesto;
    }
}

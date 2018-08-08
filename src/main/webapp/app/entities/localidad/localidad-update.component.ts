import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILocalidad } from 'app/shared/model/localidad.model';
import { LocalidadService } from './localidad.service';

@Component({
    selector: 'jhi-localidad-update',
    templateUrl: './localidad-update.component.html'
})
export class LocalidadUpdateComponent implements OnInit {
    private _localidad: ILocalidad;
    isSaving: boolean;

    constructor(private localidadService: LocalidadService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ localidad }) => {
            this.localidad = localidad;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.localidad.id !== undefined) {
            this.subscribeToSaveResponse(this.localidadService.update(this.localidad));
        } else {
            this.subscribeToSaveResponse(this.localidadService.create(this.localidad));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILocalidad>>) {
        result.subscribe((res: HttpResponse<ILocalidad>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get localidad() {
        return this._localidad;
    }

    set localidad(localidad: ILocalidad) {
        this._localidad = localidad;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAplicacion } from 'app/shared/model/aplicacion.model';
import { AplicacionService } from 'app/entities/aplicacion/aplicacion.service';

@Component({
    selector: 'jhi-aplicacion-update',
    templateUrl: './aplicacion-update.component.html'
})
export class AplicacionUpdateComponent implements OnInit {
    private _aplicacion: IAplicacion;
    isSaving: boolean;

    constructor(private aplicacionService: AplicacionService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ aplicacion }) => {
            this.aplicacion = aplicacion;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.aplicacion.id !== undefined) {
            this.subscribeToSaveResponse(this.aplicacionService.update(this.aplicacion));
        } else {
            this.subscribeToSaveResponse(this.aplicacionService.create(this.aplicacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAplicacion>>) {
        result.subscribe((res: HttpResponse<IAplicacion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get aplicacion() {
        return this._aplicacion;
    }

    set aplicacion(aplicacion: IAplicacion) {
        this._aplicacion = aplicacion;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDireccion } from 'app/shared/model/direccion.model';
import { DireccionService } from 'app/entities/direccion/direccion.service';
import { ILocalidad } from 'app/shared/model/localidad.model';
import { LocalidadService } from 'app/entities/localidad';

@Component({
    selector: 'jhi-direccion-update',
    templateUrl: './direccion-update.component.html'
})
export class DireccionUpdateComponent implements OnInit {
    private _direccion: IDireccion;
    isSaving: boolean;

    localidads: ILocalidad[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private direccionService: DireccionService,
        private localidadService: LocalidadService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ direccion }) => {
            this.direccion = direccion;
        });
        this.localidadService.query().subscribe(
            (res: HttpResponse<ILocalidad[]>) => {
                this.localidads = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.direccion.id !== undefined) {
            this.subscribeToSaveResponse(this.direccionService.update(this.direccion));
        } else {
            this.subscribeToSaveResponse(this.direccionService.create(this.direccion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDireccion>>) {
        result.subscribe((res: HttpResponse<IDireccion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLocalidadById(index: number, item: ILocalidad) {
        return item.id;
    }
    get direccion() {
        return this._direccion;
    }

    set direccion(direccion: IDireccion) {
        this._direccion = direccion;
    }
}

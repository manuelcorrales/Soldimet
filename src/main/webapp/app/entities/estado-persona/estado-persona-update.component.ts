import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEstadoPersona } from 'app/shared/model/estado-persona.model';
import { EstadoPersonaService } from './estado-persona.service';

@Component({
    selector: 'jhi-estado-persona-update',
    templateUrl: './estado-persona-update.component.html'
})
export class EstadoPersonaUpdateComponent implements OnInit {
    private _estadoPersona: IEstadoPersona;
    isSaving: boolean;

    constructor(private estadoPersonaService: EstadoPersonaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ estadoPersona }) => {
            this.estadoPersona = estadoPersona;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.estadoPersona.id !== undefined) {
            this.subscribeToSaveResponse(this.estadoPersonaService.update(this.estadoPersona));
        } else {
            this.subscribeToSaveResponse(this.estadoPersonaService.create(this.estadoPersona));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoPersona>>) {
        result.subscribe((res: HttpResponse<IEstadoPersona>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get estadoPersona() {
        return this._estadoPersona;
    }

    set estadoPersona(estadoPersona: IEstadoPersona) {
        this._estadoPersona = estadoPersona;
    }
}

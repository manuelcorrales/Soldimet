import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITarjeta } from 'app/shared/model/tarjeta.model';
import { TarjetaService } from 'app/entities/tarjeta/tarjeta.service';

@Component({
    selector: 'jhi-tarjeta-update',
    templateUrl: './tarjeta-update.component.html'
})
export class TarjetaUpdateComponent implements OnInit {
    private _tarjeta: ITarjeta;
    isSaving: boolean;

    constructor(private tarjetaService: TarjetaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tarjeta }) => {
            this.tarjeta = tarjeta;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tarjeta.id !== undefined) {
            this.subscribeToSaveResponse(this.tarjetaService.update(this.tarjeta));
        } else {
            this.subscribeToSaveResponse(this.tarjetaService.create(this.tarjeta));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITarjeta>>) {
        result.subscribe((res: HttpResponse<ITarjeta>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get tarjeta() {
        return this._tarjeta;
    }

    set tarjeta(tarjeta: ITarjeta) {
        this._tarjeta = tarjeta;
    }
}

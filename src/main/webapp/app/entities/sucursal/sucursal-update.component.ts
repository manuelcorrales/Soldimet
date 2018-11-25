import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from './sucursal.service';

@Component({
    selector: 'jhi-sucursal-update',
    templateUrl: './sucursal-update.component.html'
})
export class SucursalUpdateComponent implements OnInit {
    private _sucursal: ISucursal;
    isSaving: boolean;

    constructor(private sucursalService: SucursalService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sucursal }) => {
            this.sucursal = sucursal;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.sucursal.id !== undefined) {
            this.subscribeToSaveResponse(this.sucursalService.update(this.sucursal));
        } else {
            this.subscribeToSaveResponse(this.sucursalService.create(this.sucursal));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISucursal>>) {
        result.subscribe((res: HttpResponse<ISucursal>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get sucursal() {
        return this._sucursal;
    }

    set sucursal(sucursal: ISucursal) {
        this._sucursal = sucursal;
    }
}

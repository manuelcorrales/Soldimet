import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICategoriaPago } from 'app/shared/model/categoria-pago.model';
import { CategoriaPagoService } from './categoria-pago.service';

@Component({
    selector: 'jhi-categoria-pago-update',
    templateUrl: './categoria-pago-update.component.html'
})
export class CategoriaPagoUpdateComponent implements OnInit {
    private _categoriaPago: ICategoriaPago;
    isSaving: boolean;

    constructor(private categoriaPagoService: CategoriaPagoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ categoriaPago }) => {
            this.categoriaPago = categoriaPago;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.categoriaPago.id !== undefined) {
            this.subscribeToSaveResponse(this.categoriaPagoService.update(this.categoriaPago));
        } else {
            this.subscribeToSaveResponse(this.categoriaPagoService.create(this.categoriaPago));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICategoriaPago>>) {
        result.subscribe((res: HttpResponse<ICategoriaPago>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get categoriaPago() {
        return this._categoriaPago;
    }

    set categoriaPago(categoriaPago: ICategoriaPago) {
        this._categoriaPago = categoriaPago;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';
import { FormaDePagoService } from './forma-de-pago.service';

@Component({
    selector: 'jhi-forma-de-pago-update',
    templateUrl: './forma-de-pago-update.component.html'
})
export class FormaDePagoUpdateComponent implements OnInit {
    private _formaDePago: IFormaDePago;
    isSaving: boolean;

    constructor(private formaDePagoService: FormaDePagoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ formaDePago }) => {
            this.formaDePago = formaDePago;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.formaDePago.id !== undefined) {
            this.subscribeToSaveResponse(this.formaDePagoService.update(this.formaDePago));
        } else {
            this.subscribeToSaveResponse(this.formaDePagoService.create(this.formaDePago));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFormaDePago>>) {
        result.subscribe((res: HttpResponse<IFormaDePago>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get formaDePago() {
        return this._formaDePago;
    }

    set formaDePago(formaDePago: IFormaDePago) {
        this._formaDePago = formaDePago;
    }
}

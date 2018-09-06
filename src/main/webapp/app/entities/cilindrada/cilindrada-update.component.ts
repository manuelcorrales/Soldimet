import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICilindrada } from 'app/shared/model/cilindrada.model';
import { CilindradaService } from 'app/entities/cilindrada/cilindrada.service';

@Component({
    selector: 'jhi-cilindrada-update',
    templateUrl: './cilindrada-update.component.html'
})
export class CilindradaUpdateComponent implements OnInit {
    private _cilindrada: ICilindrada;
    isSaving: boolean;

    constructor(private cilindradaService: CilindradaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cilindrada }) => {
            this.cilindrada = cilindrada;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cilindrada.id !== undefined) {
            this.subscribeToSaveResponse(this.cilindradaService.update(this.cilindrada));
        } else {
            this.subscribeToSaveResponse(this.cilindradaService.create(this.cilindrada));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICilindrada>>) {
        result.subscribe((res: HttpResponse<ICilindrada>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get cilindrada() {
        return this._cilindrada;
    }

    set cilindrada(cilindrada: ICilindrada) {
        this._cilindrada = cilindrada;
    }
}

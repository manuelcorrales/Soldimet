import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBanco } from 'app/shared/model/banco.model';
import { BancoService } from 'app/entities/banco/banco.service';

@Component({
    selector: 'jhi-banco-update',
    templateUrl: './banco-update.component.html'
})
export class BancoUpdateComponent implements OnInit {
    private _banco: IBanco;
    isSaving: boolean;

    constructor(private bancoService: BancoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ banco }) => {
            this.banco = banco;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.banco.id !== undefined) {
            this.subscribeToSaveResponse(this.bancoService.update(this.banco));
        } else {
            this.subscribeToSaveResponse(this.bancoService.create(this.banco));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBanco>>) {
        result.subscribe((res: HttpResponse<IBanco>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get banco() {
        return this._banco;
    }

    set banco(banco: IBanco) {
        this._banco = banco;
    }
}

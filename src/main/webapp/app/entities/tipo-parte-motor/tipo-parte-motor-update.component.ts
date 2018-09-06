import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/tipo-parte-motor.service';

@Component({
    selector: 'jhi-tipo-parte-motor-update',
    templateUrl: './tipo-parte-motor-update.component.html'
})
export class TipoParteMotorUpdateComponent implements OnInit {
    private _tipoParteMotor: ITipoParteMotor;
    isSaving: boolean;

    constructor(private tipoParteMotorService: TipoParteMotorService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tipoParteMotor }) => {
            this.tipoParteMotor = tipoParteMotor;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tipoParteMotor.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoParteMotorService.update(this.tipoParteMotor));
        } else {
            this.subscribeToSaveResponse(this.tipoParteMotorService.create(this.tipoParteMotor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITipoParteMotor>>) {
        result.subscribe((res: HttpResponse<ITipoParteMotor>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get tipoParteMotor() {
        return this._tipoParteMotor;
    }

    set tipoParteMotor(tipoParteMotor: ITipoParteMotor) {
        this._tipoParteMotor = tipoParteMotor;
    }
}

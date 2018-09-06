import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/tipo-repuesto.service';
import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor';

@Component({
    selector: 'jhi-tipo-repuesto-update',
    templateUrl: './tipo-repuesto-update.component.html'
})
export class TipoRepuestoUpdateComponent implements OnInit {
    private _tipoRepuesto: ITipoRepuesto;
    isSaving: boolean;

    tipopartemotors: ITipoParteMotor[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private tipoRepuestoService: TipoRepuestoService,
        private tipoParteMotorService: TipoParteMotorService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tipoRepuesto }) => {
            this.tipoRepuesto = tipoRepuesto;
        });
        this.tipoParteMotorService.query().subscribe(
            (res: HttpResponse<ITipoParteMotor[]>) => {
                this.tipopartemotors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tipoRepuesto.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoRepuestoService.update(this.tipoRepuesto));
        } else {
            this.subscribeToSaveResponse(this.tipoRepuestoService.create(this.tipoRepuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITipoRepuesto>>) {
        result.subscribe((res: HttpResponse<ITipoRepuesto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTipoParteMotorById(index: number, item: ITipoParteMotor) {
        return item.id;
    }
    get tipoRepuesto() {
        return this._tipoRepuesto;
    }

    set tipoRepuesto(tipoRepuesto: ITipoRepuesto) {
        this._tipoRepuesto = tipoRepuesto;
    }
}

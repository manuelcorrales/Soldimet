import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMotor } from 'app/shared/model/motor.model';
import { MotorService } from 'app/entities/motor/motor.service';

@Component({
    selector: 'jhi-motor-update',
    templateUrl: './motor-update.component.html'
})
export class MotorUpdateComponent implements OnInit {
    private _motor: IMotor;
    isSaving: boolean;

    constructor(private motorService: MotorService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ motor }) => {
            this.motor = motor;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.motor.id !== undefined) {
            this.subscribeToSaveResponse(this.motorService.update(this.motor));
        } else {
            this.subscribeToSaveResponse(this.motorService.create(this.motor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMotor>>) {
        result.subscribe((res: HttpResponse<IMotor>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get motor() {
        return this._motor;
    }

    set motor(motor: IMotor) {
        this._motor = motor;
    }
}

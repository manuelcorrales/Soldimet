import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRubro } from 'app/shared/model/rubro.model';
import { RubroService } from 'app/entities/rubro/rubro.service';

@Component({
    selector: 'jhi-rubro-update',
    templateUrl: './rubro-update.component.html'
})
export class RubroUpdateComponent implements OnInit {
    private _rubro: IRubro;
    isSaving: boolean;

    constructor(private rubroService: RubroService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ rubro }) => {
            this.rubro = rubro;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.rubro.id !== undefined) {
            this.subscribeToSaveResponse(this.rubroService.update(this.rubro));
        } else {
            this.subscribeToSaveResponse(this.rubroService.create(this.rubro));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRubro>>) {
        result.subscribe((res: HttpResponse<IRubro>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get rubro() {
        return this._rubro;
    }

    set rubro(rubro: IRubro) {
        this._rubro = rubro;
    }
}

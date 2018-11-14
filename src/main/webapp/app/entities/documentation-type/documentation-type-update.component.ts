import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDocumentationType } from 'app/shared/model/documentation-type.model';
import { DocumentationTypeService } from './documentation-type.service';

@Component({
    selector: 'jhi-documentation-type-update',
    templateUrl: './documentation-type-update.component.html'
})
export class DocumentationTypeUpdateComponent implements OnInit {
    private _documentationType: IDocumentationType;
    isSaving: boolean;

    constructor(private documentationTypeService: DocumentationTypeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ documentationType }) => {
            this.documentationType = documentationType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.documentationType.id !== undefined) {
            this.subscribeToSaveResponse(this.documentationTypeService.update(this.documentationType));
        } else {
            this.subscribeToSaveResponse(this.documentationTypeService.create(this.documentationType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentationType>>) {
        result.subscribe((res: HttpResponse<IDocumentationType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get documentationType() {
        return this._documentationType;
    }

    set documentationType(documentationType: IDocumentationType) {
        this._documentationType = documentationType;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISubCategoria } from 'app/shared/model/sub-categoria.model';
import { SubCategoriaService } from 'app/entities/sub-categoria/sub-categoria.service';

@Component({
    selector: 'jhi-sub-categoria-update',
    templateUrl: './sub-categoria-update.component.html'
})
export class SubCategoriaUpdateComponent implements OnInit {
    private _subCategoria: ISubCategoria;
    isSaving: boolean;

    constructor(private subCategoriaService: SubCategoriaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ subCategoria }) => {
            this.subCategoria = subCategoria;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.subCategoria.id !== undefined) {
            this.subscribeToSaveResponse(this.subCategoriaService.update(this.subCategoria));
        } else {
            this.subscribeToSaveResponse(this.subCategoriaService.create(this.subCategoria));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISubCategoria>>) {
        result.subscribe((res: HttpResponse<ISubCategoria>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get subCategoria() {
        return this._subCategoria;
    }

    set subCategoria(subCategoria: ISubCategoria) {
        this._subCategoria = subCategoria;
    }
}

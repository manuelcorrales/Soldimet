import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISubCategoria, SubCategoria } from 'app/shared/model/sub-categoria.model';
import { SubCategoriaService } from 'app/entities/sub-categoria/sub-categoria.service';

@Component({
  selector: 'jhi-sub-categoria-update',
  templateUrl: './sub-categoria-update.component.html'
})
export class SubCategoriaUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreSubCategoria: [null, [Validators.required]]
  });

  constructor(protected subCategoriaService: SubCategoriaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ subCategoria }) => {
      this.updateForm(subCategoria);
    });
  }

  updateForm(subCategoria: ISubCategoria) {
    this.editForm.patchValue({
      id: subCategoria.id,
      nombreSubCategoria: subCategoria.nombreSubCategoria
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const subCategoria = this.createFromForm();
    if (subCategoria.id !== undefined) {
      this.subscribeToSaveResponse(this.subCategoriaService.update(subCategoria));
    } else {
      this.subscribeToSaveResponse(this.subCategoriaService.create(subCategoria));
    }
  }

  private createFromForm(): ISubCategoria {
    return {
      ...new SubCategoria(),
      id: this.editForm.get(['id']).value,
      nombreSubCategoria: this.editForm.get(['nombreSubCategoria']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubCategoria>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}

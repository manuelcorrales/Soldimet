import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ISubCategoria, SubCategoria } from '../sub-categoria.model';
import { SubCategoriaService } from '../service/sub-categoria.service';

@Component({
  selector: 'jhi-sub-categoria-update',
  templateUrl: './sub-categoria-update.component.html',
})
export class SubCategoriaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreSubCategoria: [null, [Validators.required]],
  });

  constructor(protected subCategoriaService: SubCategoriaService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subCategoria }) => {
      this.updateForm(subCategoria);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subCategoria = this.createFromForm();
    if (subCategoria.id !== undefined) {
      this.subscribeToSaveResponse(this.subCategoriaService.update(subCategoria));
    } else {
      this.subscribeToSaveResponse(this.subCategoriaService.create(subCategoria));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubCategoria>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(subCategoria: ISubCategoria): void {
    this.editForm.patchValue({
      id: subCategoria.id,
      nombreSubCategoria: subCategoria.nombreSubCategoria,
    });
  }

  protected createFromForm(): ISubCategoria {
    return {
      ...new SubCategoria(),
      id: this.editForm.get(['id'])!.value,
      nombreSubCategoria: this.editForm.get(['nombreSubCategoria'])!.value,
    };
  }
}

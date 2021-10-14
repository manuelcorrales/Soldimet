import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICategoriaPago, CategoriaPago } from '../categoria-pago.model';
import { CategoriaPagoService } from '../service/categoria-pago.service';

@Component({
  selector: 'jhi-categoria-pago-update',
  templateUrl: './categoria-pago-update.component.html',
})
export class CategoriaPagoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreCategoriaPago: [null, [Validators.required]],
  });

  constructor(protected categoriaPagoService: CategoriaPagoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categoriaPago }) => {
      this.updateForm(categoriaPago);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const categoriaPago = this.createFromForm();
    if (categoriaPago.id !== undefined) {
      this.subscribeToSaveResponse(this.categoriaPagoService.update(categoriaPago));
    } else {
      this.subscribeToSaveResponse(this.categoriaPagoService.create(categoriaPago));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoriaPago>>): void {
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

  protected updateForm(categoriaPago: ICategoriaPago): void {
    this.editForm.patchValue({
      id: categoriaPago.id,
      nombreCategoriaPago: categoriaPago.nombreCategoriaPago,
    });
  }

  protected createFromForm(): ICategoriaPago {
    return {
      ...new CategoriaPago(),
      id: this.editForm.get(['id'])!.value,
      nombreCategoriaPago: this.editForm.get(['nombreCategoriaPago'])!.value,
    };
  }
}

import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICategoriaPago, CategoriaPago } from 'app/shared/model/categoria-pago.model';
import { CategoriaPagoService } from './categoria-pago.service';

@Component({
  selector: 'jhi-categoria-pago-update',
  templateUrl: './categoria-pago-update.component.html'
})
export class CategoriaPagoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreCategoriaPago: [null, [Validators.required]]
  });

  constructor(protected categoriaPagoService: CategoriaPagoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ categoriaPago }) => {
      this.updateForm(categoriaPago);
    });
  }

  updateForm(categoriaPago: ICategoriaPago) {
    this.editForm.patchValue({
      id: categoriaPago.id,
      nombreCategoriaPago: categoriaPago.nombreCategoriaPago
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const categoriaPago = this.createFromForm();
    if (categoriaPago.id !== undefined) {
      this.subscribeToSaveResponse(this.categoriaPagoService.update(categoriaPago));
    } else {
      this.subscribeToSaveResponse(this.categoriaPagoService.create(categoriaPago));
    }
  }

  private createFromForm(): ICategoriaPago {
    return {
      ...new CategoriaPago(),
      id: this.editForm.get(['id']).value,
      nombreCategoriaPago: this.editForm.get(['nombreCategoriaPago']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoriaPago>>) {
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

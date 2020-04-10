import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IFormaDePago, FormaDePago } from 'app/shared/model/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago/forma-de-pago.service';

@Component({
  selector: 'jhi-forma-de-pago-update',
  templateUrl: './forma-de-pago-update.component.html'
})
export class FormaDePagoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreFormaDePago: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(protected formaDePagoService: FormaDePagoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ formaDePago }) => {
      this.updateForm(formaDePago);
    });
  }

  updateForm(formaDePago: IFormaDePago) {
    this.editForm.patchValue({
      id: formaDePago.id,
      nombreFormaDePago: formaDePago.nombreFormaDePago
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const formaDePago = this.createFromForm();
    if (formaDePago.id !== undefined) {
      this.subscribeToSaveResponse(this.formaDePagoService.update(formaDePago));
    } else {
      this.subscribeToSaveResponse(this.formaDePagoService.create(formaDePago));
    }
  }

  private createFromForm(): IFormaDePago {
    return {
      ...new FormaDePago(),
      id: this.editForm.get(['id']).value,
      nombreFormaDePago: this.editForm.get(['nombreFormaDePago']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormaDePago>>) {
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

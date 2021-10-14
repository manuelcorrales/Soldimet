import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IFormaDePago, FormaDePago } from '../forma-de-pago.model';
import { FormaDePagoService } from '../service/forma-de-pago.service';

@Component({
  selector: 'jhi-forma-de-pago-update',
  templateUrl: './forma-de-pago-update.component.html',
})
export class FormaDePagoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreFormaDePago: [null, [Validators.required, Validators.minLength(3)]],
  });

  constructor(protected formaDePagoService: FormaDePagoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formaDePago }) => {
      this.updateForm(formaDePago);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const formaDePago = this.createFromForm();
    if (formaDePago.id !== undefined) {
      this.subscribeToSaveResponse(this.formaDePagoService.update(formaDePago));
    } else {
      this.subscribeToSaveResponse(this.formaDePagoService.create(formaDePago));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormaDePago>>): void {
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

  protected updateForm(formaDePago: IFormaDePago): void {
    this.editForm.patchValue({
      id: formaDePago.id,
      nombreFormaDePago: formaDePago.nombreFormaDePago,
    });
  }

  protected createFromForm(): IFormaDePago {
    return {
      ...new FormaDePago(),
      id: this.editForm.get(['id'])!.value,
      nombreFormaDePago: this.editForm.get(['nombreFormaDePago'])!.value,
    };
  }
}

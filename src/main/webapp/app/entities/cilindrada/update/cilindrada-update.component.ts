import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICilindrada, Cilindrada } from '../cilindrada.model';
import { CilindradaService } from '../service/cilindrada.service';

@Component({
  selector: 'jhi-cilindrada-update',
  templateUrl: './cilindrada-update.component.html',
})
export class CilindradaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    cantidadDeCilindros: [null, [Validators.required, Validators.min(1), Validators.max(20)]],
  });

  constructor(protected cilindradaService: CilindradaService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cilindrada }) => {
      this.updateForm(cilindrada);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cilindrada = this.createFromForm();
    if (cilindrada.id !== undefined) {
      this.subscribeToSaveResponse(this.cilindradaService.update(cilindrada));
    } else {
      this.subscribeToSaveResponse(this.cilindradaService.create(cilindrada));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICilindrada>>): void {
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

  protected updateForm(cilindrada: ICilindrada): void {
    this.editForm.patchValue({
      id: cilindrada.id,
      cantidadDeCilindros: cilindrada.cantidadDeCilindros,
    });
  }

  protected createFromForm(): ICilindrada {
    return {
      ...new Cilindrada(),
      id: this.editForm.get(['id'])!.value,
      cantidadDeCilindros: this.editForm.get(['cantidadDeCilindros'])!.value,
    };
  }
}

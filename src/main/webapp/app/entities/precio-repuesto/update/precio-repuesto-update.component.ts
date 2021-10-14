import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPrecioRepuesto, PrecioRepuesto } from '../precio-repuesto.model';
import { PrecioRepuestoService } from '../service/precio-repuesto.service';

@Component({
  selector: 'jhi-precio-repuesto-update',
  templateUrl: './precio-repuesto-update.component.html',
})
export class PrecioRepuestoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    fecha: [null, [Validators.required]],
    precioPrivado: [null, [Validators.min(0)]],
    precioPublico: [null, [Validators.required, Validators.min(0)]],
  });

  constructor(
    protected precioRepuestoService: PrecioRepuestoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ precioRepuesto }) => {
      this.updateForm(precioRepuesto);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const precioRepuesto = this.createFromForm();
    if (precioRepuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.precioRepuestoService.update(precioRepuesto));
    } else {
      this.subscribeToSaveResponse(this.precioRepuestoService.create(precioRepuesto));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrecioRepuesto>>): void {
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

  protected updateForm(precioRepuesto: IPrecioRepuesto): void {
    this.editForm.patchValue({
      id: precioRepuesto.id,
      fecha: precioRepuesto.fecha,
      precioPrivado: precioRepuesto.precioPrivado,
      precioPublico: precioRepuesto.precioPublico,
    });
  }

  protected createFromForm(): IPrecioRepuesto {
    return {
      ...new PrecioRepuesto(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value,
      precioPrivado: this.editForm.get(['precioPrivado'])!.value,
      precioPublico: this.editForm.get(['precioPublico'])!.value,
    };
  }
}

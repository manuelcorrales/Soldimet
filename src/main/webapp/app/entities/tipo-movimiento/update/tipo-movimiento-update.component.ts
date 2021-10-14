import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITipoMovimiento, TipoMovimiento } from '../tipo-movimiento.model';
import { TipoMovimientoService } from '../service/tipo-movimiento.service';

@Component({
  selector: 'jhi-tipo-movimiento-update',
  templateUrl: './tipo-movimiento-update.component.html',
})
export class TipoMovimientoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreTipoMovimiento: [null, [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    protected tipoMovimientoService: TipoMovimientoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoMovimiento }) => {
      this.updateForm(tipoMovimiento);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoMovimiento = this.createFromForm();
    if (tipoMovimiento.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoMovimientoService.update(tipoMovimiento));
    } else {
      this.subscribeToSaveResponse(this.tipoMovimientoService.create(tipoMovimiento));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoMovimiento>>): void {
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

  protected updateForm(tipoMovimiento: ITipoMovimiento): void {
    this.editForm.patchValue({
      id: tipoMovimiento.id,
      nombreTipoMovimiento: tipoMovimiento.nombreTipoMovimiento,
    });
  }

  protected createFromForm(): ITipoMovimiento {
    return {
      ...new TipoMovimiento(),
      id: this.editForm.get(['id'])!.value,
      nombreTipoMovimiento: this.editForm.get(['nombreTipoMovimiento'])!.value,
    };
  }
}

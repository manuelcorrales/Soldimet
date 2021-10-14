import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITipoDetalleMovimiento, TipoDetalleMovimiento } from '../tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoService } from '../service/tipo-detalle-movimiento.service';

@Component({
  selector: 'jhi-tipo-detalle-movimiento-update',
  templateUrl: './tipo-detalle-movimiento-update.component.html',
})
export class TipoDetalleMovimientoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreTipoDetalle: [null, [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    protected tipoDetalleMovimientoService: TipoDetalleMovimientoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoDetalleMovimiento }) => {
      this.updateForm(tipoDetalleMovimiento);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoDetalleMovimiento = this.createFromForm();
    if (tipoDetalleMovimiento.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoDetalleMovimientoService.update(tipoDetalleMovimiento));
    } else {
      this.subscribeToSaveResponse(this.tipoDetalleMovimientoService.create(tipoDetalleMovimiento));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoDetalleMovimiento>>): void {
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

  protected updateForm(tipoDetalleMovimiento: ITipoDetalleMovimiento): void {
    this.editForm.patchValue({
      id: tipoDetalleMovimiento.id,
      nombreTipoDetalle: tipoDetalleMovimiento.nombreTipoDetalle,
    });
  }

  protected createFromForm(): ITipoDetalleMovimiento {
    return {
      ...new TipoDetalleMovimiento(),
      id: this.editForm.get(['id'])!.value,
      nombreTipoDetalle: this.editForm.get(['nombreTipoDetalle'])!.value,
    };
  }
}

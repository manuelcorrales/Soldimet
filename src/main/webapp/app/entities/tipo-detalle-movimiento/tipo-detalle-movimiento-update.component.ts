import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoDetalleMovimiento, TipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoService } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.service';

@Component({
  selector: 'jhi-tipo-detalle-movimiento-update',
  templateUrl: './tipo-detalle-movimiento-update.component.html'
})
export class TipoDetalleMovimientoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreTipoDetalle: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    protected tipoDetalleMovimientoService: TipoDetalleMovimientoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoDetalleMovimiento }) => {
      this.updateForm(tipoDetalleMovimiento);
    });
  }

  updateForm(tipoDetalleMovimiento: ITipoDetalleMovimiento) {
    this.editForm.patchValue({
      id: tipoDetalleMovimiento.id,
      nombreTipoDetalle: tipoDetalleMovimiento.nombreTipoDetalle
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoDetalleMovimiento = this.createFromForm();
    if (tipoDetalleMovimiento.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoDetalleMovimientoService.update(tipoDetalleMovimiento));
    } else {
      this.subscribeToSaveResponse(this.tipoDetalleMovimientoService.create(tipoDetalleMovimiento));
    }
  }

  private createFromForm(): ITipoDetalleMovimiento {
    return {
      ...new TipoDetalleMovimiento(),
      id: this.editForm.get(['id']).value,
      nombreTipoDetalle: this.editForm.get(['nombreTipoDetalle']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoDetalleMovimiento>>) {
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

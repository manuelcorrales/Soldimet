import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoMovimiento, TipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { TipoMovimientoService } from 'app/entities/tipo-movimiento/tipo-movimiento.service';

@Component({
  selector: 'jhi-tipo-movimiento-update',
  templateUrl: './tipo-movimiento-update.component.html'
})
export class TipoMovimientoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreTipoMovimiento: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(protected tipoMovimientoService: TipoMovimientoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoMovimiento }) => {
      this.updateForm(tipoMovimiento);
    });
  }

  updateForm(tipoMovimiento: ITipoMovimiento) {
    this.editForm.patchValue({
      id: tipoMovimiento.id,
      nombreTipoMovimiento: tipoMovimiento.nombreTipoMovimiento
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoMovimiento = this.createFromForm();
    if (tipoMovimiento.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoMovimientoService.update(tipoMovimiento));
    } else {
      this.subscribeToSaveResponse(this.tipoMovimientoService.create(tipoMovimiento));
    }
  }

  private createFromForm(): ITipoMovimiento {
    return {
      ...new TipoMovimiento(),
      id: this.editForm.get(['id']).value,
      nombreTipoMovimiento: this.editForm.get(['nombreTipoMovimiento']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoMovimiento>>) {
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

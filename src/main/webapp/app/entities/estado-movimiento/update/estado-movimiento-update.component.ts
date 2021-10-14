import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEstadoMovimiento, EstadoMovimiento } from '../estado-movimiento.model';
import { EstadoMovimientoService } from '../service/estado-movimiento.service';

@Component({
  selector: 'jhi-estado-movimiento-update',
  templateUrl: './estado-movimiento-update.component.html',
})
export class EstadoMovimientoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreEstado: [null, [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    protected estadoMovimientoService: EstadoMovimientoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoMovimiento }) => {
      this.updateForm(estadoMovimiento);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estadoMovimiento = this.createFromForm();
    if (estadoMovimiento.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoMovimientoService.update(estadoMovimiento));
    } else {
      this.subscribeToSaveResponse(this.estadoMovimientoService.create(estadoMovimiento));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoMovimiento>>): void {
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

  protected updateForm(estadoMovimiento: IEstadoMovimiento): void {
    this.editForm.patchValue({
      id: estadoMovimiento.id,
      nombreEstado: estadoMovimiento.nombreEstado,
    });
  }

  protected createFromForm(): IEstadoMovimiento {
    return {
      ...new EstadoMovimiento(),
      id: this.editForm.get(['id'])!.value,
      nombreEstado: this.editForm.get(['nombreEstado'])!.value,
    };
  }
}

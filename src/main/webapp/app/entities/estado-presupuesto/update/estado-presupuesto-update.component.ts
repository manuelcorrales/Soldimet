import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEstadoPresupuesto, EstadoPresupuesto } from '../estado-presupuesto.model';
import { EstadoPresupuestoService } from '../service/estado-presupuesto.service';

@Component({
  selector: 'jhi-estado-presupuesto-update',
  templateUrl: './estado-presupuesto-update.component.html',
})
export class EstadoPresupuestoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreEstado: [null, [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    protected estadoPresupuestoService: EstadoPresupuestoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoPresupuesto }) => {
      this.updateForm(estadoPresupuesto);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estadoPresupuesto = this.createFromForm();
    if (estadoPresupuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoPresupuestoService.update(estadoPresupuesto));
    } else {
      this.subscribeToSaveResponse(this.estadoPresupuestoService.create(estadoPresupuesto));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoPresupuesto>>): void {
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

  protected updateForm(estadoPresupuesto: IEstadoPresupuesto): void {
    this.editForm.patchValue({
      id: estadoPresupuesto.id,
      nombreEstado: estadoPresupuesto.nombreEstado,
    });
  }

  protected createFromForm(): IEstadoPresupuesto {
    return {
      ...new EstadoPresupuesto(),
      id: this.editForm.get(['id'])!.value,
      nombreEstado: this.editForm.get(['nombreEstado'])!.value,
    };
  }
}

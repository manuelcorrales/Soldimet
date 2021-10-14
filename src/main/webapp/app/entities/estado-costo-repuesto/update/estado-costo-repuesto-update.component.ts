import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEstadoCostoRepuesto, EstadoCostoRepuesto } from '../estado-costo-repuesto.model';
import { EstadoCostoRepuestoService } from '../service/estado-costo-repuesto.service';

@Component({
  selector: 'jhi-estado-costo-repuesto-update',
  templateUrl: './estado-costo-repuesto-update.component.html',
})
export class EstadoCostoRepuestoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreEstado: [null, [Validators.required]],
  });

  constructor(
    protected estadoCostoRepuestoService: EstadoCostoRepuestoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoCostoRepuesto }) => {
      this.updateForm(estadoCostoRepuesto);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estadoCostoRepuesto = this.createFromForm();
    if (estadoCostoRepuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoCostoRepuestoService.update(estadoCostoRepuesto));
    } else {
      this.subscribeToSaveResponse(this.estadoCostoRepuestoService.create(estadoCostoRepuesto));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoCostoRepuesto>>): void {
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

  protected updateForm(estadoCostoRepuesto: IEstadoCostoRepuesto): void {
    this.editForm.patchValue({
      id: estadoCostoRepuesto.id,
      nombreEstado: estadoCostoRepuesto.nombreEstado,
    });
  }

  protected createFromForm(): IEstadoCostoRepuesto {
    return {
      ...new EstadoCostoRepuesto(),
      id: this.editForm.get(['id'])!.value,
      nombreEstado: this.editForm.get(['nombreEstado'])!.value,
    };
  }
}

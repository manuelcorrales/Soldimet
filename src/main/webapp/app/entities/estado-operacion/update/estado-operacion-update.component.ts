import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEstadoOperacion, EstadoOperacion } from '../estado-operacion.model';
import { EstadoOperacionService } from '../service/estado-operacion.service';

@Component({
  selector: 'jhi-estado-operacion-update',
  templateUrl: './estado-operacion-update.component.html',
})
export class EstadoOperacionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreEstado: [null, [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    protected estadoOperacionService: EstadoOperacionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoOperacion }) => {
      this.updateForm(estadoOperacion);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estadoOperacion = this.createFromForm();
    if (estadoOperacion.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoOperacionService.update(estadoOperacion));
    } else {
      this.subscribeToSaveResponse(this.estadoOperacionService.create(estadoOperacion));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoOperacion>>): void {
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

  protected updateForm(estadoOperacion: IEstadoOperacion): void {
    this.editForm.patchValue({
      id: estadoOperacion.id,
      nombreEstado: estadoOperacion.nombreEstado,
    });
  }

  protected createFromForm(): IEstadoOperacion {
    return {
      ...new EstadoOperacion(),
      id: this.editForm.get(['id'])!.value,
      nombreEstado: this.editForm.get(['nombreEstado'])!.value,
    };
  }
}

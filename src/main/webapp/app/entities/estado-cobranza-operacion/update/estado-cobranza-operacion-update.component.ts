import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEstadoCobranzaOperacion, EstadoCobranzaOperacion } from '../estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionService } from '../service/estado-cobranza-operacion.service';

@Component({
  selector: 'jhi-estado-cobranza-operacion-update',
  templateUrl: './estado-cobranza-operacion-update.component.html',
})
export class EstadoCobranzaOperacionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreEstado: [null, [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    protected estadoCobranzaOperacionService: EstadoCobranzaOperacionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoCobranzaOperacion }) => {
      this.updateForm(estadoCobranzaOperacion);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estadoCobranzaOperacion = this.createFromForm();
    if (estadoCobranzaOperacion.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoCobranzaOperacionService.update(estadoCobranzaOperacion));
    } else {
      this.subscribeToSaveResponse(this.estadoCobranzaOperacionService.create(estadoCobranzaOperacion));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoCobranzaOperacion>>): void {
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

  protected updateForm(estadoCobranzaOperacion: IEstadoCobranzaOperacion): void {
    this.editForm.patchValue({
      id: estadoCobranzaOperacion.id,
      nombreEstado: estadoCobranzaOperacion.nombreEstado,
    });
  }

  protected createFromForm(): IEstadoCobranzaOperacion {
    return {
      ...new EstadoCobranzaOperacion(),
      id: this.editForm.get(['id'])!.value,
      nombreEstado: this.editForm.get(['nombreEstado'])!.value,
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEstadoPersona, EstadoPersona } from '../estado-persona.model';
import { EstadoPersonaService } from '../service/estado-persona.service';

@Component({
  selector: 'jhi-estado-persona-update',
  templateUrl: './estado-persona-update.component.html',
})
export class EstadoPersonaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreEstado: [null, [Validators.required, Validators.minLength(3)]],
  });

  constructor(protected estadoPersonaService: EstadoPersonaService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoPersona }) => {
      this.updateForm(estadoPersona);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estadoPersona = this.createFromForm();
    if (estadoPersona.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoPersonaService.update(estadoPersona));
    } else {
      this.subscribeToSaveResponse(this.estadoPersonaService.create(estadoPersona));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoPersona>>): void {
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

  protected updateForm(estadoPersona: IEstadoPersona): void {
    this.editForm.patchValue({
      id: estadoPersona.id,
      nombreEstado: estadoPersona.nombreEstado,
    });
  }

  protected createFromForm(): IEstadoPersona {
    return {
      ...new EstadoPersona(),
      id: this.editForm.get(['id'])!.value,
      nombreEstado: this.editForm.get(['nombreEstado'])!.value,
    };
  }
}

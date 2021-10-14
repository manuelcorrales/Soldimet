import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ILocalidad, Localidad } from '../localidad.model';
import { LocalidadService } from '../service/localidad.service';

@Component({
  selector: 'jhi-localidad-update',
  templateUrl: './localidad-update.component.html',
})
export class LocalidadUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreLocalidad: [null, [Validators.required, Validators.minLength(3)]],
  });

  constructor(protected localidadService: LocalidadService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localidad }) => {
      this.updateForm(localidad);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const localidad = this.createFromForm();
    if (localidad.id !== undefined) {
      this.subscribeToSaveResponse(this.localidadService.update(localidad));
    } else {
      this.subscribeToSaveResponse(this.localidadService.create(localidad));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocalidad>>): void {
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

  protected updateForm(localidad: ILocalidad): void {
    this.editForm.patchValue({
      id: localidad.id,
      nombreLocalidad: localidad.nombreLocalidad,
    });
  }

  protected createFromForm(): ILocalidad {
    return {
      ...new Localidad(),
      id: this.editForm.get(['id'])!.value,
      nombreLocalidad: this.editForm.get(['nombreLocalidad'])!.value,
    };
  }
}

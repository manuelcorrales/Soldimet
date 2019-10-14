import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ILocalidad, Localidad } from 'app/shared/model/localidad.model';
import { LocalidadService } from './localidad.service';

@Component({
  selector: 'jhi-localidad-update',
  templateUrl: './localidad-update.component.html'
})
export class LocalidadUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreLocalidad: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(protected localidadService: LocalidadService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ localidad }) => {
      this.updateForm(localidad);
    });
  }

  updateForm(localidad: ILocalidad) {
    this.editForm.patchValue({
      id: localidad.id,
      nombreLocalidad: localidad.nombreLocalidad
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const localidad = this.createFromForm();
    if (localidad.id !== undefined) {
      this.subscribeToSaveResponse(this.localidadService.update(localidad));
    } else {
      this.subscribeToSaveResponse(this.localidadService.create(localidad));
    }
  }

  private createFromForm(): ILocalidad {
    return {
      ...new Localidad(),
      id: this.editForm.get(['id']).value,
      nombreLocalidad: this.editForm.get(['nombreLocalidad']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocalidad>>) {
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

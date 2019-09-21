import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPrecioRepuesto, PrecioRepuesto } from 'app/shared/model/precio-repuesto.model';
import { PrecioRepuestoService } from './precio-repuesto.service';

@Component({
  selector: 'jhi-precio-repuesto-update',
  templateUrl: './precio-repuesto-update.component.html'
})
export class PrecioRepuestoUpdateComponent implements OnInit {
  isSaving: boolean;
  fechaDp: any;

  editForm = this.fb.group({
    id: [],
    fecha: [null, [Validators.required]],
    precioPrivado: [null, [Validators.min(0)]],
    precioPublico: [null, [Validators.required, Validators.min(0)]]
  });

  constructor(protected precioRepuestoService: PrecioRepuestoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ precioRepuesto }) => {
      this.updateForm(precioRepuesto);
    });
  }

  updateForm(precioRepuesto: IPrecioRepuesto) {
    this.editForm.patchValue({
      id: precioRepuesto.id,
      fecha: precioRepuesto.fecha,
      precioPrivado: precioRepuesto.precioPrivado,
      precioPublico: precioRepuesto.precioPublico
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const precioRepuesto = this.createFromForm();
    if (precioRepuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.precioRepuestoService.update(precioRepuesto));
    } else {
      this.subscribeToSaveResponse(this.precioRepuestoService.create(precioRepuesto));
    }
  }

  private createFromForm(): IPrecioRepuesto {
    return {
      ...new PrecioRepuesto(),
      id: this.editForm.get(['id']).value,
      fecha: this.editForm.get(['fecha']).value,
      precioPrivado: this.editForm.get(['precioPrivado']).value,
      precioPublico: this.editForm.get(['precioPublico']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrecioRepuesto>>) {
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

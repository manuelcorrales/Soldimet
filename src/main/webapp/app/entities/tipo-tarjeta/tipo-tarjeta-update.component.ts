import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoTarjeta, TipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';
import { TipoTarjetaService } from './tipo-tarjeta.service';

@Component({
  selector: 'jhi-tipo-tarjeta-update',
  templateUrl: './tipo-tarjeta-update.component.html'
})
export class TipoTarjetaUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreTipoTarjeta: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(protected tipoTarjetaService: TipoTarjetaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoTarjeta }) => {
      this.updateForm(tipoTarjeta);
    });
  }

  updateForm(tipoTarjeta: ITipoTarjeta) {
    this.editForm.patchValue({
      id: tipoTarjeta.id,
      nombreTipoTarjeta: tipoTarjeta.nombreTipoTarjeta
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoTarjeta = this.createFromForm();
    if (tipoTarjeta.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoTarjetaService.update(tipoTarjeta));
    } else {
      this.subscribeToSaveResponse(this.tipoTarjetaService.create(tipoTarjeta));
    }
  }

  private createFromForm(): ITipoTarjeta {
    return {
      ...new TipoTarjeta(),
      id: this.editForm.get(['id']).value,
      nombreTipoTarjeta: this.editForm.get(['nombreTipoTarjeta']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoTarjeta>>) {
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

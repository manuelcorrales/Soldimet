import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITarjeta, Tarjeta } from 'app/shared/model/tarjeta.model';
import { TarjetaService } from 'app/entities/tarjeta/tarjeta.service';

@Component({
  selector: 'jhi-tarjeta-update',
  templateUrl: './tarjeta-update.component.html'
})
export class TarjetaUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreTarjeta: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(protected tarjetaService: TarjetaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tarjeta }) => {
      this.updateForm(tarjeta);
    });
  }

  updateForm(tarjeta: ITarjeta) {
    this.editForm.patchValue({
      id: tarjeta.id,
      nombreTarjeta: tarjeta.nombreTarjeta
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tarjeta = this.createFromForm();
    if (tarjeta.id !== undefined) {
      this.subscribeToSaveResponse(this.tarjetaService.update(tarjeta));
    } else {
      this.subscribeToSaveResponse(this.tarjetaService.create(tarjeta));
    }
  }

  private createFromForm(): ITarjeta {
    return {
      ...new Tarjeta(),
      id: this.editForm.get(['id']).value,
      nombreTarjeta: this.editForm.get(['nombreTarjeta']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITarjeta>>) {
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

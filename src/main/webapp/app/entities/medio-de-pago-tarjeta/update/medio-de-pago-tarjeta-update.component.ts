import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IMedioDePagoTarjeta, MedioDePagoTarjeta } from '../medio-de-pago-tarjeta.model';
import { MedioDePagoTarjetaService } from '../service/medio-de-pago-tarjeta.service';

@Component({
  selector: 'jhi-medio-de-pago-tarjeta-update',
  templateUrl: './medio-de-pago-tarjeta-update.component.html',
})
export class MedioDePagoTarjetaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    ultimos4: [null, [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    protected medioDePagoTarjetaService: MedioDePagoTarjetaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medioDePagoTarjeta }) => {
      this.updateForm(medioDePagoTarjeta);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const medioDePagoTarjeta = this.createFromForm();
    if (medioDePagoTarjeta.id !== undefined) {
      this.subscribeToSaveResponse(this.medioDePagoTarjetaService.update(medioDePagoTarjeta));
    } else {
      this.subscribeToSaveResponse(this.medioDePagoTarjetaService.create(medioDePagoTarjeta));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedioDePagoTarjeta>>): void {
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

  protected updateForm(medioDePagoTarjeta: IMedioDePagoTarjeta): void {
    this.editForm.patchValue({
      id: medioDePagoTarjeta.id,
      ultimos4: medioDePagoTarjeta.ultimos4,
    });
  }

  protected createFromForm(): IMedioDePagoTarjeta {
    return {
      ...new MedioDePagoTarjeta(),
      id: this.editForm.get(['id'])!.value,
      ultimos4: this.editForm.get(['ultimos4'])!.value,
    };
  }
}

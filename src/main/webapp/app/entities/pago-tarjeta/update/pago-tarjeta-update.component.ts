import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPagoTarjeta, PagoTarjeta } from '../pago-tarjeta.model';
import { PagoTarjetaService } from '../service/pago-tarjeta.service';
import { IFormaDePago } from 'app/entities/forma-de-pago/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago/service/forma-de-pago.service';

@Component({
  selector: 'jhi-pago-tarjeta-update',
  templateUrl: './pago-tarjeta-update.component.html',
})
export class PagoTarjetaUpdateComponent implements OnInit {
  isSaving = false;

  formaDePagosCollection: IFormaDePago[] = [];

  editForm = this.fb.group({
    id: [],
    formaDePago: [null, Validators.required],
  });

  constructor(
    protected pagoTarjetaService: PagoTarjetaService,
    protected formaDePagoService: FormaDePagoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pagoTarjeta }) => {
      this.updateForm(pagoTarjeta);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pagoTarjeta = this.createFromForm();
    if (pagoTarjeta.id !== undefined) {
      this.subscribeToSaveResponse(this.pagoTarjetaService.update(pagoTarjeta));
    } else {
      this.subscribeToSaveResponse(this.pagoTarjetaService.create(pagoTarjeta));
    }
  }

  trackFormaDePagoById(index: number, item: IFormaDePago): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPagoTarjeta>>): void {
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

  protected updateForm(pagoTarjeta: IPagoTarjeta): void {
    this.editForm.patchValue({
      id: pagoTarjeta.id,
      formaDePago: pagoTarjeta.formaDePago,
    });

    this.formaDePagosCollection = this.formaDePagoService.addFormaDePagoToCollectionIfMissing(
      this.formaDePagosCollection,
      pagoTarjeta.formaDePago
    );
  }

  protected loadRelationshipsOptions(): void {
    this.formaDePagoService
      .query({ filter: 'pagotarjeta-is-null' })
      .pipe(map((res: HttpResponse<IFormaDePago[]>) => res.body ?? []))
      .pipe(
        map((formaDePagos: IFormaDePago[]) =>
          this.formaDePagoService.addFormaDePagoToCollectionIfMissing(formaDePagos, this.editForm.get('formaDePago')!.value)
        )
      )
      .subscribe((formaDePagos: IFormaDePago[]) => (this.formaDePagosCollection = formaDePagos));
  }

  protected createFromForm(): IPagoTarjeta {
    return {
      ...new PagoTarjeta(),
      id: this.editForm.get(['id'])!.value,
      formaDePago: this.editForm.get(['formaDePago'])!.value,
    };
  }
}

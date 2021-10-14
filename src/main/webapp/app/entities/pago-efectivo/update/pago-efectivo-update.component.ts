import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPagoEfectivo, PagoEfectivo } from '../pago-efectivo.model';
import { PagoEfectivoService } from '../service/pago-efectivo.service';
import { IFormaDePago } from 'app/entities/forma-de-pago/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago/service/forma-de-pago.service';

@Component({
  selector: 'jhi-pago-efectivo-update',
  templateUrl: './pago-efectivo-update.component.html',
})
export class PagoEfectivoUpdateComponent implements OnInit {
  isSaving = false;

  formaDePagosCollection: IFormaDePago[] = [];

  editForm = this.fb.group({
    id: [],
    formaDePago: [null, Validators.required],
  });

  constructor(
    protected pagoEfectivoService: PagoEfectivoService,
    protected formaDePagoService: FormaDePagoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pagoEfectivo }) => {
      this.updateForm(pagoEfectivo);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pagoEfectivo = this.createFromForm();
    if (pagoEfectivo.id !== undefined) {
      this.subscribeToSaveResponse(this.pagoEfectivoService.update(pagoEfectivo));
    } else {
      this.subscribeToSaveResponse(this.pagoEfectivoService.create(pagoEfectivo));
    }
  }

  trackFormaDePagoById(index: number, item: IFormaDePago): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPagoEfectivo>>): void {
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

  protected updateForm(pagoEfectivo: IPagoEfectivo): void {
    this.editForm.patchValue({
      id: pagoEfectivo.id,
      formaDePago: pagoEfectivo.formaDePago,
    });

    this.formaDePagosCollection = this.formaDePagoService.addFormaDePagoToCollectionIfMissing(
      this.formaDePagosCollection,
      pagoEfectivo.formaDePago
    );
  }

  protected loadRelationshipsOptions(): void {
    this.formaDePagoService
      .query({ filter: 'pagoefectivo-is-null' })
      .pipe(map((res: HttpResponse<IFormaDePago[]>) => res.body ?? []))
      .pipe(
        map((formaDePagos: IFormaDePago[]) =>
          this.formaDePagoService.addFormaDePagoToCollectionIfMissing(formaDePagos, this.editForm.get('formaDePago')!.value)
        )
      )
      .subscribe((formaDePagos: IFormaDePago[]) => (this.formaDePagosCollection = formaDePagos));
  }

  protected createFromForm(): IPagoEfectivo {
    return {
      ...new PagoEfectivo(),
      id: this.editForm.get(['id'])!.value,
      formaDePago: this.editForm.get(['formaDePago'])!.value,
    };
  }
}

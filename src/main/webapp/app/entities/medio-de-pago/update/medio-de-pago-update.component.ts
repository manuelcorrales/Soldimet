import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IMedioDePago, MedioDePago } from '../medio-de-pago.model';
import { MedioDePagoService } from '../service/medio-de-pago.service';
import { IMedioDePagoCheque } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque.model';
import { MedioDePagoChequeService } from 'app/entities/medio-de-pago-cheque/service/medio-de-pago-cheque.service';
import { IFormaDePago } from 'app/entities/forma-de-pago/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago/service/forma-de-pago.service';

@Component({
  selector: 'jhi-medio-de-pago-update',
  templateUrl: './medio-de-pago-update.component.html',
})
export class MedioDePagoUpdateComponent implements OnInit {
  isSaving = false;

  medioDePagoChequesCollection: IMedioDePagoCheque[] = [];
  formaDePagosSharedCollection: IFormaDePago[] = [];

  editForm = this.fb.group({
    id: [],
    medioDePagoCheque: [],
    formaDePago: [null, Validators.required],
  });

  constructor(
    protected medioDePagoService: MedioDePagoService,
    protected medioDePagoChequeService: MedioDePagoChequeService,
    protected formaDePagoService: FormaDePagoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medioDePago }) => {
      this.updateForm(medioDePago);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const medioDePago = this.createFromForm();
    if (medioDePago.id !== undefined) {
      this.subscribeToSaveResponse(this.medioDePagoService.update(medioDePago));
    } else {
      this.subscribeToSaveResponse(this.medioDePagoService.create(medioDePago));
    }
  }

  trackMedioDePagoChequeById(index: number, item: IMedioDePagoCheque): number {
    return item.id!;
  }

  trackFormaDePagoById(index: number, item: IFormaDePago): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedioDePago>>): void {
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

  protected updateForm(medioDePago: IMedioDePago): void {
    this.editForm.patchValue({
      id: medioDePago.id,
      medioDePagoCheque: medioDePago.medioDePagoCheque,
      formaDePago: medioDePago.formaDePago,
    });

    this.medioDePagoChequesCollection = this.medioDePagoChequeService.addMedioDePagoChequeToCollectionIfMissing(
      this.medioDePagoChequesCollection,
      medioDePago.medioDePagoCheque
    );
    this.formaDePagosSharedCollection = this.formaDePagoService.addFormaDePagoToCollectionIfMissing(
      this.formaDePagosSharedCollection,
      medioDePago.formaDePago
    );
  }

  protected loadRelationshipsOptions(): void {
    this.medioDePagoChequeService
      .query({ filter: 'mediodepago-is-null' })
      .pipe(map((res: HttpResponse<IMedioDePagoCheque[]>) => res.body ?? []))
      .pipe(
        map((medioDePagoCheques: IMedioDePagoCheque[]) =>
          this.medioDePagoChequeService.addMedioDePagoChequeToCollectionIfMissing(
            medioDePagoCheques,
            this.editForm.get('medioDePagoCheque')!.value
          )
        )
      )
      .subscribe((medioDePagoCheques: IMedioDePagoCheque[]) => (this.medioDePagoChequesCollection = medioDePagoCheques));

    this.formaDePagoService
      .query()
      .pipe(map((res: HttpResponse<IFormaDePago[]>) => res.body ?? []))
      .pipe(
        map((formaDePagos: IFormaDePago[]) =>
          this.formaDePagoService.addFormaDePagoToCollectionIfMissing(formaDePagos, this.editForm.get('formaDePago')!.value)
        )
      )
      .subscribe((formaDePagos: IFormaDePago[]) => (this.formaDePagosSharedCollection = formaDePagos));
  }

  protected createFromForm(): IMedioDePago {
    return {
      ...new MedioDePago(),
      id: this.editForm.get(['id'])!.value,
      medioDePagoCheque: this.editForm.get(['medioDePagoCheque'])!.value,
      formaDePago: this.editForm.get(['formaDePago'])!.value,
    };
  }
}

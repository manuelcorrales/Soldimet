import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPagoCheque, PagoCheque } from '../pago-cheque.model';
import { PagoChequeService } from '../service/pago-cheque.service';
import { IFormaDePago } from 'app/entities/forma-de-pago/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago/service/forma-de-pago.service';
import { IBanco } from 'app/entities/banco/banco.model';
import { BancoService } from 'app/entities/banco/service/banco.service';

@Component({
  selector: 'jhi-pago-cheque-update',
  templateUrl: './pago-cheque-update.component.html',
})
export class PagoChequeUpdateComponent implements OnInit {
  isSaving = false;

  formaDePagosCollection: IFormaDePago[] = [];
  bancosSharedCollection: IBanco[] = [];

  editForm = this.fb.group({
    id: [],
    numeroCheque: [null, [Validators.required, Validators.minLength(3)]],
    formaDePago: [null, Validators.required],
    banco: [null, Validators.required],
  });

  constructor(
    protected pagoChequeService: PagoChequeService,
    protected formaDePagoService: FormaDePagoService,
    protected bancoService: BancoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pagoCheque }) => {
      this.updateForm(pagoCheque);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pagoCheque = this.createFromForm();
    if (pagoCheque.id !== undefined) {
      this.subscribeToSaveResponse(this.pagoChequeService.update(pagoCheque));
    } else {
      this.subscribeToSaveResponse(this.pagoChequeService.create(pagoCheque));
    }
  }

  trackFormaDePagoById(index: number, item: IFormaDePago): number {
    return item.id!;
  }

  trackBancoById(index: number, item: IBanco): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPagoCheque>>): void {
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

  protected updateForm(pagoCheque: IPagoCheque): void {
    this.editForm.patchValue({
      id: pagoCheque.id,
      numeroCheque: pagoCheque.numeroCheque,
      formaDePago: pagoCheque.formaDePago,
      banco: pagoCheque.banco,
    });

    this.formaDePagosCollection = this.formaDePagoService.addFormaDePagoToCollectionIfMissing(
      this.formaDePagosCollection,
      pagoCheque.formaDePago
    );
    this.bancosSharedCollection = this.bancoService.addBancoToCollectionIfMissing(this.bancosSharedCollection, pagoCheque.banco);
  }

  protected loadRelationshipsOptions(): void {
    this.formaDePagoService
      .query({ filter: 'pagocheque-is-null' })
      .pipe(map((res: HttpResponse<IFormaDePago[]>) => res.body ?? []))
      .pipe(
        map((formaDePagos: IFormaDePago[]) =>
          this.formaDePagoService.addFormaDePagoToCollectionIfMissing(formaDePagos, this.editForm.get('formaDePago')!.value)
        )
      )
      .subscribe((formaDePagos: IFormaDePago[]) => (this.formaDePagosCollection = formaDePagos));

    this.bancoService
      .query()
      .pipe(map((res: HttpResponse<IBanco[]>) => res.body ?? []))
      .pipe(map((bancos: IBanco[]) => this.bancoService.addBancoToCollectionIfMissing(bancos, this.editForm.get('banco')!.value)))
      .subscribe((bancos: IBanco[]) => (this.bancosSharedCollection = bancos));
  }

  protected createFromForm(): IPagoCheque {
    return {
      ...new PagoCheque(),
      id: this.editForm.get(['id'])!.value,
      numeroCheque: this.editForm.get(['numeroCheque'])!.value,
      formaDePago: this.editForm.get(['formaDePago'])!.value,
      banco: this.editForm.get(['banco'])!.value,
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IMedioDePagoCheque, MedioDePagoCheque } from '../medio-de-pago-cheque.model';
import { MedioDePagoChequeService } from '../service/medio-de-pago-cheque.service';
import { IBanco } from 'app/entities/banco/banco.model';
import { BancoService } from 'app/entities/banco/service/banco.service';

@Component({
  selector: 'jhi-medio-de-pago-cheque-update',
  templateUrl: './medio-de-pago-cheque-update.component.html',
})
export class MedioDePagoChequeUpdateComponent implements OnInit {
  isSaving = false;

  bancosSharedCollection: IBanco[] = [];

  editForm = this.fb.group({
    id: [],
    numeroCheque: [null, [Validators.required]],
    banco: [null, Validators.required],
  });

  constructor(
    protected medioDePagoChequeService: MedioDePagoChequeService,
    protected bancoService: BancoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medioDePagoCheque }) => {
      this.updateForm(medioDePagoCheque);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const medioDePagoCheque = this.createFromForm();
    if (medioDePagoCheque.id !== undefined) {
      this.subscribeToSaveResponse(this.medioDePagoChequeService.update(medioDePagoCheque));
    } else {
      this.subscribeToSaveResponse(this.medioDePagoChequeService.create(medioDePagoCheque));
    }
  }

  trackBancoById(index: number, item: IBanco): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedioDePagoCheque>>): void {
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

  protected updateForm(medioDePagoCheque: IMedioDePagoCheque): void {
    this.editForm.patchValue({
      id: medioDePagoCheque.id,
      numeroCheque: medioDePagoCheque.numeroCheque,
      banco: medioDePagoCheque.banco,
    });

    this.bancosSharedCollection = this.bancoService.addBancoToCollectionIfMissing(this.bancosSharedCollection, medioDePagoCheque.banco);
  }

  protected loadRelationshipsOptions(): void {
    this.bancoService
      .query()
      .pipe(map((res: HttpResponse<IBanco[]>) => res.body ?? []))
      .pipe(map((bancos: IBanco[]) => this.bancoService.addBancoToCollectionIfMissing(bancos, this.editForm.get('banco')!.value)))
      .subscribe((bancos: IBanco[]) => (this.bancosSharedCollection = bancos));
  }

  protected createFromForm(): IMedioDePagoCheque {
    return {
      ...new MedioDePagoCheque(),
      id: this.editForm.get(['id'])!.value,
      numeroCheque: this.editForm.get(['numeroCheque'])!.value,
      banco: this.editForm.get(['banco'])!.value,
    };
  }
}

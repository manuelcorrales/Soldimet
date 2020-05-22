import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMedioDePagoCheque, MedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';
import { MedioDePagoChequeService } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque.service';
import { IBanco } from 'app/shared/model/banco.model';
import { BancoService } from 'app/entities/banco/banco.service';

@Component({
  selector: 'jhi-medio-de-pago-cheque-update',
  templateUrl: './medio-de-pago-cheque-update.component.html'
})
export class MedioDePagoChequeUpdateComponent implements OnInit {
  isSaving: boolean;

  bancos: IBanco[];

  editForm = this.fb.group({
    id: [],
    numeroCheque: [null, [Validators.required]],
    banco: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected medioDePagoChequeService: MedioDePagoChequeService,
    protected bancoService: BancoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ medioDePagoCheque }) => {
      this.updateForm(medioDePagoCheque);
    });
    this.bancoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBanco[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBanco[]>) => response.body)
      )
      .subscribe((res: IBanco[]) => (this.bancos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(medioDePagoCheque: IMedioDePagoCheque) {
    this.editForm.patchValue({
      id: medioDePagoCheque.id,
      numeroCheque: medioDePagoCheque.numeroCheque,
      banco: medioDePagoCheque.banco
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const medioDePagoCheque = this.createFromForm();
    if (medioDePagoCheque.id !== undefined) {
      this.subscribeToSaveResponse(this.medioDePagoChequeService.update(medioDePagoCheque));
    } else {
      this.subscribeToSaveResponse(this.medioDePagoChequeService.create(medioDePagoCheque));
    }
  }

  private createFromForm(): IMedioDePagoCheque {
    return {
      ...new MedioDePagoCheque(),
      id: this.editForm.get(['id']).value,
      numeroCheque: this.editForm.get(['numeroCheque']).value,
      banco: this.editForm.get(['banco']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedioDePagoCheque>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackBancoById(index: number, item: IBanco) {
    return item.id;
  }
}

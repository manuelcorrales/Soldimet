import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPagoCheque, PagoCheque } from 'app/shared/model/pago-cheque.model';
import { PagoChequeService } from './pago-cheque.service';
import { IBanco } from 'app/shared/model/banco.model';
import { BancoService } from 'app/entities/banco/banco.service';
import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago/forma-de-pago.service';

@Component({
  selector: 'jhi-pago-cheque-update',
  templateUrl: './pago-cheque-update.component.html'
})
export class PagoChequeUpdateComponent implements OnInit {
  isSaving: boolean;

  bancos: IBanco[];

  formadepagos: IFormaDePago[];
  fechaCobroDp: any;
  fechaReciboDp: any;

  editForm = this.fb.group({
    id: [],
    fechaCobro: [null, [Validators.required]],
    fechaRecibo: [null, [Validators.required]],
    numeroCheque: [null, [Validators.required, Validators.minLength(3)]],
    numeroCuenta: [],
    banco: [null, Validators.required],
    formaDePago: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected pagoChequeService: PagoChequeService,
    protected bancoService: BancoService,
    protected formaDePagoService: FormaDePagoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pagoCheque }) => {
      this.updateForm(pagoCheque);
    });
    this.bancoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBanco[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBanco[]>) => response.body)
      )
      .subscribe((res: IBanco[]) => (this.bancos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.formaDePagoService
      .query({ filter: 'pagocheque-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IFormaDePago[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFormaDePago[]>) => response.body)
      )
      .subscribe(
        (res: IFormaDePago[]) => {
          if (!this.editForm.get('formaDePago').value || !this.editForm.get('formaDePago').value.id) {
            this.formadepagos = res;
          } else {
            this.formaDePagoService
              .find(this.editForm.get('formaDePago').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IFormaDePago>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IFormaDePago>) => subResponse.body)
              )
              .subscribe(
                (subRes: IFormaDePago) => (this.formadepagos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(pagoCheque: IPagoCheque) {
    this.editForm.patchValue({
      id: pagoCheque.id,
      fechaCobro: pagoCheque.fechaCobro,
      fechaRecibo: pagoCheque.fechaRecibo,
      numeroCheque: pagoCheque.numeroCheque,
      numeroCuenta: pagoCheque.numeroCuenta,
      banco: pagoCheque.banco,
      formaDePago: pagoCheque.formaDePago
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pagoCheque = this.createFromForm();
    if (pagoCheque.id !== undefined) {
      this.subscribeToSaveResponse(this.pagoChequeService.update(pagoCheque));
    } else {
      this.subscribeToSaveResponse(this.pagoChequeService.create(pagoCheque));
    }
  }

  private createFromForm(): IPagoCheque {
    return {
      ...new PagoCheque(),
      id: this.editForm.get(['id']).value,
      fechaCobro: this.editForm.get(['fechaCobro']).value,
      fechaRecibo: this.editForm.get(['fechaRecibo']).value,
      numeroCheque: this.editForm.get(['numeroCheque']).value,
      numeroCuenta: this.editForm.get(['numeroCuenta']).value,
      banco: this.editForm.get(['banco']).value,
      formaDePago: this.editForm.get(['formaDePago']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPagoCheque>>) {
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

  trackFormaDePagoById(index: number, item: IFormaDePago) {
    return item.id;
  }
}

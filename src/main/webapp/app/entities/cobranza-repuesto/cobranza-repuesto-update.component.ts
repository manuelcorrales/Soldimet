import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICobranzaRepuesto, CobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';
import { CobranzaRepuestoService } from './cobranza-repuesto.service';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/tipo-repuesto.service';

@Component({
  selector: 'jhi-cobranza-repuesto-update',
  templateUrl: './cobranza-repuesto-update.component.html'
})
export class CobranzaRepuestoUpdateComponent implements OnInit {
  isSaving: boolean;

  tiporepuestos: ITipoRepuesto[];

  editForm = this.fb.group({
    id: [],
    valor: [null, [Validators.required, Validators.min(0)]],
    tipoRepuesto: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cobranzaRepuestoService: CobranzaRepuestoService,
    protected tipoRepuestoService: TipoRepuestoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cobranzaRepuesto }) => {
      this.updateForm(cobranzaRepuesto);
    });
    this.tipoRepuestoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoRepuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoRepuesto[]>) => response.body)
      )
      .subscribe((res: ITipoRepuesto[]) => (this.tiporepuestos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(cobranzaRepuesto: ICobranzaRepuesto) {
    this.editForm.patchValue({
      id: cobranzaRepuesto.id,
      valor: cobranzaRepuesto.valor,
      tipoRepuesto: cobranzaRepuesto.tipoRepuesto
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cobranzaRepuesto = this.createFromForm();
    if (cobranzaRepuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.cobranzaRepuestoService.update(cobranzaRepuesto));
    } else {
      this.subscribeToSaveResponse(this.cobranzaRepuestoService.create(cobranzaRepuesto));
    }
  }

  private createFromForm(): ICobranzaRepuesto {
    return {
      ...new CobranzaRepuesto(),
      id: this.editForm.get(['id']).value,
      valor: this.editForm.get(['valor']).value,
      tipoRepuesto: this.editForm.get(['tipoRepuesto']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICobranzaRepuesto>>) {
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

  trackTipoRepuestoById(index: number, item: ITipoRepuesto) {
    return item.id;
  }
}

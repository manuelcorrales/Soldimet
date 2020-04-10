import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ICaja, Caja } from 'app/shared/model/caja.model';
import { CajaService } from 'app/entities/caja/caja.service';
import { ISucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/sucursal.service';

@Component({
  selector: 'jhi-caja-update',
  templateUrl: './caja-update.component.html'
})
export class CajaUpdateComponent implements OnInit {
  isSaving: boolean;

  sucursals: ISucursal[];
  fechaDp: any;

  editForm = this.fb.group({
    id: [],
    fecha: [null, [Validators.required]],
    horaApertura: [null, [Validators.required]],
    horaCierre: [],
    saldo: [],
    observaciones: [],
    saldoFisico: [],
    sucursal: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cajaService: CajaService,
    protected sucursalService: SucursalService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ caja }) => {
      this.updateForm(caja);
    });
    this.sucursalService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISucursal[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISucursal[]>) => response.body)
      )
      .subscribe((res: ISucursal[]) => (this.sucursals = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(caja: ICaja) {
    this.editForm.patchValue({
      id: caja.id,
      fecha: caja.fecha,
      horaApertura: caja.horaApertura != null ? caja.horaApertura.format(DATE_TIME_FORMAT) : null,
      horaCierre: caja.horaCierre != null ? caja.horaCierre.format(DATE_TIME_FORMAT) : null,
      saldo: caja.saldo,
      observaciones: caja.observaciones,
      saldoFisico: caja.saldoFisico,
      sucursal: caja.sucursal
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const caja = this.createFromForm();
    if (caja.id !== undefined) {
      this.subscribeToSaveResponse(this.cajaService.update(caja));
    } else {
      this.subscribeToSaveResponse(this.cajaService.create(caja));
    }
  }

  private createFromForm(): ICaja {
    return {
      ...new Caja(),
      id: this.editForm.get(['id']).value,
      fecha: this.editForm.get(['fecha']).value,
      horaApertura:
        this.editForm.get(['horaApertura']).value != null ? moment(this.editForm.get(['horaApertura']).value, DATE_TIME_FORMAT) : undefined,
      horaCierre:
        this.editForm.get(['horaCierre']).value != null ? moment(this.editForm.get(['horaCierre']).value, DATE_TIME_FORMAT) : undefined,
      saldo: this.editForm.get(['saldo']).value,
      observaciones: this.editForm.get(['observaciones']).value,
      saldoFisico: this.editForm.get(['saldoFisico']).value,
      sucursal: this.editForm.get(['sucursal']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICaja>>) {
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

  trackSucursalById(index: number, item: ISucursal) {
    return item.id;
  }
}

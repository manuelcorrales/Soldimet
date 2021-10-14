import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { ICaja, Caja } from '../caja.model';
import { CajaService } from '../service/caja.service';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/service/sucursal.service';

@Component({
  selector: 'jhi-caja-update',
  templateUrl: './caja-update.component.html',
})
export class CajaUpdateComponent implements OnInit {
  isSaving = false;

  sucursalsSharedCollection: ISucursal[] = [];

  editForm = this.fb.group({
    id: [],
    fecha: [null, [Validators.required]],
    horaApertura: [null, [Validators.required]],
    horaCierre: [],
    saldo: [],
    observaciones: [],
    saldoFisico: [],
    sucursal: [],
  });

  constructor(
    protected cajaService: CajaService,
    protected sucursalService: SucursalService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ caja }) => {
      if (caja.id === undefined) {
        const today = dayjs().startOf('day');
        caja.horaApertura = today;
        caja.horaCierre = today;
      }

      this.updateForm(caja);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const caja = this.createFromForm();
    if (caja.id !== undefined) {
      this.subscribeToSaveResponse(this.cajaService.update(caja));
    } else {
      this.subscribeToSaveResponse(this.cajaService.create(caja));
    }
  }

  trackSucursalById(index: number, item: ISucursal): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICaja>>): void {
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

  protected updateForm(caja: ICaja): void {
    this.editForm.patchValue({
      id: caja.id,
      fecha: caja.fecha,
      horaApertura: caja.horaApertura ? caja.horaApertura.format(DATE_TIME_FORMAT) : null,
      horaCierre: caja.horaCierre ? caja.horaCierre.format(DATE_TIME_FORMAT) : null,
      saldo: caja.saldo,
      observaciones: caja.observaciones,
      saldoFisico: caja.saldoFisico,
      sucursal: caja.sucursal,
    });

    this.sucursalsSharedCollection = this.sucursalService.addSucursalToCollectionIfMissing(this.sucursalsSharedCollection, caja.sucursal);
  }

  protected loadRelationshipsOptions(): void {
    this.sucursalService
      .query()
      .pipe(map((res: HttpResponse<ISucursal[]>) => res.body ?? []))
      .pipe(
        map((sucursals: ISucursal[]) =>
          this.sucursalService.addSucursalToCollectionIfMissing(sucursals, this.editForm.get('sucursal')!.value)
        )
      )
      .subscribe((sucursals: ISucursal[]) => (this.sucursalsSharedCollection = sucursals));
  }

  protected createFromForm(): ICaja {
    return {
      ...new Caja(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value,
      horaApertura: this.editForm.get(['horaApertura'])!.value
        ? dayjs(this.editForm.get(['horaApertura'])!.value, DATE_TIME_FORMAT)
        : undefined,
      horaCierre: this.editForm.get(['horaCierre'])!.value ? dayjs(this.editForm.get(['horaCierre'])!.value, DATE_TIME_FORMAT) : undefined,
      saldo: this.editForm.get(['saldo'])!.value,
      observaciones: this.editForm.get(['observaciones'])!.value,
      saldoFisico: this.editForm.get(['saldoFisico'])!.value,
      sucursal: this.editForm.get(['sucursal'])!.value,
    };
  }
}

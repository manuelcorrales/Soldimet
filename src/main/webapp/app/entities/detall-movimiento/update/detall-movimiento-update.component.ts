import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDetallMovimiento, DetallMovimiento } from '../detall-movimiento.model';
import { DetallMovimientoService } from '../service/detall-movimiento.service';
import { IMedidaArticulo } from 'app/entities/medida-articulo/medida-articulo.model';
import { MedidaArticuloService } from 'app/entities/medida-articulo/service/medida-articulo.service';

@Component({
  selector: 'jhi-detall-movimiento-update',
  templateUrl: './detall-movimiento-update.component.html',
})
export class DetallMovimientoUpdateComponent implements OnInit {
  isSaving = false;

  medidaArticulosSharedCollection: IMedidaArticulo[] = [];

  editForm = this.fb.group({
    id: [],
    medida: [],
  });

  constructor(
    protected detallMovimientoService: DetallMovimientoService,
    protected medidaArticuloService: MedidaArticuloService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detallMovimiento }) => {
      this.updateForm(detallMovimiento);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const detallMovimiento = this.createFromForm();
    if (detallMovimiento.id !== undefined) {
      this.subscribeToSaveResponse(this.detallMovimientoService.update(detallMovimiento));
    } else {
      this.subscribeToSaveResponse(this.detallMovimientoService.create(detallMovimiento));
    }
  }

  trackMedidaArticuloById(index: number, item: IMedidaArticulo): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetallMovimiento>>): void {
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

  protected updateForm(detallMovimiento: IDetallMovimiento): void {
    this.editForm.patchValue({
      id: detallMovimiento.id,
      medida: detallMovimiento.medida,
    });

    this.medidaArticulosSharedCollection = this.medidaArticuloService.addMedidaArticuloToCollectionIfMissing(
      this.medidaArticulosSharedCollection,
      detallMovimiento.medida
    );
  }

  protected loadRelationshipsOptions(): void {
    this.medidaArticuloService
      .query()
      .pipe(map((res: HttpResponse<IMedidaArticulo[]>) => res.body ?? []))
      .pipe(
        map((medidaArticulos: IMedidaArticulo[]) =>
          this.medidaArticuloService.addMedidaArticuloToCollectionIfMissing(medidaArticulos, this.editForm.get('medida')!.value)
        )
      )
      .subscribe((medidaArticulos: IMedidaArticulo[]) => (this.medidaArticulosSharedCollection = medidaArticulos));
  }

  protected createFromForm(): IDetallMovimiento {
    return {
      ...new DetallMovimiento(),
      id: this.editForm.get(['id'])!.value,
      medida: this.editForm.get(['medida'])!.value,
    };
  }
}

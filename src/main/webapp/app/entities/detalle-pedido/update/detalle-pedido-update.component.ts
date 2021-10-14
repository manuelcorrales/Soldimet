import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDetallePedido, DetallePedido } from '../detalle-pedido.model';
import { DetallePedidoService } from '../service/detalle-pedido.service';
import { IDetallePresupuesto } from 'app/entities/detalle-presupuesto/detalle-presupuesto.model';
import { DetallePresupuestoService } from 'app/entities/detalle-presupuesto/service/detalle-presupuesto.service';

@Component({
  selector: 'jhi-detalle-pedido-update',
  templateUrl: './detalle-pedido-update.component.html',
})
export class DetallePedidoUpdateComponent implements OnInit {
  isSaving = false;

  detallePresupuestosCollection: IDetallePresupuesto[] = [];

  editForm = this.fb.group({
    id: [],
    detallePresupuesto: [null, Validators.required],
  });

  constructor(
    protected detallePedidoService: DetallePedidoService,
    protected detallePresupuestoService: DetallePresupuestoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detallePedido }) => {
      this.updateForm(detallePedido);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const detallePedido = this.createFromForm();
    if (detallePedido.id !== undefined) {
      this.subscribeToSaveResponse(this.detallePedidoService.update(detallePedido));
    } else {
      this.subscribeToSaveResponse(this.detallePedidoService.create(detallePedido));
    }
  }

  trackDetallePresupuestoById(index: number, item: IDetallePresupuesto): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetallePedido>>): void {
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

  protected updateForm(detallePedido: IDetallePedido): void {
    this.editForm.patchValue({
      id: detallePedido.id,
      detallePresupuesto: detallePedido.detallePresupuesto,
    });

    this.detallePresupuestosCollection = this.detallePresupuestoService.addDetallePresupuestoToCollectionIfMissing(
      this.detallePresupuestosCollection,
      detallePedido.detallePresupuesto
    );
  }

  protected loadRelationshipsOptions(): void {
    this.detallePresupuestoService
      .query({ filter: 'detallepedido-is-null' })
      .pipe(map((res: HttpResponse<IDetallePresupuesto[]>) => res.body ?? []))
      .pipe(
        map((detallePresupuestos: IDetallePresupuesto[]) =>
          this.detallePresupuestoService.addDetallePresupuestoToCollectionIfMissing(
            detallePresupuestos,
            this.editForm.get('detallePresupuesto')!.value
          )
        )
      )
      .subscribe((detallePresupuestos: IDetallePresupuesto[]) => (this.detallePresupuestosCollection = detallePresupuestos));
  }

  protected createFromForm(): IDetallePedido {
    return {
      ...new DetallePedido(),
      id: this.editForm.get(['id'])!.value,
      detallePresupuesto: this.editForm.get(['detallePresupuesto'])!.value,
    };
  }
}

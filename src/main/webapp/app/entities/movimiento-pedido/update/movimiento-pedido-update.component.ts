import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IMovimientoPedido, MovimientoPedido } from '../movimiento-pedido.model';
import { MovimientoPedidoService } from '../service/movimiento-pedido.service';
import { IMovimiento } from 'app/entities/movimiento/movimiento.model';
import { MovimientoService } from 'app/entities/movimiento/service/movimiento.service';
import { IPedidoRepuesto } from 'app/entities/pedido-repuesto/pedido-repuesto.model';
import { PedidoRepuestoService } from 'app/entities/pedido-repuesto/service/pedido-repuesto.service';

@Component({
  selector: 'jhi-movimiento-pedido-update',
  templateUrl: './movimiento-pedido-update.component.html',
})
export class MovimientoPedidoUpdateComponent implements OnInit {
  isSaving = false;

  movimientosCollection: IMovimiento[] = [];
  pedidoRepuestosSharedCollection: IPedidoRepuesto[] = [];

  editForm = this.fb.group({
    id: [],
    movimiento: [null, Validators.required],
    pedidoRepuesto: [null, Validators.required],
  });

  constructor(
    protected movimientoPedidoService: MovimientoPedidoService,
    protected movimientoService: MovimientoService,
    protected pedidoRepuestoService: PedidoRepuestoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movimientoPedido }) => {
      this.updateForm(movimientoPedido);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const movimientoPedido = this.createFromForm();
    if (movimientoPedido.id !== undefined) {
      this.subscribeToSaveResponse(this.movimientoPedidoService.update(movimientoPedido));
    } else {
      this.subscribeToSaveResponse(this.movimientoPedidoService.create(movimientoPedido));
    }
  }

  trackMovimientoById(index: number, item: IMovimiento): number {
    return item.id!;
  }

  trackPedidoRepuestoById(index: number, item: IPedidoRepuesto): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovimientoPedido>>): void {
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

  protected updateForm(movimientoPedido: IMovimientoPedido): void {
    this.editForm.patchValue({
      id: movimientoPedido.id,
      movimiento: movimientoPedido.movimiento,
      pedidoRepuesto: movimientoPedido.pedidoRepuesto,
    });

    this.movimientosCollection = this.movimientoService.addMovimientoToCollectionIfMissing(
      this.movimientosCollection,
      movimientoPedido.movimiento
    );
    this.pedidoRepuestosSharedCollection = this.pedidoRepuestoService.addPedidoRepuestoToCollectionIfMissing(
      this.pedidoRepuestosSharedCollection,
      movimientoPedido.pedidoRepuesto
    );
  }

  protected loadRelationshipsOptions(): void {
    this.movimientoService
      .query({ filter: 'movimientopedido-is-null' })
      .pipe(map((res: HttpResponse<IMovimiento[]>) => res.body ?? []))
      .pipe(
        map((movimientos: IMovimiento[]) =>
          this.movimientoService.addMovimientoToCollectionIfMissing(movimientos, this.editForm.get('movimiento')!.value)
        )
      )
      .subscribe((movimientos: IMovimiento[]) => (this.movimientosCollection = movimientos));

    this.pedidoRepuestoService
      .query()
      .pipe(map((res: HttpResponse<IPedidoRepuesto[]>) => res.body ?? []))
      .pipe(
        map((pedidoRepuestos: IPedidoRepuesto[]) =>
          this.pedidoRepuestoService.addPedidoRepuestoToCollectionIfMissing(pedidoRepuestos, this.editForm.get('pedidoRepuesto')!.value)
        )
      )
      .subscribe((pedidoRepuestos: IPedidoRepuesto[]) => (this.pedidoRepuestosSharedCollection = pedidoRepuestos));
  }

  protected createFromForm(): IMovimientoPedido {
    return {
      ...new MovimientoPedido(),
      id: this.editForm.get(['id'])!.value,
      movimiento: this.editForm.get(['movimiento'])!.value,
      pedidoRepuesto: this.editForm.get(['pedidoRepuesto'])!.value,
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPedidoRepuesto, PedidoRepuesto } from '../pedido-repuesto.model';
import { PedidoRepuestoService } from '../service/pedido-repuesto.service';
import { IEstadoPedidoRepuesto } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoService } from 'app/entities/estado-pedido-repuesto/service/estado-pedido-repuesto.service';
import { IPresupuesto } from 'app/entities/presupuesto/presupuesto.model';
import { PresupuestoService } from 'app/entities/presupuesto/service/presupuesto.service';
import { IDocumentationType } from 'app/entities/documentation-type/documentation-type.model';
import { DocumentationTypeService } from 'app/entities/documentation-type/service/documentation-type.service';

@Component({
  selector: 'jhi-pedido-repuesto-update',
  templateUrl: './pedido-repuesto-update.component.html',
})
export class PedidoRepuestoUpdateComponent implements OnInit {
  isSaving = false;

  estadoPedidoRepuestosSharedCollection: IEstadoPedidoRepuesto[] = [];
  presupuestosSharedCollection: IPresupuesto[] = [];
  documentationTypesSharedCollection: IDocumentationType[] = [];

  editForm = this.fb.group({
    id: [],
    fechaCreacion: [null, [Validators.required]],
    fechaPedido: [],
    fechaRecibo: [],
    estadoPedidoRepuesto: [null, Validators.required],
    presupuesto: [null, Validators.required],
    documentType: [],
  });

  constructor(
    protected pedidoRepuestoService: PedidoRepuestoService,
    protected estadoPedidoRepuestoService: EstadoPedidoRepuestoService,
    protected presupuestoService: PresupuestoService,
    protected documentationTypeService: DocumentationTypeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pedidoRepuesto }) => {
      this.updateForm(pedidoRepuesto);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pedidoRepuesto = this.createFromForm();
    if (pedidoRepuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.pedidoRepuestoService.update(pedidoRepuesto));
    } else {
      this.subscribeToSaveResponse(this.pedidoRepuestoService.create(pedidoRepuesto));
    }
  }

  trackEstadoPedidoRepuestoById(index: number, item: IEstadoPedidoRepuesto): number {
    return item.id!;
  }

  trackPresupuestoById(index: number, item: IPresupuesto): number {
    return item.id!;
  }

  trackDocumentationTypeById(index: number, item: IDocumentationType): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPedidoRepuesto>>): void {
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

  protected updateForm(pedidoRepuesto: IPedidoRepuesto): void {
    this.editForm.patchValue({
      id: pedidoRepuesto.id,
      fechaCreacion: pedidoRepuesto.fechaCreacion,
      fechaPedido: pedidoRepuesto.fechaPedido,
      fechaRecibo: pedidoRepuesto.fechaRecibo,
      estadoPedidoRepuesto: pedidoRepuesto.estadoPedidoRepuesto,
      presupuesto: pedidoRepuesto.presupuesto,
      documentType: pedidoRepuesto.documentType,
    });

    this.estadoPedidoRepuestosSharedCollection = this.estadoPedidoRepuestoService.addEstadoPedidoRepuestoToCollectionIfMissing(
      this.estadoPedidoRepuestosSharedCollection,
      pedidoRepuesto.estadoPedidoRepuesto
    );
    this.presupuestosSharedCollection = this.presupuestoService.addPresupuestoToCollectionIfMissing(
      this.presupuestosSharedCollection,
      pedidoRepuesto.presupuesto
    );
    this.documentationTypesSharedCollection = this.documentationTypeService.addDocumentationTypeToCollectionIfMissing(
      this.documentationTypesSharedCollection,
      pedidoRepuesto.documentType
    );
  }

  protected loadRelationshipsOptions(): void {
    this.estadoPedidoRepuestoService
      .query()
      .pipe(map((res: HttpResponse<IEstadoPedidoRepuesto[]>) => res.body ?? []))
      .pipe(
        map((estadoPedidoRepuestos: IEstadoPedidoRepuesto[]) =>
          this.estadoPedidoRepuestoService.addEstadoPedidoRepuestoToCollectionIfMissing(
            estadoPedidoRepuestos,
            this.editForm.get('estadoPedidoRepuesto')!.value
          )
        )
      )
      .subscribe((estadoPedidoRepuestos: IEstadoPedidoRepuesto[]) => (this.estadoPedidoRepuestosSharedCollection = estadoPedidoRepuestos));

    this.presupuestoService
      .query()
      .pipe(map((res: HttpResponse<IPresupuesto[]>) => res.body ?? []))
      .pipe(
        map((presupuestos: IPresupuesto[]) =>
          this.presupuestoService.addPresupuestoToCollectionIfMissing(presupuestos, this.editForm.get('presupuesto')!.value)
        )
      )
      .subscribe((presupuestos: IPresupuesto[]) => (this.presupuestosSharedCollection = presupuestos));

    this.documentationTypeService
      .query()
      .pipe(map((res: HttpResponse<IDocumentationType[]>) => res.body ?? []))
      .pipe(
        map((documentationTypes: IDocumentationType[]) =>
          this.documentationTypeService.addDocumentationTypeToCollectionIfMissing(
            documentationTypes,
            this.editForm.get('documentType')!.value
          )
        )
      )
      .subscribe((documentationTypes: IDocumentationType[]) => (this.documentationTypesSharedCollection = documentationTypes));
  }

  protected createFromForm(): IPedidoRepuesto {
    return {
      ...new PedidoRepuesto(),
      id: this.editForm.get(['id'])!.value,
      fechaCreacion: this.editForm.get(['fechaCreacion'])!.value,
      fechaPedido: this.editForm.get(['fechaPedido'])!.value,
      fechaRecibo: this.editForm.get(['fechaRecibo'])!.value,
      estadoPedidoRepuesto: this.editForm.get(['estadoPedidoRepuesto'])!.value,
      presupuesto: this.editForm.get(['presupuesto'])!.value,
      documentType: this.editForm.get(['documentType'])!.value,
    };
  }
}

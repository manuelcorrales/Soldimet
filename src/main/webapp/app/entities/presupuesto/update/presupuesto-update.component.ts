import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPresupuesto, Presupuesto } from '../presupuesto.model';
import { PresupuestoService } from '../service/presupuesto.service';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';
import { IEstadoPresupuesto } from 'app/entities/estado-presupuesto/estado-presupuesto.model';
import { EstadoPresupuestoService } from 'app/entities/estado-presupuesto/service/estado-presupuesto.service';
import { IDocumentationType } from 'app/entities/documentation-type/documentation-type.model';
import { DocumentationTypeService } from 'app/entities/documentation-type/service/documentation-type.service';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/service/sucursal.service';

@Component({
  selector: 'jhi-presupuesto-update',
  templateUrl: './presupuesto-update.component.html',
})
export class PresupuestoUpdateComponent implements OnInit {
  isSaving = false;

  clientesSharedCollection: ICliente[] = [];
  estadoPresupuestosSharedCollection: IEstadoPresupuesto[] = [];
  documentationTypesSharedCollection: IDocumentationType[] = [];
  sucursalsSharedCollection: ISucursal[] = [];

  editForm = this.fb.group({
    id: [],
    descripcionDescuento: [null, [Validators.minLength(5)]],
    descuento: [null, [Validators.min(0)]],
    fechaCreacion: [],
    fechaAceptado: [],
    fechaEntregado: [],
    importeTotal: [null, [Validators.required, Validators.min(0)]],
    observaciones: [],
    soldadura: [],
    modelo: [],
    cliente: [null, Validators.required],
    estadoPresupuesto: [null, Validators.required],
    documentType: [],
    sucursal: [],
  });

  constructor(
    protected presupuestoService: PresupuestoService,
    protected clienteService: ClienteService,
    protected estadoPresupuestoService: EstadoPresupuestoService,
    protected documentationTypeService: DocumentationTypeService,
    protected sucursalService: SucursalService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ presupuesto }) => {
      this.updateForm(presupuesto);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const presupuesto = this.createFromForm();
    if (presupuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.presupuestoService.update(presupuesto));
    } else {
      this.subscribeToSaveResponse(this.presupuestoService.create(presupuesto));
    }
  }

  trackClienteById(index: number, item: ICliente): number {
    return item.id!;
  }

  trackEstadoPresupuestoById(index: number, item: IEstadoPresupuesto): number {
    return item.id!;
  }

  trackDocumentationTypeById(index: number, item: IDocumentationType): number {
    return item.id!;
  }

  trackSucursalById(index: number, item: ISucursal): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPresupuesto>>): void {
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

  protected updateForm(presupuesto: IPresupuesto): void {
    this.editForm.patchValue({
      id: presupuesto.id,
      descripcionDescuento: presupuesto.descripcionDescuento,
      descuento: presupuesto.descuento,
      fechaCreacion: presupuesto.fechaCreacion,
      fechaAceptado: presupuesto.fechaAceptado,
      fechaEntregado: presupuesto.fechaEntregado,
      importeTotal: presupuesto.importeTotal,
      observaciones: presupuesto.observaciones,
      soldadura: presupuesto.soldadura,
      modelo: presupuesto.modelo,
      cliente: presupuesto.cliente,
      estadoPresupuesto: presupuesto.estadoPresupuesto,
      documentType: presupuesto.documentType,
      sucursal: presupuesto.sucursal,
    });

    this.clientesSharedCollection = this.clienteService.addClienteToCollectionIfMissing(this.clientesSharedCollection, presupuesto.cliente);
    this.estadoPresupuestosSharedCollection = this.estadoPresupuestoService.addEstadoPresupuestoToCollectionIfMissing(
      this.estadoPresupuestosSharedCollection,
      presupuesto.estadoPresupuesto
    );
    this.documentationTypesSharedCollection = this.documentationTypeService.addDocumentationTypeToCollectionIfMissing(
      this.documentationTypesSharedCollection,
      presupuesto.documentType
    );
    this.sucursalsSharedCollection = this.sucursalService.addSucursalToCollectionIfMissing(
      this.sucursalsSharedCollection,
      presupuesto.sucursal
    );
  }

  protected loadRelationshipsOptions(): void {
    this.clienteService
      .query()
      .pipe(map((res: HttpResponse<ICliente[]>) => res.body ?? []))
      .pipe(
        map((clientes: ICliente[]) => this.clienteService.addClienteToCollectionIfMissing(clientes, this.editForm.get('cliente')!.value))
      )
      .subscribe((clientes: ICliente[]) => (this.clientesSharedCollection = clientes));

    this.estadoPresupuestoService
      .query()
      .pipe(map((res: HttpResponse<IEstadoPresupuesto[]>) => res.body ?? []))
      .pipe(
        map((estadoPresupuestos: IEstadoPresupuesto[]) =>
          this.estadoPresupuestoService.addEstadoPresupuestoToCollectionIfMissing(
            estadoPresupuestos,
            this.editForm.get('estadoPresupuesto')!.value
          )
        )
      )
      .subscribe((estadoPresupuestos: IEstadoPresupuesto[]) => (this.estadoPresupuestosSharedCollection = estadoPresupuestos));

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

  protected createFromForm(): IPresupuesto {
    return {
      ...new Presupuesto(),
      id: this.editForm.get(['id'])!.value,
      descripcionDescuento: this.editForm.get(['descripcionDescuento'])!.value,
      descuento: this.editForm.get(['descuento'])!.value,
      fechaCreacion: this.editForm.get(['fechaCreacion'])!.value,
      fechaAceptado: this.editForm.get(['fechaAceptado'])!.value,
      fechaEntregado: this.editForm.get(['fechaEntregado'])!.value,
      importeTotal: this.editForm.get(['importeTotal'])!.value,
      observaciones: this.editForm.get(['observaciones'])!.value,
      soldadura: this.editForm.get(['soldadura'])!.value,
      modelo: this.editForm.get(['modelo'])!.value,
      cliente: this.editForm.get(['cliente'])!.value,
      estadoPresupuesto: this.editForm.get(['estadoPresupuesto'])!.value,
      documentType: this.editForm.get(['documentType'])!.value,
      sucursal: this.editForm.get(['sucursal'])!.value,
    };
  }
}

import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPresupuesto, Presupuesto } from 'app/shared/model/presupuesto.model';
import { PresupuestoService } from './presupuesto.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { IEstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';
import { EstadoPresupuestoService } from 'app/entities/estado-presupuesto/estado-presupuesto.service';
import { IDocumentationType } from 'app/shared/model/documentation-type.model';
import { DocumentationTypeService } from 'app/entities/documentation-type/documentation-type.service';
import { ISucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/sucursal.service';

@Component({
  selector: 'jhi-presupuesto-update',
  templateUrl: './presupuesto-update.component.html'
})
export class PresupuestoUpdateComponent implements OnInit {
  isSaving: boolean;

  clientes: ICliente[];

  estadopresupuestos: IEstadoPresupuesto[];

  documentationtypes: IDocumentationType[];

  sucursals: ISucursal[];
  fechaCreacionDp: any;
  fechaAceptadoDp: any;
  fechaEntregadoDp: any;

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
    sucursal: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected presupuestoService: PresupuestoService,
    protected clienteService: ClienteService,
    protected estadoPresupuestoService: EstadoPresupuestoService,
    protected documentationTypeService: DocumentationTypeService,
    protected sucursalService: SucursalService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ presupuesto }) => {
      this.updateForm(presupuesto);
    });
    this.clienteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICliente[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICliente[]>) => response.body)
      )
      .subscribe((res: ICliente[]) => (this.clientes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.estadoPresupuestoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEstadoPresupuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEstadoPresupuesto[]>) => response.body)
      )
      .subscribe((res: IEstadoPresupuesto[]) => (this.estadopresupuestos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.documentationTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDocumentationType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDocumentationType[]>) => response.body)
      )
      .subscribe((res: IDocumentationType[]) => (this.documentationtypes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.sucursalService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISucursal[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISucursal[]>) => response.body)
      )
      .subscribe((res: ISucursal[]) => (this.sucursals = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(presupuesto: IPresupuesto) {
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
      sucursal: presupuesto.sucursal
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const presupuesto = this.createFromForm();
    if (presupuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.presupuestoService.update(presupuesto));
    } else {
      this.subscribeToSaveResponse(this.presupuestoService.create(presupuesto));
    }
  }

  private createFromForm(): IPresupuesto {
    return {
      ...new Presupuesto(),
      id: this.editForm.get(['id']).value,
      descripcionDescuento: this.editForm.get(['descripcionDescuento']).value,
      descuento: this.editForm.get(['descuento']).value,
      fechaCreacion: this.editForm.get(['fechaCreacion']).value,
      fechaAceptado: this.editForm.get(['fechaAceptado']).value,
      fechaEntregado: this.editForm.get(['fechaEntregado']).value,
      importeTotal: this.editForm.get(['importeTotal']).value,
      observaciones: this.editForm.get(['observaciones']).value,
      soldadura: this.editForm.get(['soldadura']).value,
      modelo: this.editForm.get(['modelo']).value,
      cliente: this.editForm.get(['cliente']).value,
      estadoPresupuesto: this.editForm.get(['estadoPresupuesto']).value,
      documentType: this.editForm.get(['documentType']).value,
      sucursal: this.editForm.get(['sucursal']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPresupuesto>>) {
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

  trackClienteById(index: number, item: ICliente) {
    return item.id;
  }

  trackEstadoPresupuestoById(index: number, item: IEstadoPresupuesto) {
    return item.id;
  }

  trackDocumentationTypeById(index: number, item: IDocumentationType) {
    return item.id;
  }

  trackSucursalById(index: number, item: ISucursal) {
    return item.id;
  }
}

import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMovimiento, Movimiento } from 'app/shared/model/movimiento.model';
import { MovimientoService } from './movimiento.service';
import { IEstadoMovimiento } from 'app/shared/model/estado-movimiento.model';
import { EstadoMovimientoService } from 'app/entities/estado-movimiento/estado-movimiento.service';
import { ITipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { TipoMovimientoService } from 'app/entities/tipo-movimiento/tipo-movimiento.service';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado/empleado.service';
import { ICaja } from 'app/shared/model/caja.model';
import { CajaService } from 'app/entities/caja/caja.service';
import { ISubCategoria } from 'app/shared/model/sub-categoria.model';
import { SubCategoriaService } from 'app/entities/sub-categoria/sub-categoria.service';
import { IMedioDePago } from 'app/shared/model/medio-de-pago.model';
import { MedioDePagoService } from 'app/entities/medio-de-pago/medio-de-pago.service';

@Component({
  selector: 'jhi-movimiento-update',
  templateUrl: './movimiento-update.component.html'
})
export class MovimientoUpdateComponent implements OnInit {
  isSaving: boolean;

  estadomovimientos: IEstadoMovimiento[];

  tipomovimientos: ITipoMovimiento[];

  empleados: IEmpleado[];

  cajas: ICaja[];

  subcategorias: ISubCategoria[];

  mediodepagos: IMedioDePago[];
  fechaDp: any;

  editForm = this.fb.group({
    id: [],
    fecha: [null, [Validators.required]],
    importe: [null, [Validators.required, Validators.min(0)]],
    descuento: [],
    observaciones: [],
    estado: [null, Validators.required],
    tipoMovimiento: [null, Validators.required],
    empleado: [null, Validators.required],
    caja: [],
    subCategoria: [],
    medioDePago: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected movimientoService: MovimientoService,
    protected estadoMovimientoService: EstadoMovimientoService,
    protected tipoMovimientoService: TipoMovimientoService,
    protected empleadoService: EmpleadoService,
    protected cajaService: CajaService,
    protected subCategoriaService: SubCategoriaService,
    protected medioDePagoService: MedioDePagoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ movimiento }) => {
      this.updateForm(movimiento);
    });
    this.estadoMovimientoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEstadoMovimiento[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEstadoMovimiento[]>) => response.body)
      )
      .subscribe((res: IEstadoMovimiento[]) => (this.estadomovimientos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoMovimientoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoMovimiento[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoMovimiento[]>) => response.body)
      )
      .subscribe((res: ITipoMovimiento[]) => (this.tipomovimientos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.empleadoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmpleado[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmpleado[]>) => response.body)
      )
      .subscribe((res: IEmpleado[]) => (this.empleados = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.cajaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICaja[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICaja[]>) => response.body)
      )
      .subscribe((res: ICaja[]) => (this.cajas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.subCategoriaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISubCategoria[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISubCategoria[]>) => response.body)
      )
      .subscribe((res: ISubCategoria[]) => (this.subcategorias = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.medioDePagoService
      .query({ filter: 'movimiento-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IMedioDePago[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMedioDePago[]>) => response.body)
      )
      .subscribe(
        (res: IMedioDePago[]) => {
          if (!this.editForm.get('medioDePago').value || !this.editForm.get('medioDePago').value.id) {
            this.mediodepagos = res;
          } else {
            this.medioDePagoService
              .find(this.editForm.get('medioDePago').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IMedioDePago>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IMedioDePago>) => subResponse.body)
              )
              .subscribe(
                (subRes: IMedioDePago) => (this.mediodepagos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(movimiento: IMovimiento) {
    this.editForm.patchValue({
      id: movimiento.id,
      fecha: movimiento.fecha,
      importe: movimiento.importe,
      descuento: movimiento.descuento,
      observaciones: movimiento.observaciones,
      estado: movimiento.estado,
      tipoMovimiento: movimiento.tipoMovimiento,
      empleado: movimiento.empleado,
      caja: movimiento.caja,
      subCategoria: movimiento.subCategoria,
      medioDePago: movimiento.medioDePago
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const movimiento = this.createFromForm();
    if (movimiento.id !== undefined) {
      this.subscribeToSaveResponse(this.movimientoService.update(movimiento));
    } else {
      this.subscribeToSaveResponse(this.movimientoService.create(movimiento));
    }
  }

  private createFromForm(): IMovimiento {
    return {
      ...new Movimiento(),
      id: this.editForm.get(['id']).value,
      fecha: this.editForm.get(['fecha']).value,
      importe: this.editForm.get(['importe']).value,
      descuento: this.editForm.get(['descuento']).value,
      observaciones: this.editForm.get(['observaciones']).value,
      estado: this.editForm.get(['estado']).value,
      tipoMovimiento: this.editForm.get(['tipoMovimiento']).value,
      empleado: this.editForm.get(['empleado']).value,
      caja: this.editForm.get(['caja']).value,
      subCategoria: this.editForm.get(['subCategoria']).value,
      medioDePago: this.editForm.get(['medioDePago']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovimiento>>) {
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

  trackEstadoMovimientoById(index: number, item: IEstadoMovimiento) {
    return item.id;
  }

  trackTipoMovimientoById(index: number, item: ITipoMovimiento) {
    return item.id;
  }

  trackEmpleadoById(index: number, item: IEmpleado) {
    return item.id;
  }

  trackCajaById(index: number, item: ICaja) {
    return item.id;
  }

  trackSubCategoriaById(index: number, item: ISubCategoria) {
    return item.id;
  }

  trackMedioDePagoById(index: number, item: IMedioDePago) {
    return item.id;
  }
}

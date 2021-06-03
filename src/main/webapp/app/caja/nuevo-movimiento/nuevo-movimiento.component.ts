import { NuevoMovimientoArticuloComponent } from './nuevo-movimiento-articulo/nuevo-movimiento-articulo.component';
import { NuevoMovimientoDetalleComponent } from './nuevo-movimiento-detalle/nuevo-movimiento-detalle.component';
import { NuevoMovimientoCabeceraComponent } from './nuevo-movimiento-cabecera/nuevo-movimiento-cabecera.component';
import { NuevoMovimientoMedioDePagoComponent } from './nuevo-movimiento-medio-de-pago/nuevo-movimiento-medio-de-pago.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Movimiento } from 'app/shared/model/movimiento.model';
import { CajaModuleServiceService } from 'app/caja/caja-module-service.service';
import { Observable, Subscription } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { Router } from '@angular/router';
import { DtoEmpleado } from 'app/dto/dto-empleado/dto-empleado.component';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-nuevo-movimiento',
  templateUrl: './nuevo-movimiento.component.html',
  styles: []
})
export class NuevoMovimientoComponent implements OnInit {
  eventSubscriber: Subscription;
  fecha: Date;
  empleado: DtoEmpleado;
  movimiento: Movimiento = new Movimiento();

  @ViewChild('cabecera', { static: false })
  cabeceraComponent: NuevoMovimientoCabeceraComponent;
  @ViewChild('detalle', { static: false })
  detalleComponent: NuevoMovimientoDetalleComponent;
  @ViewChild('medioDePago', { static: false })
  medioDePagoComponent: NuevoMovimientoMedioDePagoComponent;
  @ViewChild('articulo', { static: false })
  movimientoArticuloComponent: NuevoMovimientoArticuloComponent;

  isSaving = false;

  constructor(
    private jhiAlertService: JhiAlertService,
    private cajaService: CajaModuleServiceService,
    private router: Router,
    private userService: UserService
  ) {
    this.fecha = new Date();
  }

  ngOnInit() {
    this.userService.getCurrentEmpleado().subscribe((empleado: DtoEmpleado) => (this.empleado = empleado), this.onError);
  }

  async guardarMovimiento() {
    await this.preGuardarMovimiento();
    this.save();
  }

  async preGuardarMovimiento() {
    this.medioDePagoComponent.defineMetodoPago();
    await this.cabeceraComponent.preGuardar();
    this.movimiento.importe = this.cabeceraComponent.importe;
    this.movimiento.tipoMovimiento = this.cabeceraComponent.tipoMovimiento;
    this.movimiento.subCategoria = this.cabeceraComponent.concepto;
    this.movimiento.medioDePago = this.medioDePagoComponent.medioDePago;
  }

  save() {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.cajaService.saveMovimiento(this.movimiento));
  }

  async subscribeToSaveResponse(result: Observable<Movimiento>) {
    try {
      this.movimiento = await result.toPromise();
      await this.onSaveMovimientoSuccess(this.movimiento);
    } catch (error) {
      this.onSaveError(error);
    }
  }

  async onSaveMovimientoSuccess(movimiento: Movimiento) {
    try {
      this.detalleComponent.movimientoPresupuesto.movimiento = movimiento;
      this.movimientoArticuloComponent.movimiento = movimiento;
      await this.detalleComponent.saveDetalle();
      await this.movimientoArticuloComponent.saveMovimientoArticulo();
      this.onSaveFinalSuccess();
    } catch (error) {
      this.onSaveError(error.message);
    }
  }

  private onSaveFinalSuccess() {
    this.isSaving = false;
    this.jhiAlertService.success('Se ha creado el movimiento número: ' + this.movimiento.id, { toast: true }, '.right');
    this.router.navigate(['/cajas']);
  }

  private onSaveError(error) {
    this.isSaving = false;
    this.onError(error);
  }

  private onError(error: any) {
    this.jhiAlertService.error(error.message, null, null);
  }
}

import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { DtoCajaDiaComponent, DtoMovimientoCabecera } from 'app/dto/dto-caja-dia/dto-caja-dia.component';
import { CajaModuleServiceService } from 'app/caja/caja-module-service.service';
import { Subscription } from '../../../../../node_modules/rxjs';
import { JhiEventManager, JhiAlertService } from '../../../../../node_modules/ng-jhipster';
import { ISucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from 'app/entities/sucursal';
import { UserService } from 'app/core/user/user.service';
import { DtoEmpleado } from 'app/dto/dto-empleado/dto-empleado.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-caja',
  templateUrl: './caja.component.html',
  styles: []
})
export class CajaComponent implements OnInit {
  @ViewChild('toastr', { static: false })
  toastrContainer: ViewContainerRef;
  eventSubscriber: Subscription;
  empleado: DtoEmpleado;

  page = 1;
  pageSize = 25;

  cajaDia: DtoCajaDiaComponent;
  totalMovimientos: DtoMovimientoCabecera[] = [];
  movimientos: DtoMovimientoCabecera[] = [];
  sucursal: ISucursal;
  sucursales: ISucursal[] = [];

  constructor(
    private cajaService: CajaModuleServiceService,
    private eventManager: JhiEventManager,
    private sucursalService: SucursalService,
    private userService: UserService,
    private jhiAlertService: JhiAlertService
  ) {}

  ngOnInit() {
    this.eventSubscriber = this.eventManager.subscribe('movimientosDiaModificacion', response => this._buscarMovimientosDelDia());
    this._buscarMovimientosDelDia();
  }

  async _buscarMovimientosDelDia() {
    const currrentEmployeeRespo = await this.userService.getCurrentEmpleado().toPromise();
    this.empleado = currrentEmployeeRespo;
    this.cajaService.getMovimientosDia(this.empleado.sucursalId).subscribe((cajaDia: DtoCajaDiaComponent) => {
      const movimientos = cajaDia.movimientos;
      cajaDia.movimientos = movimientos.sort(this._sortMovimientos);
      this.cajaDia = cajaDia;
      this.movimientos = cajaDia.movimientos;
      this.totalMovimientos = cajaDia.movimientos;
    });
    this.buscarMovimientosRequest(this.empleado.sucursalId);
    this.sucursalService.query().subscribe((response: HttpResponse<ISucursal[]>) => {
      this.sucursales = response.body;
      this.sucursal = response.body.find(sucursal => sucursal.id === this.empleado.sucursalId);
    });
  }

  buscarMovimientosRequest(sucursalId) {
    this.cajaService.getMovimientosDia(sucursalId).subscribe((cajaDia: DtoCajaDiaComponent) => {
      const movimientos = cajaDia.movimientos;
      cajaDia.movimientos = movimientos.sort(this._sortMovimientos);
      this.cajaDia = cajaDia;
      this.movimientos = cajaDia.movimientos;
      this.totalMovimientos = cajaDia.movimientos;
    });
  }

  filtrarPorSucursal() {
    this.buscarMovimientosRequest(this.sucursal.id);
  }

  _sortMovimientos(a: DtoMovimientoCabecera, b: DtoMovimientoCabecera) {
    if (a.movimientoId > b.movimientoId) {
      return -1;
    }
    if (a.movimientoId < b.movimientoId) {
      return 1;
    }
    return 0;
  }

  search(text: string) {
    const movimientos = this.totalMovimientos.filter(movimiento => {
      const term = text.toLowerCase();
      return movimiento.descripcion.toLowerCase().includes(term) || movimiento.categoria.toLowerCase().includes(term);
    });
    this.movimientos = movimientos.sort(this._sortMovimientos);
  }
}

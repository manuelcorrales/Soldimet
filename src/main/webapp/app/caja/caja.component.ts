import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { DtoMovimientoCabecera, DtoCaja } from 'app/dto/dto-caja-dia/dto-caja-dia.component';
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

  totalDia: Number = 0;
  caja: DtoCaja;
  totalMovimientos: DtoMovimientoCabecera[] = [];
  movimientos: DtoMovimientoCabecera[] = [];
  sucursal: ISucursal;
  sucursales: ISucursal[] = [];
  mes = 0;
  anio = 0;
  meses = [
    ['Enero', 1],
    ['Febrero', 2],
    ['Marzo', 3],
    ['Abril', 4],
    ['Mayo', 5],
    ['Junio', 6],
    ['julio', 7],
    ['Agosto', 8],
    ['Septiembre', 9],
    ['Octubre', 10],
    ['Noviembre', 11],
    ['Diciembre', 11]
  ];
  filtrado = false;

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
    this.buscarMovimientosRequest(this.empleado.sucursalId);
    this.sucursalService.query().subscribe((response: HttpResponse<ISucursal[]>) => {
      this.sucursales = response.body;
      this.sucursal = response.body.find(sucursal => sucursal.id === this.empleado.sucursalId);
    });
  }

  buscarMovimientosRequest(sucursalId) {
    this.cajaService.getMovimientosDia(sucursalId, this.mes, this.anio).subscribe((resCaja: DtoCaja) => {
      this._cleanCaja();
      this.caja = resCaja;
      if (resCaja.cajas) {
        resCaja.cajas.forEach(caja => caja.movimientos.forEach(mov => (mov.fecha = caja.fechaCaja)));
        resCaja.cajas.forEach(caja => this.movimientos.push(...caja.movimientos));
        this.caja = resCaja;
        this.movimientos = this.movimientos.sort(this._sortMovimientos);
        this.totalMovimientos = this.movimientos;
        this.totalDia = this.caja.cajas[0] ? this.caja.cajas[0].totalCaja : 0;
      }
    });
  }

  filtrarPorSucursal() {
    this.filtrado = true;
    this.buscarMovimientosRequest(this.sucursal.id);
  }

  limpiarFiltros() {
    this.filtrado = false;
    this.sucursal = this.sucursales.find(sucursal => sucursal.id === this.empleado.sucursalId);
    this.mes = 0;
    this.anio = 0;
    this.buscarMovimientosRequest(this.empleado.sucursalId);
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

  _cleanCaja() {
    this.totalMovimientos = [];
    this.movimientos = [];
    this.caja = null;
    this.totalDia = 0;
  }
}

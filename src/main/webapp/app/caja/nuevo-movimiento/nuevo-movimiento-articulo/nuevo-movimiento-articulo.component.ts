import { CajaModuleServiceService } from 'app/caja/caja-module-service.service';
import { JhiAlertService } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IMedidaArticulo } from 'app/shared/model/medida-articulo.model';
import { MedidaArticulo } from 'app/shared/model/medida-articulo.model';
import { MedidaArticuloService } from 'app/entities/medida-articulo/medida-articulo.service';
import { Movimiento } from 'app/shared/model/movimiento.model';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { CostoRepuestoProveedor } from 'app/shared/model/costo-repuesto-proveedor.model';
import { debounceTime, distinctUntilChanged, switchMap, filter, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RepuestosService } from 'app/repuestos/repuestos-services';
import { MovimientoArticulo } from 'app/shared/model/movimiento-articulo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-nuevo-movimiento-articulo',
  templateUrl: './nuevo-movimiento-articulo.component.html',
  styleUrls: ['./nuevo-movimiento-articulo.component.scss']
})
export class NuevoMovimientoArticuloComponent implements OnInit {
  searching = false;
  searchFailed = false;
  focusRepuestoProveedor$ = new Subject<string>();
  clickRepuestoProveedor$ = new Subject<string>();

  medidas: MedidaArticulo[];

  movimientosArticulo: MovimientoArticulo[] = [];
  movimiento: Movimiento;

  constructor(
    private repuestosService: RepuestosService,
    private cajaService: CajaModuleServiceService,
    private medidaService: MedidaArticuloService,
    private alertService: JhiAlertService
  ) {}

  ngOnInit() {
    this.medidaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMedidaArticulo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMedidaArticulo[]>) => response.body)
      )
      .subscribe((res: IMedidaArticulo[]) => (this.medidas = res), (res: HttpErrorResponse) => this.alertService.error(res.message));
  }

  searchRepuestoProveedor = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.searchRepuestoProveedorByFilter(term))
    );

  async searchRepuestoProveedorByFilter(search = ''): Promise<CostoRepuestoProveedor[]> {
    this.searching = true;
    this.searchFailed = false;
    const page = await this.repuestosService.findRepuestoProveedorByFilter(search, 0, 20).toPromise();
    this.searching = false;
    this.searchFailed = false;
    return page.content;
  }

  formatterRepuestoProveedor = (result: CostoRepuestoProveedor) => {
    if ((result as { value }).value === '') {
      return '';
    }
    const motor = result.aplicacion.motor.marcaMotor;
    const aplicacion = result.aplicacion.nombreAplicacion;
    const cilindrada = result.cilindrada.cantidadDeCilindros;
    const tipoRepuesto = result.tipoRepuesto.nombreTipoRepuesto;
    const marca = result.articulo.marca.nombreMarca;
    const codigoProveedor = result.articulo.codigoArticuloProveedor;
    return `${motor.toUpperCase()}(${cilindrada} Cil) ${aplicacion}(${tipoRepuesto} ${marca} ${codigoProveedor})`;
  };

  seleccionarArticulo(event: NgbTypeaheadSelectItemEvent) {
    const costoRepuestoProveedor: CostoRepuestoProveedor = event.item;
    const movimientoArticulo = new MovimientoArticulo();
    movimientoArticulo.articulo = costoRepuestoProveedor.articulo;
    this.movimientosArticulo.push(movimientoArticulo);
  }

  eliminarArticulo(movimientoArticulo: MovimientoArticulo) {
    this.movimientosArticulo.splice(this.movimientosArticulo.indexOf(movimientoArticulo), 1);
  }

  async saveMovimientoArticulo() {
    this.movimientosArticulo.forEach((movimientoArticulo: MovimientoArticulo) => {
      movimientoArticulo.movimiento = this.movimiento;
    });
    if (this.movimientosArticulo.length > 0) {
      this.movimientosArticulo = await this.cajaService
        .guardarMovimientoArticulos(this.movimiento.id, this.movimientosArticulo)
        .toPromise();
    }
  }
}

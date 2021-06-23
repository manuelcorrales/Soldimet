import { Page } from 'app/dto/page/page';
import { MovimientoArticulo } from 'app/shared/model/movimiento-articulo.model';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';
import { DtoMovimientoCabecera, DtoCajaDia } from 'app/dto/dto-caja-dia/dto-caja-dia.component';
import { Observable } from 'rxjs';
import { Movimiento } from 'app/shared/model/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class CajaModuleServiceService {
  private resourceUrlCaja = SERVER_API_URL + 'api/caja';
  private urlMovimientos = '/movimientos';
  private urlCajaDia = '/cajaDia';
  private urlSaveMovimiento = '/nuevo_movimiento';
  private urlSaveMovimientosArticulos = '/nuevos_movimientos_articulos';
  private urlBorrarMovimiento = '/borrar_movimiento';

  constructor(private http: HttpClient) {}

  findByFilteredPage(
    filter: string,
    sucursalId: number,
    fechaDesde: string,
    fechaHasta: string,
    page = 0,
    size = 15
  ): Observable<Page<DtoMovimientoCabecera>> {
    let url = `${this.resourceUrlCaja}${this.urlMovimientos}/?page=${page}&size=${size}&sucursal=${sucursalId}`;

    if (filter != null) {
      url += `&filtro=${filter}`;
    }
    if (fechaDesde != null && fechaHasta != null) {
      url += `&fecha_inicio=${fechaDesde}&fecha_fin=${fechaHasta}`;
    }
    return this.http.get<Page<DtoMovimientoCabecera>>(url);
  }

  getCajaDia(sucursalId: number): Observable<DtoCajaDia> {
    const url = `${this.resourceUrlCaja}${this.urlCajaDia}/?sucursalId=${sucursalId}`;
    return this.http.get<DtoCajaDia>(url);
  }

  saveMovimiento(movimiento: Movimiento): Observable<Movimiento> {
    const urlLlamada = `${this.resourceUrlCaja}${this.urlSaveMovimiento}`;
    return this.http.post<Movimiento>(urlLlamada, movimiento);
  }

  delete(id: number): Observable<Movimiento> {
    const urlLlamada = `${this.resourceUrlCaja}${this.urlBorrarMovimiento}/${id}`;
    return this.http.post<Movimiento>(urlLlamada, {});
  }
  guardarMovimientoArticulos(movimientoId: number, movimientos: MovimientoArticulo[]): Observable<MovimientoArticulo[]> {
    const urlLlamada = `${this.resourceUrlCaja}${this.urlSaveMovimientosArticulos}/?movimientoId=${movimientoId}`;
    return this.http.post<MovimientoArticulo[]>(urlLlamada, movimientos);
  }
}

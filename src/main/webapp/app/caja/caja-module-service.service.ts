import { MovimientoArticulo } from 'app/shared/model/movimiento-articulo.model';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';
import { DtoCaja } from 'app/dto/dto-caja-dia/dto-caja-dia.component';
import { Observable } from 'rxjs';
import { Movimiento } from 'app/shared/model/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class CajaModuleServiceService {
  private resourceUrlCaja = SERVER_API_URL + 'api/caja';
  private urlMovimientosDia = '/movimientos';
  private urlSaveMovimiento = '/nuevo_movimiento';
  private urlSaveMovimientosArticulos = '/nuevos_movimientos_articulos';
  private urlBorrarMovimiento = '/borrar_movimiento';

  constructor(private http: HttpClient) {}

  getMovimientosDia(sucursalId: number, mes: number, anio: number): Observable<DtoCaja> {
    const urlLlamada = `${this.resourceUrlCaja}${this.urlMovimientosDia}/?sucursal=${sucursalId}&mes=${mes}&anio=${anio}`;
    return this.http.get<DtoCaja>(urlLlamada);
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

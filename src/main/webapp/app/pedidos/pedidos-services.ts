import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { DtoPedidoCabecera } from 'app/dto/dto-pedidos/dto-pedido-cabecera';
import { DtoBusquedaProveedor } from 'app/dto/dto-pedidos/dto-proveedor-search';
import { CostoRepuesto } from 'app/shared/model/costo-repuesto.model';

@Injectable()
export class PedidosService {
  private resourceUrlOperaciones = SERVER_API_URL + 'api/pedidos';
  private urlBuscarPedidosPendientes = '/getPedidosPendientes';
  private urlBuscarPedidosRecibidos = '/getPedidosRecibidos';
  private urlBuscarPedidosRealizados = '/getPedidosRealizados';
  private urlUpdatePedido = '/updatePedido';
  private urlProveedoresRepuestos = '/proveedoresRepuestos';
  private urlBuscarPedidoCabecera = '/getPedidosCabecera';
  private urlActualizarDetallePedido = '/updateDetallePedido/';
  private urlRecibirRepuesto = '/recibirRepuesto/';
  private urlGetPedido = '/get/';

  constructor(private http: HttpClient) {}

  getPedidosPendientes(): Observable<PedidoRepuesto[]> {
    const urlLlamada = `${this.resourceUrlOperaciones}${this.urlBuscarPedidosPendientes}`;
    return this.http.get<PedidoRepuesto[]>(urlLlamada);
  }
  getPedido(pedidoId): Observable<PedidoRepuesto> {
    const urlLlamada = `${this.resourceUrlOperaciones}${this.urlGetPedido}${pedidoId}`;
    return this.http.get<PedidoRepuesto>(urlLlamada);
  }
  getPedidosRecibidos(): Observable<PedidoRepuesto[]> {
    const urlLlamada = `${this.resourceUrlOperaciones}${this.urlBuscarPedidosRecibidos}`;
    return this.http.get<PedidoRepuesto[]>(urlLlamada);
  }
  getPedidosRealizados(): Observable<PedidoRepuesto[]> {
    const urlLlamada = `${this.resourceUrlOperaciones}${this.urlBuscarPedidosRealizados}`;
    return this.http.get<PedidoRepuesto[]>(urlLlamada);
  }
  updatePedido(lista: PedidoRepuesto): Observable<HttpResponse<PedidoRepuesto>> {
    const urlLlamada = `${this.resourceUrlOperaciones}${this.urlUpdatePedido}`;
    return this.http.post<HttpResponse<PedidoRepuesto>>(urlLlamada, lista);
  }

  getProveedoresRepuestos(): Observable<DtoBusquedaProveedor[]> {
    const urlLlamada = `${this.resourceUrlOperaciones}${this.urlProveedoresRepuestos}`;
    return this.http.get<DtoBusquedaProveedor[]>(urlLlamada);
  }

  getPedidosCabecera(): Observable<DtoPedidoCabecera[]> {
    const urlLlamada = `${this.resourceUrlOperaciones}${this.urlBuscarPedidoCabecera}`;
    return this.http.get<DtoPedidoCabecera[]>(urlLlamada);
  }

  updatePedidoDetalle(costoRepuesto: CostoRepuesto, detallePedidoId: number): Observable<CostoRepuesto> {
    const urlLlamada = `${this.resourceUrlOperaciones}${this.urlActualizarDetallePedido}${detallePedidoId}`;
    return this.http.post<CostoRepuesto>(urlLlamada, costoRepuesto);
  }

  recibirRepuesto(costoRepuesto: CostoRepuesto, detallePedidoId: number): Observable<CostoRepuesto> {
    const urlLlamada = `${this.resourceUrlOperaciones}${this.urlRecibirRepuesto}${detallePedidoId}`;
    return this.http.post<CostoRepuesto>(urlLlamada, costoRepuesto);
  }
}

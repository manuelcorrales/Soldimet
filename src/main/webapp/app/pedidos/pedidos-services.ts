import { CostoRepuesto } from './../entities/costo-repuesto/costo-repuesto.model';
import { PedidoRepuesto } from './../entities/pedido-repuesto/pedido-repuesto.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { DtoPedidoCabecera } from 'app/dto/dto-pedidos/dto-pedido-cabecera';

@Injectable()
export class PedidosService {
  private resourceUrlPedidos = SERVER_API_URL + 'api/pedidos';
  private urlBuscarPedidosPendientes = '/getPedidosPendientes';
  private urlBuscarPedidosRecibidos = '/getPedidosRecibidos';
  private urlBuscarPedidosRealizados = '/getPedidosRealizados';
  private urlUpdatePedido = '/updatePedido';
  private urlBuscarPedidoCabecera = '/getPedidosCabecera';
  private urlActualizarCostoRepuesto = '/updateCostoRepuesto/';
  private urlRecibirRepuesto = '/recibirRepuesto/';
  private urlGetPedido = '/get/';

  constructor(private http: HttpClient) {}

  getPedidosPendientes(): Observable<PedidoRepuesto[]> {
    const urlLlamada = `${this.resourceUrlPedidos}${this.urlBuscarPedidosPendientes}`;
    return this.http.get<PedidoRepuesto[]>(urlLlamada);
  }

  getPedido(pedidoId: number): Observable<PedidoRepuesto> {
    const urlLlamada = `${this.resourceUrlPedidos}${this.urlGetPedido}${pedidoId}`;
    return this.http.get<PedidoRepuesto>(urlLlamada);
  }

  getPedidosRecibidos(): Observable<PedidoRepuesto[]> {
    const urlLlamada = `${this.resourceUrlPedidos}${this.urlBuscarPedidosRecibidos}`;
    return this.http.get<PedidoRepuesto[]>(urlLlamada);
  }

  getPedidosRealizados(): Observable<PedidoRepuesto[]> {
    const urlLlamada = `${this.resourceUrlPedidos}${this.urlBuscarPedidosRealizados}`;
    return this.http.get<PedidoRepuesto[]>(urlLlamada);
  }

  updatePedido(lista: PedidoRepuesto): Observable<HttpResponse<PedidoRepuesto>> {
    const urlLlamada = `${this.resourceUrlPedidos}${this.urlUpdatePedido}`;
    return this.http.post<HttpResponse<PedidoRepuesto>>(urlLlamada, lista);
  }

  getPedidosCabecera(): Observable<DtoPedidoCabecera[]> {
    const urlLlamada = `${this.resourceUrlPedidos}${this.urlBuscarPedidoCabecera}`;
    return this.http.get<DtoPedidoCabecera[]>(urlLlamada);
  }

  updatePedidoDetalle(costoRepuesto: CostoRepuesto): Observable<CostoRepuesto> {
    const urlLlamada = `${this.resourceUrlPedidos}${this.urlActualizarCostoRepuesto}`;
    return this.http.post<CostoRepuesto>(urlLlamada, costoRepuesto);
  }

  recibirRepuesto(costoRepuesto: CostoRepuesto): Observable<CostoRepuesto> {
    const urlLlamada = `${this.resourceUrlPedidos}${this.urlRecibirRepuesto}`;
    return this.http.post<CostoRepuesto>(urlLlamada, costoRepuesto);
  }
}

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { Proveedor } from 'app/shared/model/proveedor.model';
import { DtoPedidoCabecera } from 'app/dto/dto-pedidos/dto-pedido-cabecera';

@Injectable()
export class PedidosService {
    private resourceUrlOperaciones = SERVER_API_URL + 'api/pedidos';
    private urlBuscarPedidosPendientes = '/getPedidosPendientes';
    private urlBuscarPedidosRecibidos = '/getPedidosRecibidos';
    private urlBuscarPedidosRealizados = '/getPedidosRealizados';
    private urlUpdatePedido = '/updatePedido';
    private urlProveedoresRepuestos = '/proveedoresRepuestos';
    private urlBuscarPedidoCabecera = '/getPedidosCabecera';

    constructor(private http: HttpClient) {}

    getPedidosPendientes(): Observable<PedidoRepuesto[]> {
        const urlLlamada = `${this.resourceUrlOperaciones}${this.urlBuscarPedidosPendientes}`;
        return this.http.get<PedidoRepuesto[]>(urlLlamada);
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

    getProveedoresRepuestos(): Observable<Proveedor[]> {
        const urlLlamada = `${this.resourceUrlOperaciones}${this.urlProveedoresRepuestos}`;
        return this.http.get<Proveedor[]>(urlLlamada);
    }

    getPedidosCabecera(): Observable<DtoPedidoCabecera[]> {
        const urlLlamada = `${this.resourceUrlOperaciones}${this.urlBuscarPedidoCabecera}`;
        return this.http.get<DtoPedidoCabecera[]>(urlLlamada);
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { Proveedor } from 'app/shared/model/proveedor.model';

@Injectable()
export class PedidosService {
    private resourceUrlOperaciones = SERVER_API_URL + 'api/pedidos';
    private urlBuscarPedidosPendientes = '/getPedidosPendientes';
    private urlBuscarPedidosRecibidos = '/getPedidosRecibidos';
    private urlBuscarPedidosRealizados = '/getPedidosRealizados';
    private urlUpdatePedido = '/updatePedido';
    private urlProveedoresRepuestos = '/proveedoresRepuestos';

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
    updatePedido(lista: PedidoRepuesto): Observable<PedidoRepuesto> {
        const urlLlamada = `${this.resourceUrlOperaciones}${this.urlUpdatePedido}`;
        return this.http.post<PedidoRepuesto>(urlLlamada, lista);
    }

    getProveedoresRepuestos(): Observable<Proveedor[]> {
        const urlLlamada = `${this.resourceUrlOperaciones}${this.urlProveedoresRepuestos}`;
        return this.http.get<Proveedor[]>(urlLlamada);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEstadoDetallePedido } from 'app/shared/model/estado-detalle-pedido.model';

type EntityResponseType = HttpResponse<IEstadoDetallePedido>;
type EntityArrayResponseType = HttpResponse<IEstadoDetallePedido[]>;

@Injectable({ providedIn: 'root' })
export class EstadoDetallePedidoService {
    private resourceUrl = SERVER_API_URL + 'api/estado-detalle-pedidos';

    constructor(private http: HttpClient) {}

    create(estadoDetallePedido: IEstadoDetallePedido): Observable<EntityResponseType> {
        return this.http.post<IEstadoDetallePedido>(this.resourceUrl, estadoDetallePedido, { observe: 'response' });
    }

    update(estadoDetallePedido: IEstadoDetallePedido): Observable<EntityResponseType> {
        return this.http.put<IEstadoDetallePedido>(this.resourceUrl, estadoDetallePedido, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEstadoDetallePedido>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEstadoDetallePedido[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

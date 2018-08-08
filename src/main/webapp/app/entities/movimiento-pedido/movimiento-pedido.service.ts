import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMovimientoPedido } from 'app/shared/model/movimiento-pedido.model';

type EntityResponseType = HttpResponse<IMovimientoPedido>;
type EntityArrayResponseType = HttpResponse<IMovimientoPedido[]>;

@Injectable({ providedIn: 'root' })
export class MovimientoPedidoService {
    private resourceUrl = SERVER_API_URL + 'api/movimiento-pedidos';

    constructor(private http: HttpClient) {}

    create(movimientoPedido: IMovimientoPedido): Observable<EntityResponseType> {
        return this.http.post<IMovimientoPedido>(this.resourceUrl, movimientoPedido, { observe: 'response' });
    }

    update(movimientoPedido: IMovimientoPedido): Observable<EntityResponseType> {
        return this.http.put<IMovimientoPedido>(this.resourceUrl, movimientoPedido, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMovimientoPedido>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMovimientoPedido[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

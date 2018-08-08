import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';

type EntityResponseType = HttpResponse<IEstadoPedidoRepuesto>;
type EntityArrayResponseType = HttpResponse<IEstadoPedidoRepuesto[]>;

@Injectable({ providedIn: 'root' })
export class EstadoPedidoRepuestoService {
    private resourceUrl = SERVER_API_URL + 'api/estado-pedido-repuestos';

    constructor(private http: HttpClient) {}

    create(estadoPedidoRepuesto: IEstadoPedidoRepuesto): Observable<EntityResponseType> {
        return this.http.post<IEstadoPedidoRepuesto>(this.resourceUrl, estadoPedidoRepuesto, { observe: 'response' });
    }

    update(estadoPedidoRepuesto: IEstadoPedidoRepuesto): Observable<EntityResponseType> {
        return this.http.put<IEstadoPedidoRepuesto>(this.resourceUrl, estadoPedidoRepuesto, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEstadoPedidoRepuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEstadoPedidoRepuesto[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDetallePedido } from 'app/shared/model/detalle-pedido.model';

type EntityResponseType = HttpResponse<IDetallePedido>;
type EntityArrayResponseType = HttpResponse<IDetallePedido[]>;

@Injectable({ providedIn: 'root' })
export class DetallePedidoService {
    private resourceUrl = SERVER_API_URL + 'api/detalle-pedidos';

    constructor(private http: HttpClient) {}

    create(detallePedido: IDetallePedido): Observable<EntityResponseType> {
        return this.http.post<IDetallePedido>(this.resourceUrl, detallePedido, { observe: 'response' });
    }

    update(detallePedido: IDetallePedido): Observable<EntityResponseType> {
        return this.http.put<IDetallePedido>(this.resourceUrl, detallePedido, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDetallePedido>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDetallePedido[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

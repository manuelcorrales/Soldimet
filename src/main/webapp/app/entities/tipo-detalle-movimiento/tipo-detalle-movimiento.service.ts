import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';

type EntityResponseType = HttpResponse<ITipoDetalleMovimiento>;
type EntityArrayResponseType = HttpResponse<ITipoDetalleMovimiento[]>;

@Injectable({ providedIn: 'root' })
export class TipoDetalleMovimientoService {
    private resourceUrl = SERVER_API_URL + 'api/tipo-detalle-movimientos';

    constructor(private http: HttpClient) {}

    create(tipoDetalleMovimiento: ITipoDetalleMovimiento): Observable<EntityResponseType> {
        return this.http.post<ITipoDetalleMovimiento>(this.resourceUrl, tipoDetalleMovimiento, { observe: 'response' });
    }

    update(tipoDetalleMovimiento: ITipoDetalleMovimiento): Observable<EntityResponseType> {
        return this.http.put<ITipoDetalleMovimiento>(this.resourceUrl, tipoDetalleMovimiento, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITipoDetalleMovimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITipoDetalleMovimiento[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

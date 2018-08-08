import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoMovimiento } from 'app/shared/model/tipo-movimiento.model';

type EntityResponseType = HttpResponse<ITipoMovimiento>;
type EntityArrayResponseType = HttpResponse<ITipoMovimiento[]>;

@Injectable({ providedIn: 'root' })
export class TipoMovimientoService {
    private resourceUrl = SERVER_API_URL + 'api/tipo-movimientos';

    constructor(private http: HttpClient) {}

    create(tipoMovimiento: ITipoMovimiento): Observable<EntityResponseType> {
        return this.http.post<ITipoMovimiento>(this.resourceUrl, tipoMovimiento, { observe: 'response' });
    }

    update(tipoMovimiento: ITipoMovimiento): Observable<EntityResponseType> {
        return this.http.put<ITipoMovimiento>(this.resourceUrl, tipoMovimiento, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITipoMovimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITipoMovimiento[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

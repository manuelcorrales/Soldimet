import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';

type EntityResponseType = HttpResponse<ITipoTarjeta>;
type EntityArrayResponseType = HttpResponse<ITipoTarjeta[]>;

@Injectable({ providedIn: 'root' })
export class TipoTarjetaService {
    private resourceUrl = SERVER_API_URL + 'api/tipo-tarjetas';

    constructor(private http: HttpClient) {}

    create(tipoTarjeta: ITipoTarjeta): Observable<EntityResponseType> {
        return this.http.post<ITipoTarjeta>(this.resourceUrl, tipoTarjeta, { observe: 'response' });
    }

    update(tipoTarjeta: ITipoTarjeta): Observable<EntityResponseType> {
        return this.http.put<ITipoTarjeta>(this.resourceUrl, tipoTarjeta, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITipoTarjeta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITipoTarjeta[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

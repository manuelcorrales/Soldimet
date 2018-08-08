import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPagoTarjeta } from 'app/shared/model/pago-tarjeta.model';

type EntityResponseType = HttpResponse<IPagoTarjeta>;
type EntityArrayResponseType = HttpResponse<IPagoTarjeta[]>;

@Injectable({ providedIn: 'root' })
export class PagoTarjetaService {
    private resourceUrl = SERVER_API_URL + 'api/pago-tarjetas';

    constructor(private http: HttpClient) {}

    create(pagoTarjeta: IPagoTarjeta): Observable<EntityResponseType> {
        return this.http.post<IPagoTarjeta>(this.resourceUrl, pagoTarjeta, { observe: 'response' });
    }

    update(pagoTarjeta: IPagoTarjeta): Observable<EntityResponseType> {
        return this.http.put<IPagoTarjeta>(this.resourceUrl, pagoTarjeta, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPagoTarjeta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPagoTarjeta[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

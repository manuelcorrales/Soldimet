import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';

type EntityResponseType = HttpResponse<IFormaDePago>;
type EntityArrayResponseType = HttpResponse<IFormaDePago[]>;

@Injectable({ providedIn: 'root' })
export class FormaDePagoService {
    private resourceUrl = SERVER_API_URL + 'api/forma-de-pagos';

    constructor(private http: HttpClient) {}

    create(formaDePago: IFormaDePago): Observable<EntityResponseType> {
        return this.http.post<IFormaDePago>(this.resourceUrl, formaDePago, { observe: 'response' });
    }

    update(formaDePago: IFormaDePago): Observable<EntityResponseType> {
        return this.http.put<IFormaDePago>(this.resourceUrl, formaDePago, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFormaDePago>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFormaDePago[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

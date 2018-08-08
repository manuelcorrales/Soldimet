import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICostoOperacion } from 'app/shared/model/costo-operacion.model';

type EntityResponseType = HttpResponse<ICostoOperacion>;
type EntityArrayResponseType = HttpResponse<ICostoOperacion[]>;

@Injectable({ providedIn: 'root' })
export class CostoOperacionService {
    private resourceUrl = SERVER_API_URL + 'api/costo-operacions';

    constructor(private http: HttpClient) {}

    create(costoOperacion: ICostoOperacion): Observable<EntityResponseType> {
        return this.http.post<ICostoOperacion>(this.resourceUrl, costoOperacion, { observe: 'response' });
    }

    update(costoOperacion: ICostoOperacion): Observable<EntityResponseType> {
        return this.http.put<ICostoOperacion>(this.resourceUrl, costoOperacion, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICostoOperacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICostoOperacion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

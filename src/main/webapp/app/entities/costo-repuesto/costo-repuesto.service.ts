import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICostoRepuesto } from 'app/shared/model/costo-repuesto.model';

type EntityResponseType = HttpResponse<ICostoRepuesto>;
type EntityArrayResponseType = HttpResponse<ICostoRepuesto[]>;

@Injectable({ providedIn: 'root' })
export class CostoRepuestoService {
    private resourceUrl = SERVER_API_URL + 'api/costo-repuestos';

    constructor(private http: HttpClient) {}

    create(costoRepuesto: ICostoRepuesto): Observable<EntityResponseType> {
        return this.http.post<ICostoRepuesto>(this.resourceUrl, costoRepuesto, { observe: 'response' });
    }

    update(costoRepuesto: ICostoRepuesto): Observable<EntityResponseType> {
        return this.http.put<ICostoRepuesto>(this.resourceUrl, costoRepuesto, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICostoRepuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICostoRepuesto[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

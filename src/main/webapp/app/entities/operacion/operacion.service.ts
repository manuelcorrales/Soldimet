import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOperacion } from 'app/shared/model/operacion.model';

type EntityResponseType = HttpResponse<IOperacion>;
type EntityArrayResponseType = HttpResponse<IOperacion[]>;

@Injectable({ providedIn: 'root' })
export class OperacionService {
    private resourceUrl = SERVER_API_URL + 'api/operacions';

    constructor(private http: HttpClient) {}

    create(operacion: IOperacion): Observable<EntityResponseType> {
        return this.http.post<IOperacion>(this.resourceUrl, operacion, { observe: 'response' });
    }

    update(operacion: IOperacion): Observable<EntityResponseType> {
        return this.http.put<IOperacion>(this.resourceUrl, operacion, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IOperacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOperacion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

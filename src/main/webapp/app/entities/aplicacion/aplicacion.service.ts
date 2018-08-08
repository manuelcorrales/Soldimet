import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAplicacion } from 'app/shared/model/aplicacion.model';

type EntityResponseType = HttpResponse<IAplicacion>;
type EntityArrayResponseType = HttpResponse<IAplicacion[]>;

@Injectable({ providedIn: 'root' })
export class AplicacionService {
    private resourceUrl = SERVER_API_URL + 'api/aplicacions';

    constructor(private http: HttpClient) {}

    create(aplicacion: IAplicacion): Observable<EntityResponseType> {
        return this.http.post<IAplicacion>(this.resourceUrl, aplicacion, { observe: 'response' });
    }

    update(aplicacion: IAplicacion): Observable<EntityResponseType> {
        return this.http.put<IAplicacion>(this.resourceUrl, aplicacion, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAplicacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAplicacion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEstadoArticulo } from 'app/shared/model/estado-articulo.model';

type EntityResponseType = HttpResponse<IEstadoArticulo>;
type EntityArrayResponseType = HttpResponse<IEstadoArticulo[]>;

@Injectable({ providedIn: 'root' })
export class EstadoArticuloService {
    private resourceUrl = SERVER_API_URL + 'api/estado-articulos';

    constructor(private http: HttpClient) {}

    create(estadoArticulo: IEstadoArticulo): Observable<EntityResponseType> {
        return this.http.post<IEstadoArticulo>(this.resourceUrl, estadoArticulo, { observe: 'response' });
    }

    update(estadoArticulo: IEstadoArticulo): Observable<EntityResponseType> {
        return this.http.put<IEstadoArticulo>(this.resourceUrl, estadoArticulo, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEstadoArticulo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEstadoArticulo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

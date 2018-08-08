import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';

type EntityResponseType = HttpResponse<IEstadoPresupuesto>;
type EntityArrayResponseType = HttpResponse<IEstadoPresupuesto[]>;

@Injectable({ providedIn: 'root' })
export class EstadoPresupuestoService {
    private resourceUrl = SERVER_API_URL + 'api/estado-presupuestos';

    constructor(private http: HttpClient) {}

    create(estadoPresupuesto: IEstadoPresupuesto): Observable<EntityResponseType> {
        return this.http.post<IEstadoPresupuesto>(this.resourceUrl, estadoPresupuesto, { observe: 'response' });
    }

    update(estadoPresupuesto: IEstadoPresupuesto): Observable<EntityResponseType> {
        return this.http.put<IEstadoPresupuesto>(this.resourceUrl, estadoPresupuesto, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEstadoPresupuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEstadoPresupuesto[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

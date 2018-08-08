import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';

type EntityResponseType = HttpResponse<IDetallePresupuesto>;
type EntityArrayResponseType = HttpResponse<IDetallePresupuesto[]>;

@Injectable({ providedIn: 'root' })
export class DetallePresupuestoService {
    private resourceUrl = SERVER_API_URL + 'api/detalle-presupuestos';

    constructor(private http: HttpClient) {}

    create(detallePresupuesto: IDetallePresupuesto): Observable<EntityResponseType> {
        return this.http.post<IDetallePresupuesto>(this.resourceUrl, detallePresupuesto, { observe: 'response' });
    }

    update(detallePresupuesto: IDetallePresupuesto): Observable<EntityResponseType> {
        return this.http.put<IDetallePresupuesto>(this.resourceUrl, detallePresupuesto, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDetallePresupuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDetallePresupuesto[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

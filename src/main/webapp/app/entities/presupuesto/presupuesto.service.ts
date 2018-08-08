import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';

type EntityResponseType = HttpResponse<IPresupuesto>;
type EntityArrayResponseType = HttpResponse<IPresupuesto[]>;

@Injectable({ providedIn: 'root' })
export class PresupuestoService {
    private resourceUrl = SERVER_API_URL + 'api/presupuestos';

    constructor(private http: HttpClient) {}

    create(presupuesto: IPresupuesto): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(presupuesto);
        return this.http
            .post<IPresupuesto>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(presupuesto: IPresupuesto): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(presupuesto);
        return this.http
            .put<IPresupuesto>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPresupuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPresupuesto[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(presupuesto: IPresupuesto): IPresupuesto {
        const copy: IPresupuesto = Object.assign({}, presupuesto, {
            fechaCreacion:
                presupuesto.fechaCreacion != null && presupuesto.fechaCreacion.isValid()
                    ? presupuesto.fechaCreacion.format(DATE_FORMAT)
                    : null,
            fechaAceptado:
                presupuesto.fechaAceptado != null && presupuesto.fechaAceptado.isValid()
                    ? presupuesto.fechaAceptado.format(DATE_FORMAT)
                    : null,
            fechaEntregado:
                presupuesto.fechaEntregado != null && presupuesto.fechaEntregado.isValid()
                    ? presupuesto.fechaEntregado.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.fechaCreacion = res.body.fechaCreacion != null ? moment(res.body.fechaCreacion) : null;
        res.body.fechaAceptado = res.body.fechaAceptado != null ? moment(res.body.fechaAceptado) : null;
        res.body.fechaEntregado = res.body.fechaEntregado != null ? moment(res.body.fechaEntregado) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((presupuesto: IPresupuesto) => {
            presupuesto.fechaCreacion = presupuesto.fechaCreacion != null ? moment(presupuesto.fechaCreacion) : null;
            presupuesto.fechaAceptado = presupuesto.fechaAceptado != null ? moment(presupuesto.fechaAceptado) : null;
            presupuesto.fechaEntregado = presupuesto.fechaEntregado != null ? moment(presupuesto.fechaEntregado) : null;
        });
        return res;
    }
}

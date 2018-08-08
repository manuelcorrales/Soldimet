import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHistorialPrecio } from 'app/shared/model/historial-precio.model';

type EntityResponseType = HttpResponse<IHistorialPrecio>;
type EntityArrayResponseType = HttpResponse<IHistorialPrecio[]>;

@Injectable({ providedIn: 'root' })
export class HistorialPrecioService {
    private resourceUrl = SERVER_API_URL + 'api/historial-precios';

    constructor(private http: HttpClient) {}

    create(historialPrecio: IHistorialPrecio): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(historialPrecio);
        return this.http
            .post<IHistorialPrecio>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(historialPrecio: IHistorialPrecio): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(historialPrecio);
        return this.http
            .put<IHistorialPrecio>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IHistorialPrecio>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHistorialPrecio[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(historialPrecio: IHistorialPrecio): IHistorialPrecio {
        const copy: IHistorialPrecio = Object.assign({}, historialPrecio, {
            fechaHistorial:
                historialPrecio.fechaHistorial != null && historialPrecio.fechaHistorial.isValid()
                    ? historialPrecio.fechaHistorial.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.fechaHistorial = res.body.fechaHistorial != null ? moment(res.body.fechaHistorial) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((historialPrecio: IHistorialPrecio) => {
            historialPrecio.fechaHistorial = historialPrecio.fechaHistorial != null ? moment(historialPrecio.fechaHistorial) : null;
        });
        return res;
    }
}

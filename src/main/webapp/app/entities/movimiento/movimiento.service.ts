import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMovimiento } from 'app/shared/model/movimiento.model';

type EntityResponseType = HttpResponse<IMovimiento>;
type EntityArrayResponseType = HttpResponse<IMovimiento[]>;

@Injectable({ providedIn: 'root' })
export class MovimientoService {
    private resourceUrl = SERVER_API_URL + 'api/movimientos';

    constructor(private http: HttpClient) {}

    create(movimiento: IMovimiento): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(movimiento);
        return this.http
            .post<IMovimiento>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(movimiento: IMovimiento): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(movimiento);
        return this.http
            .put<IMovimiento>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMovimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMovimiento[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(movimiento: IMovimiento): IMovimiento {
        const copy: IMovimiento = Object.assign({}, movimiento, {
            fecha: movimiento.fecha != null && movimiento.fecha.isValid() ? movimiento.fecha.format(DATE_FORMAT) : null,
            hora: movimiento.hora != null && movimiento.hora.isValid() ? movimiento.hora.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
        res.body.hora = res.body.hora != null ? moment(res.body.hora) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((movimiento: IMovimiento) => {
            movimiento.fecha = movimiento.fecha != null ? moment(movimiento.fecha) : null;
            movimiento.hora = movimiento.hora != null ? moment(movimiento.hora) : null;
        });
        return res;
    }
}

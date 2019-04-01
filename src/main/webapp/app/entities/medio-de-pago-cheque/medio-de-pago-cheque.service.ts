import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';

type EntityResponseType = HttpResponse<IMedioDePagoCheque>;
type EntityArrayResponseType = HttpResponse<IMedioDePagoCheque[]>;

@Injectable({ providedIn: 'root' })
export class MedioDePagoChequeService {
    private resourceUrl = SERVER_API_URL + 'api/medio-de-pago-cheques';

    constructor(private http: HttpClient) {}

    create(medioDePagoCheque: IMedioDePagoCheque): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(medioDePagoCheque);
        return this.http
            .post<IMedioDePagoCheque>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(medioDePagoCheque: IMedioDePagoCheque): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(medioDePagoCheque);
        return this.http
            .put<IMedioDePagoCheque>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMedioDePagoCheque>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMedioDePagoCheque[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(medioDePagoCheque: IMedioDePagoCheque): IMedioDePagoCheque {
        const copy: IMedioDePagoCheque = Object.assign({}, medioDePagoCheque, {
            fechaRecibo:
                medioDePagoCheque.fechaRecibo != null && medioDePagoCheque.fechaRecibo.isValid()
                    ? medioDePagoCheque.fechaRecibo.format(DATE_FORMAT)
                    : null,
            fechaCobro:
                medioDePagoCheque.fechaCobro != null && medioDePagoCheque.fechaCobro.isValid()
                    ? medioDePagoCheque.fechaCobro.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.fechaRecibo = res.body.fechaRecibo != null ? moment(res.body.fechaRecibo) : null;
        res.body.fechaCobro = res.body.fechaCobro != null ? moment(res.body.fechaCobro) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((medioDePagoCheque: IMedioDePagoCheque) => {
            medioDePagoCheque.fechaRecibo = medioDePagoCheque.fechaRecibo != null ? moment(medioDePagoCheque.fechaRecibo) : null;
            medioDePagoCheque.fechaCobro = medioDePagoCheque.fechaCobro != null ? moment(medioDePagoCheque.fechaCobro) : null;
        });
        return res;
    }
}

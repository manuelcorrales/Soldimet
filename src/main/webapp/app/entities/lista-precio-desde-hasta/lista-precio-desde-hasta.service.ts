import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IListaPrecioDesdeHasta } from 'app/shared/model/lista-precio-desde-hasta.model';

type EntityResponseType = HttpResponse<IListaPrecioDesdeHasta>;
type EntityArrayResponseType = HttpResponse<IListaPrecioDesdeHasta[]>;

@Injectable({ providedIn: 'root' })
export class ListaPrecioDesdeHastaService {
    private resourceUrl = SERVER_API_URL + 'api/lista-precio-desde-hastas';

    constructor(private http: HttpClient) {}

    create(listaPrecioDesdeHasta: IListaPrecioDesdeHasta): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(listaPrecioDesdeHasta);
        return this.http
            .post<IListaPrecioDesdeHasta>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(listaPrecioDesdeHasta: IListaPrecioDesdeHasta): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(listaPrecioDesdeHasta);
        return this.http
            .put<IListaPrecioDesdeHasta>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IListaPrecioDesdeHasta>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IListaPrecioDesdeHasta[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(listaPrecioDesdeHasta: IListaPrecioDesdeHasta): IListaPrecioDesdeHasta {
        const copy: IListaPrecioDesdeHasta = Object.assign({}, listaPrecioDesdeHasta, {
            fechaDesde:
                listaPrecioDesdeHasta.fechaDesde != null && listaPrecioDesdeHasta.fechaDesde.isValid()
                    ? listaPrecioDesdeHasta.fechaDesde.format(DATE_FORMAT)
                    : null,
            fechaHasta:
                listaPrecioDesdeHasta.fechaHasta != null && listaPrecioDesdeHasta.fechaHasta.isValid()
                    ? listaPrecioDesdeHasta.fechaHasta.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.fechaDesde = res.body.fechaDesde != null ? moment(res.body.fechaDesde) : null;
        res.body.fechaHasta = res.body.fechaHasta != null ? moment(res.body.fechaHasta) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((listaPrecioDesdeHasta: IListaPrecioDesdeHasta) => {
            listaPrecioDesdeHasta.fechaDesde = listaPrecioDesdeHasta.fechaDesde != null ? moment(listaPrecioDesdeHasta.fechaDesde) : null;
            listaPrecioDesdeHasta.fechaHasta = listaPrecioDesdeHasta.fechaHasta != null ? moment(listaPrecioDesdeHasta.fechaHasta) : null;
        });
        return res;
    }
}

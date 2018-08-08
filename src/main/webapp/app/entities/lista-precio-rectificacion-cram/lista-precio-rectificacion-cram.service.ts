import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IListaPrecioRectificacionCRAM } from 'app/shared/model/lista-precio-rectificacion-cram.model';

type EntityResponseType = HttpResponse<IListaPrecioRectificacionCRAM>;
type EntityArrayResponseType = HttpResponse<IListaPrecioRectificacionCRAM[]>;

@Injectable({ providedIn: 'root' })
export class ListaPrecioRectificacionCRAMService {
    private resourceUrl = SERVER_API_URL + 'api/lista-precio-rectificacion-crams';

    constructor(private http: HttpClient) {}

    create(listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(listaPrecioRectificacionCRAM);
        return this.http
            .post<IListaPrecioRectificacionCRAM>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(listaPrecioRectificacionCRAM);
        return this.http
            .put<IListaPrecioRectificacionCRAM>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IListaPrecioRectificacionCRAM>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IListaPrecioRectificacionCRAM[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM): IListaPrecioRectificacionCRAM {
        const copy: IListaPrecioRectificacionCRAM = Object.assign({}, listaPrecioRectificacionCRAM, {
            fechaVigenciaDesde:
                listaPrecioRectificacionCRAM.fechaVigenciaDesde != null && listaPrecioRectificacionCRAM.fechaVigenciaDesde.isValid()
                    ? listaPrecioRectificacionCRAM.fechaVigenciaDesde.format(DATE_FORMAT)
                    : null,
            fechaVigenciaHasta:
                listaPrecioRectificacionCRAM.fechaVigenciaHasta != null && listaPrecioRectificacionCRAM.fechaVigenciaHasta.isValid()
                    ? listaPrecioRectificacionCRAM.fechaVigenciaHasta.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.fechaVigenciaDesde = res.body.fechaVigenciaDesde != null ? moment(res.body.fechaVigenciaDesde) : null;
        res.body.fechaVigenciaHasta = res.body.fechaVigenciaHasta != null ? moment(res.body.fechaVigenciaHasta) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM) => {
            listaPrecioRectificacionCRAM.fechaVigenciaDesde =
                listaPrecioRectificacionCRAM.fechaVigenciaDesde != null ? moment(listaPrecioRectificacionCRAM.fechaVigenciaDesde) : null;
            listaPrecioRectificacionCRAM.fechaVigenciaHasta =
                listaPrecioRectificacionCRAM.fechaVigenciaHasta != null ? moment(listaPrecioRectificacionCRAM.fechaVigenciaHasta) : null;
        });
        return res;
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICaja } from 'app/shared/model/caja.model';

type EntityResponseType = HttpResponse<ICaja>;
type EntityArrayResponseType = HttpResponse<ICaja[]>;

@Injectable({ providedIn: 'root' })
export class CajaService {
  public resourceUrl = SERVER_API_URL + 'api/cajas';

  constructor(protected http: HttpClient) {}

  create(caja: ICaja): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(caja);
    return this.http
      .post<ICaja>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(caja: ICaja): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(caja);
    return this.http
      .put<ICaja>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICaja>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICaja[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(caja: ICaja): ICaja {
    const copy: ICaja = Object.assign({}, caja, {
      fecha: caja.fecha != null && caja.fecha.isValid() ? caja.fecha.format(DATE_FORMAT) : null,
      horaApertura: caja.horaApertura != null && caja.horaApertura.isValid() ? caja.horaApertura.toJSON() : null,
      horaCierre: caja.horaCierre != null && caja.horaCierre.isValid() ? caja.horaCierre.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
      res.body.horaApertura = res.body.horaApertura != null ? moment(res.body.horaApertura) : null;
      res.body.horaCierre = res.body.horaCierre != null ? moment(res.body.horaCierre) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((caja: ICaja) => {
        caja.fecha = caja.fecha != null ? moment(caja.fecha) : null;
        caja.horaApertura = caja.horaApertura != null ? moment(caja.horaApertura) : null;
        caja.horaCierre = caja.horaCierre != null ? moment(caja.horaCierre) : null;
      });
    }
    return res;
  }
}

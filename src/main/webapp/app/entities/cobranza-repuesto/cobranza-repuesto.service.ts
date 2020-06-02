import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';

type EntityResponseType = HttpResponse<ICobranzaRepuesto>;
type EntityArrayResponseType = HttpResponse<ICobranzaRepuesto[]>;

@Injectable({ providedIn: 'root' })
export class CobranzaRepuestoService {
  public resourceUrl = SERVER_API_URL + 'api/cobranza-repuestos';

  constructor(protected http: HttpClient) {}

  create(cobranzaRepuesto: ICobranzaRepuesto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cobranzaRepuesto);
    return this.http
      .post<ICobranzaRepuesto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(cobranzaRepuesto: ICobranzaRepuesto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cobranzaRepuesto);
    return this.http
      .put<ICobranzaRepuesto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICobranzaRepuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICobranzaRepuesto[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(cobranzaRepuesto: ICobranzaRepuesto): ICobranzaRepuesto {
    const copy: ICobranzaRepuesto = Object.assign({}, cobranzaRepuesto, {
      fecha: cobranzaRepuesto.fecha != null && cobranzaRepuesto.fecha.isValid() ? cobranzaRepuesto.fecha.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((cobranzaRepuesto: ICobranzaRepuesto) => {
        cobranzaRepuesto.fecha = cobranzaRepuesto.fecha != null ? moment(cobranzaRepuesto.fecha) : null;
      });
    }
    return res;
  }
}

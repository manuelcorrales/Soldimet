import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';

type EntityResponseType = HttpResponse<IMedioDePagoCheque>;
type EntityArrayResponseType = HttpResponse<IMedioDePagoCheque[]>;

@Injectable({ providedIn: 'root' })
export class MedioDePagoChequeService {
  public resourceUrl = SERVER_API_URL + 'api/medio-de-pago-cheques';

  constructor(protected http: HttpClient) {}

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

  protected convertDateFromClient(medioDePagoCheque: IMedioDePagoCheque): IMedioDePagoCheque {
    const copy: IMedioDePagoCheque = Object.assign({}, medioDePagoCheque, {});
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((medioDePagoCheque: IMedioDePagoCheque) => {});
    }
    return res;
  }
}

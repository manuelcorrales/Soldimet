import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPagoCheque } from 'app/shared/model/pago-cheque.model';

type EntityResponseType = HttpResponse<IPagoCheque>;
type EntityArrayResponseType = HttpResponse<IPagoCheque[]>;

@Injectable({ providedIn: 'root' })
export class PagoChequeService {
  public resourceUrl = SERVER_API_URL + 'api/pago-cheques';

  constructor(protected http: HttpClient) {}

  create(pagoCheque: IPagoCheque): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pagoCheque);
    return this.http
      .post<IPagoCheque>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(pagoCheque: IPagoCheque): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pagoCheque);
    return this.http
      .put<IPagoCheque>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPagoCheque>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPagoCheque[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(pagoCheque: IPagoCheque): IPagoCheque {
    const copy: IPagoCheque = Object.assign({}, pagoCheque, {});
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((pagoCheque: IPagoCheque) => {});
    }
    return res;
  }
}

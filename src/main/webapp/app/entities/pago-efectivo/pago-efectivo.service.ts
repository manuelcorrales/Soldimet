import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPagoEfectivo } from 'app/shared/model/pago-efectivo.model';

type EntityResponseType = HttpResponse<IPagoEfectivo>;
type EntityArrayResponseType = HttpResponse<IPagoEfectivo[]>;

@Injectable({ providedIn: 'root' })
export class PagoEfectivoService {
  public resourceUrl = SERVER_API_URL + 'api/pago-efectivos';

  constructor(protected http: HttpClient) {}

  create(pagoEfectivo: IPagoEfectivo): Observable<EntityResponseType> {
    return this.http.post<IPagoEfectivo>(this.resourceUrl, pagoEfectivo, { observe: 'response' });
  }

  update(pagoEfectivo: IPagoEfectivo): Observable<EntityResponseType> {
    return this.http.put<IPagoEfectivo>(this.resourceUrl, pagoEfectivo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPagoEfectivo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPagoEfectivo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

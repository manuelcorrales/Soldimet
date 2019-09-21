import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMedioDePagoTarjeta } from 'app/shared/model/medio-de-pago-tarjeta.model';

type EntityResponseType = HttpResponse<IMedioDePagoTarjeta>;
type EntityArrayResponseType = HttpResponse<IMedioDePagoTarjeta[]>;

@Injectable({ providedIn: 'root' })
export class MedioDePagoTarjetaService {
  public resourceUrl = SERVER_API_URL + 'api/medio-de-pago-tarjetas';

  constructor(protected http: HttpClient) {}

  create(medioDePagoTarjeta: IMedioDePagoTarjeta): Observable<EntityResponseType> {
    return this.http.post<IMedioDePagoTarjeta>(this.resourceUrl, medioDePagoTarjeta, { observe: 'response' });
  }

  update(medioDePagoTarjeta: IMedioDePagoTarjeta): Observable<EntityResponseType> {
    return this.http.put<IMedioDePagoTarjeta>(this.resourceUrl, medioDePagoTarjeta, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMedioDePagoTarjeta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMedioDePagoTarjeta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

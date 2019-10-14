import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMedioDePago } from 'app/shared/model/medio-de-pago.model';

type EntityResponseType = HttpResponse<IMedioDePago>;
type EntityArrayResponseType = HttpResponse<IMedioDePago[]>;

@Injectable({ providedIn: 'root' })
export class MedioDePagoService {
  public resourceUrl = SERVER_API_URL + 'api/medio-de-pagos';

  constructor(protected http: HttpClient) {}

  create(medioDePago: IMedioDePago): Observable<EntityResponseType> {
    return this.http.post<IMedioDePago>(this.resourceUrl, medioDePago, { observe: 'response' });
  }

  update(medioDePago: IMedioDePago): Observable<EntityResponseType> {
    return this.http.put<IMedioDePago>(this.resourceUrl, medioDePago, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMedioDePago>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMedioDePago[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

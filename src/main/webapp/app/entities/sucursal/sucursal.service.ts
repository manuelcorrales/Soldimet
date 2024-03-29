import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISucursal } from 'app/shared/model/sucursal.model';

type EntityResponseType = HttpResponse<ISucursal>;
type EntityArrayResponseType = HttpResponse<ISucursal[]>;

@Injectable({ providedIn: 'root' })
export class SucursalService {
  public resourceUrl = SERVER_API_URL + 'api/sucursals';

  constructor(protected http: HttpClient) {}

  create(sucursal: ISucursal): Observable<EntityResponseType> {
    return this.http.post<ISucursal>(this.resourceUrl, sucursal, { observe: 'response' });
  }

  update(sucursal: ISucursal): Observable<EntityResponseType> {
    return this.http.put<ISucursal>(this.resourceUrl, sucursal, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISucursal>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISucursal[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

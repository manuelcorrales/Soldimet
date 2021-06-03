import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMedidaArticulo } from 'app/shared/model/medida-articulo.model';

type EntityResponseType = HttpResponse<IMedidaArticulo>;
type EntityArrayResponseType = HttpResponse<IMedidaArticulo[]>;

@Injectable({ providedIn: 'root' })
export class MedidaArticuloService {
  public resourceUrl = SERVER_API_URL + 'api/medida-articulos';

  constructor(protected http: HttpClient) {}

  create(medidaArticulo: IMedidaArticulo): Observable<EntityResponseType> {
    return this.http.post<IMedidaArticulo>(this.resourceUrl, medidaArticulo, { observe: 'response' });
  }

  update(medidaArticulo: IMedidaArticulo): Observable<EntityResponseType> {
    return this.http.put<IMedidaArticulo>(this.resourceUrl, medidaArticulo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMedidaArticulo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMedidaArticulo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

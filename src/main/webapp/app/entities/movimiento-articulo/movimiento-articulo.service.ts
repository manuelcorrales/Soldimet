import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMovimientoArticulo } from 'app/shared/model/movimiento-articulo.model';

type EntityResponseType = HttpResponse<IMovimientoArticulo>;
type EntityArrayResponseType = HttpResponse<IMovimientoArticulo[]>;

@Injectable({ providedIn: 'root' })
export class MovimientoArticuloService {
  public resourceUrl = SERVER_API_URL + 'api/movimiento-articulos';

  constructor(protected http: HttpClient) {}

  create(movimientoArticulo: IMovimientoArticulo): Observable<EntityResponseType> {
    return this.http.post<IMovimientoArticulo>(this.resourceUrl, movimientoArticulo, { observe: 'response' });
  }

  update(movimientoArticulo: IMovimientoArticulo): Observable<EntityResponseType> {
    return this.http.put<IMovimientoArticulo>(this.resourceUrl, movimientoArticulo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMovimientoArticulo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMovimientoArticulo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

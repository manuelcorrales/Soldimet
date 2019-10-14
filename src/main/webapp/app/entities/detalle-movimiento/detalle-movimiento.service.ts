import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';

type EntityResponseType = HttpResponse<IDetalleMovimiento>;
type EntityArrayResponseType = HttpResponse<IDetalleMovimiento[]>;

@Injectable({ providedIn: 'root' })
export class DetalleMovimientoService {
  public resourceUrl = SERVER_API_URL + 'api/detalle-movimientos';

  constructor(protected http: HttpClient) {}

  create(detalleMovimiento: IDetalleMovimiento): Observable<EntityResponseType> {
    return this.http.post<IDetalleMovimiento>(this.resourceUrl, detalleMovimiento, { observe: 'response' });
  }

  update(detalleMovimiento: IDetalleMovimiento): Observable<EntityResponseType> {
    return this.http.put<IDetalleMovimiento>(this.resourceUrl, detalleMovimiento, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDetalleMovimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDetalleMovimiento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

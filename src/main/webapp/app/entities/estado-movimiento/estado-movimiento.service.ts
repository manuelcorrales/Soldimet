import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEstadoMovimiento } from 'app/shared/model/estado-movimiento.model';

type EntityResponseType = HttpResponse<IEstadoMovimiento>;
type EntityArrayResponseType = HttpResponse<IEstadoMovimiento[]>;

@Injectable({ providedIn: 'root' })
export class EstadoMovimientoService {
  public resourceUrl = SERVER_API_URL + 'api/estado-movimientos';

  constructor(protected http: HttpClient) {}

  create(estadoMovimiento: IEstadoMovimiento): Observable<EntityResponseType> {
    return this.http.post<IEstadoMovimiento>(this.resourceUrl, estadoMovimiento, { observe: 'response' });
  }

  update(estadoMovimiento: IEstadoMovimiento): Observable<EntityResponseType> {
    return this.http.put<IEstadoMovimiento>(this.resourceUrl, estadoMovimiento, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstadoMovimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstadoMovimiento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

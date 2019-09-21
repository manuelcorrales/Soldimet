import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEstadoOperacion } from 'app/shared/model/estado-operacion.model';

type EntityResponseType = HttpResponse<IEstadoOperacion>;
type EntityArrayResponseType = HttpResponse<IEstadoOperacion[]>;

@Injectable({ providedIn: 'root' })
export class EstadoOperacionService {
  public resourceUrl = SERVER_API_URL + 'api/estado-operacions';

  constructor(protected http: HttpClient) {}

  create(estadoOperacion: IEstadoOperacion): Observable<EntityResponseType> {
    return this.http.post<IEstadoOperacion>(this.resourceUrl, estadoOperacion, { observe: 'response' });
  }

  update(estadoOperacion: IEstadoOperacion): Observable<EntityResponseType> {
    return this.http.put<IEstadoOperacion>(this.resourceUrl, estadoOperacion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstadoOperacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstadoOperacion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEstadoCobranzaOperacion } from 'app/shared/model/estado-cobranza-operacion.model';

type EntityResponseType = HttpResponse<IEstadoCobranzaOperacion>;
type EntityArrayResponseType = HttpResponse<IEstadoCobranzaOperacion[]>;

@Injectable({ providedIn: 'root' })
export class EstadoCobranzaOperacionService {
  public resourceUrl = SERVER_API_URL + 'api/estado-cobranza-operacions';

  constructor(protected http: HttpClient) {}

  create(estadoCobranzaOperacion: IEstadoCobranzaOperacion): Observable<EntityResponseType> {
    return this.http.post<IEstadoCobranzaOperacion>(this.resourceUrl, estadoCobranzaOperacion, { observe: 'response' });
  }

  update(estadoCobranzaOperacion: IEstadoCobranzaOperacion): Observable<EntityResponseType> {
    return this.http.put<IEstadoCobranzaOperacion>(this.resourceUrl, estadoCobranzaOperacion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstadoCobranzaOperacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstadoCobranzaOperacion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

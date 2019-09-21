import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICobranzaOperacion } from 'app/shared/model/cobranza-operacion.model';

type EntityResponseType = HttpResponse<ICobranzaOperacion>;
type EntityArrayResponseType = HttpResponse<ICobranzaOperacion[]>;

@Injectable({ providedIn: 'root' })
export class CobranzaOperacionService {
  public resourceUrl = SERVER_API_URL + 'api/cobranza-operacions';

  constructor(protected http: HttpClient) {}

  create(cobranzaOperacion: ICobranzaOperacion): Observable<EntityResponseType> {
    return this.http.post<ICobranzaOperacion>(this.resourceUrl, cobranzaOperacion, { observe: 'response' });
  }

  update(cobranzaOperacion: ICobranzaOperacion): Observable<EntityResponseType> {
    return this.http.put<ICobranzaOperacion>(this.resourceUrl, cobranzaOperacion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICobranzaOperacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICobranzaOperacion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

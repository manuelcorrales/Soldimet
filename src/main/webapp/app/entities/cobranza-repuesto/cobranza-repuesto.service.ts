import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';

type EntityResponseType = HttpResponse<ICobranzaRepuesto>;
type EntityArrayResponseType = HttpResponse<ICobranzaRepuesto[]>;

@Injectable({ providedIn: 'root' })
export class CobranzaRepuestoService {
  public resourceUrl = SERVER_API_URL + 'api/cobranza-repuestos';

  constructor(protected http: HttpClient) {}

  create(cobranzaRepuesto: ICobranzaRepuesto): Observable<EntityResponseType> {
    return this.http.post<ICobranzaRepuesto>(this.resourceUrl, cobranzaRepuesto, { observe: 'response' });
  }

  update(cobranzaRepuesto: ICobranzaRepuesto): Observable<EntityResponseType> {
    return this.http.put<ICobranzaRepuesto>(this.resourceUrl, cobranzaRepuesto, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICobranzaRepuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICobranzaRepuesto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

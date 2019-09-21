import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICilindrada } from 'app/shared/model/cilindrada.model';

type EntityResponseType = HttpResponse<ICilindrada>;
type EntityArrayResponseType = HttpResponse<ICilindrada[]>;

@Injectable({ providedIn: 'root' })
export class CilindradaService {
  public resourceUrl = SERVER_API_URL + 'api/cilindradas';

  constructor(protected http: HttpClient) {}

  create(cilindrada: ICilindrada): Observable<EntityResponseType> {
    return this.http.post<ICilindrada>(this.resourceUrl, cilindrada, { observe: 'response' });
  }

  update(cilindrada: ICilindrada): Observable<EntityResponseType> {
    return this.http.put<ICilindrada>(this.resourceUrl, cilindrada, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICilindrada>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICilindrada[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

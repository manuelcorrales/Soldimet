import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICategoriaPago } from 'app/shared/model/categoria-pago.model';

type EntityResponseType = HttpResponse<ICategoriaPago>;
type EntityArrayResponseType = HttpResponse<ICategoriaPago[]>;

@Injectable({ providedIn: 'root' })
export class CategoriaPagoService {
  public resourceUrl = SERVER_API_URL + 'api/categoria-pagos';

  constructor(protected http: HttpClient) {}

  create(categoriaPago: ICategoriaPago): Observable<EntityResponseType> {
    return this.http.post<ICategoriaPago>(this.resourceUrl, categoriaPago, { observe: 'response' });
  }

  update(categoriaPago: ICategoriaPago): Observable<EntityResponseType> {
    return this.http.put<ICategoriaPago>(this.resourceUrl, categoriaPago, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICategoriaPago>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICategoriaPago[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

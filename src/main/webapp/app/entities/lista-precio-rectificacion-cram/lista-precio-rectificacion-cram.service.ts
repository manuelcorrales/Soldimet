import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IListaPrecioRectificacionCRAM } from 'app/shared/model/lista-precio-rectificacion-cram.model';

type EntityResponseType = HttpResponse<IListaPrecioRectificacionCRAM>;
type EntityArrayResponseType = HttpResponse<IListaPrecioRectificacionCRAM[]>;

@Injectable({ providedIn: 'root' })
export class ListaPrecioRectificacionCRAMService {
  public resourceUrl = SERVER_API_URL + 'api/lista-precio-rectificacion-crams';

  constructor(protected http: HttpClient) {}

  create(listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM): Observable<EntityResponseType> {
    return this.http.post<IListaPrecioRectificacionCRAM>(this.resourceUrl, listaPrecioRectificacionCRAM, { observe: 'response' });
  }

  update(listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM): Observable<EntityResponseType> {
    return this.http.put<IListaPrecioRectificacionCRAM>(this.resourceUrl, listaPrecioRectificacionCRAM, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IListaPrecioRectificacionCRAM>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IListaPrecioRectificacionCRAM[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

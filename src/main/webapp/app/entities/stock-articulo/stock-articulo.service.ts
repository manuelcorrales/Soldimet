import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStockArticulo } from 'app/shared/model/stock-articulo.model';

type EntityResponseType = HttpResponse<IStockArticulo>;
type EntityArrayResponseType = HttpResponse<IStockArticulo[]>;

@Injectable({ providedIn: 'root' })
export class StockArticuloService {
  public resourceUrl = SERVER_API_URL + 'api/stock-articulos';

  constructor(protected http: HttpClient) {}

  create(stockArticulo: IStockArticulo): Observable<EntityResponseType> {
    return this.http.post<IStockArticulo>(this.resourceUrl, stockArticulo, { observe: 'response' });
  }

  update(stockArticulo: IStockArticulo): Observable<EntityResponseType> {
    return this.http.put<IStockArticulo>(this.resourceUrl, stockArticulo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStockArticulo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStockArticulo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

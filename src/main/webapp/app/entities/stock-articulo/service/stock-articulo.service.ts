import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStockArticulo, getStockArticuloIdentifier } from '../stock-articulo.model';

export type EntityResponseType = HttpResponse<IStockArticulo>;
export type EntityArrayResponseType = HttpResponse<IStockArticulo[]>;

@Injectable({ providedIn: 'root' })
export class StockArticuloService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/stock-articulos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(stockArticulo: IStockArticulo): Observable<EntityResponseType> {
    return this.http.post<IStockArticulo>(this.resourceUrl, stockArticulo, { observe: 'response' });
  }

  update(stockArticulo: IStockArticulo): Observable<EntityResponseType> {
    return this.http.put<IStockArticulo>(`${this.resourceUrl}/${getStockArticuloIdentifier(stockArticulo) as number}`, stockArticulo, {
      observe: 'response',
    });
  }

  partialUpdate(stockArticulo: IStockArticulo): Observable<EntityResponseType> {
    return this.http.patch<IStockArticulo>(`${this.resourceUrl}/${getStockArticuloIdentifier(stockArticulo) as number}`, stockArticulo, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStockArticulo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStockArticulo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addStockArticuloToCollectionIfMissing(
    stockArticuloCollection: IStockArticulo[],
    ...stockArticulosToCheck: (IStockArticulo | null | undefined)[]
  ): IStockArticulo[] {
    const stockArticulos: IStockArticulo[] = stockArticulosToCheck.filter(isPresent);
    if (stockArticulos.length > 0) {
      const stockArticuloCollectionIdentifiers = stockArticuloCollection.map(
        stockArticuloItem => getStockArticuloIdentifier(stockArticuloItem)!
      );
      const stockArticulosToAdd = stockArticulos.filter(stockArticuloItem => {
        const stockArticuloIdentifier = getStockArticuloIdentifier(stockArticuloItem);
        if (stockArticuloIdentifier == null || stockArticuloCollectionIdentifiers.includes(stockArticuloIdentifier)) {
          return false;
        }
        stockArticuloCollectionIdentifiers.push(stockArticuloIdentifier);
        return true;
      });
      return [...stockArticulosToAdd, ...stockArticuloCollection];
    }
    return stockArticuloCollection;
  }
}

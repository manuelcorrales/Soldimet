import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMovimientoArticulo, getMovimientoArticuloIdentifier } from '../movimiento-articulo.model';

export type EntityResponseType = HttpResponse<IMovimientoArticulo>;
export type EntityArrayResponseType = HttpResponse<IMovimientoArticulo[]>;

@Injectable({ providedIn: 'root' })
export class MovimientoArticuloService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/movimiento-articulos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(movimientoArticulo: IMovimientoArticulo): Observable<EntityResponseType> {
    return this.http.post<IMovimientoArticulo>(this.resourceUrl, movimientoArticulo, { observe: 'response' });
  }

  update(movimientoArticulo: IMovimientoArticulo): Observable<EntityResponseType> {
    return this.http.put<IMovimientoArticulo>(
      `${this.resourceUrl}/${getMovimientoArticuloIdentifier(movimientoArticulo) as number}`,
      movimientoArticulo,
      { observe: 'response' }
    );
  }

  partialUpdate(movimientoArticulo: IMovimientoArticulo): Observable<EntityResponseType> {
    return this.http.patch<IMovimientoArticulo>(
      `${this.resourceUrl}/${getMovimientoArticuloIdentifier(movimientoArticulo) as number}`,
      movimientoArticulo,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMovimientoArticulo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMovimientoArticulo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMovimientoArticuloToCollectionIfMissing(
    movimientoArticuloCollection: IMovimientoArticulo[],
    ...movimientoArticulosToCheck: (IMovimientoArticulo | null | undefined)[]
  ): IMovimientoArticulo[] {
    const movimientoArticulos: IMovimientoArticulo[] = movimientoArticulosToCheck.filter(isPresent);
    if (movimientoArticulos.length > 0) {
      const movimientoArticuloCollectionIdentifiers = movimientoArticuloCollection.map(
        movimientoArticuloItem => getMovimientoArticuloIdentifier(movimientoArticuloItem)!
      );
      const movimientoArticulosToAdd = movimientoArticulos.filter(movimientoArticuloItem => {
        const movimientoArticuloIdentifier = getMovimientoArticuloIdentifier(movimientoArticuloItem);
        if (movimientoArticuloIdentifier == null || movimientoArticuloCollectionIdentifiers.includes(movimientoArticuloIdentifier)) {
          return false;
        }
        movimientoArticuloCollectionIdentifiers.push(movimientoArticuloIdentifier);
        return true;
      });
      return [...movimientoArticulosToAdd, ...movimientoArticuloCollection];
    }
    return movimientoArticuloCollection;
  }
}

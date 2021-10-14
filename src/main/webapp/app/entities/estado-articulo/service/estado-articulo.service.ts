import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEstadoArticulo, getEstadoArticuloIdentifier } from '../estado-articulo.model';

export type EntityResponseType = HttpResponse<IEstadoArticulo>;
export type EntityArrayResponseType = HttpResponse<IEstadoArticulo[]>;

@Injectable({ providedIn: 'root' })
export class EstadoArticuloService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/estado-articulos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(estadoArticulo: IEstadoArticulo): Observable<EntityResponseType> {
    return this.http.post<IEstadoArticulo>(this.resourceUrl, estadoArticulo, { observe: 'response' });
  }

  update(estadoArticulo: IEstadoArticulo): Observable<EntityResponseType> {
    return this.http.put<IEstadoArticulo>(`${this.resourceUrl}/${getEstadoArticuloIdentifier(estadoArticulo) as number}`, estadoArticulo, {
      observe: 'response',
    });
  }

  partialUpdate(estadoArticulo: IEstadoArticulo): Observable<EntityResponseType> {
    return this.http.patch<IEstadoArticulo>(
      `${this.resourceUrl}/${getEstadoArticuloIdentifier(estadoArticulo) as number}`,
      estadoArticulo,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstadoArticulo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstadoArticulo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEstadoArticuloToCollectionIfMissing(
    estadoArticuloCollection: IEstadoArticulo[],
    ...estadoArticulosToCheck: (IEstadoArticulo | null | undefined)[]
  ): IEstadoArticulo[] {
    const estadoArticulos: IEstadoArticulo[] = estadoArticulosToCheck.filter(isPresent);
    if (estadoArticulos.length > 0) {
      const estadoArticuloCollectionIdentifiers = estadoArticuloCollection.map(
        estadoArticuloItem => getEstadoArticuloIdentifier(estadoArticuloItem)!
      );
      const estadoArticulosToAdd = estadoArticulos.filter(estadoArticuloItem => {
        const estadoArticuloIdentifier = getEstadoArticuloIdentifier(estadoArticuloItem);
        if (estadoArticuloIdentifier == null || estadoArticuloCollectionIdentifiers.includes(estadoArticuloIdentifier)) {
          return false;
        }
        estadoArticuloCollectionIdentifiers.push(estadoArticuloIdentifier);
        return true;
      });
      return [...estadoArticulosToAdd, ...estadoArticuloCollection];
    }
    return estadoArticuloCollection;
  }
}

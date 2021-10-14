import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMedidaArticulo, getMedidaArticuloIdentifier } from '../medida-articulo.model';

export type EntityResponseType = HttpResponse<IMedidaArticulo>;
export type EntityArrayResponseType = HttpResponse<IMedidaArticulo[]>;

@Injectable({ providedIn: 'root' })
export class MedidaArticuloService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/medida-articulos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(medidaArticulo: IMedidaArticulo): Observable<EntityResponseType> {
    return this.http.post<IMedidaArticulo>(this.resourceUrl, medidaArticulo, { observe: 'response' });
  }

  update(medidaArticulo: IMedidaArticulo): Observable<EntityResponseType> {
    return this.http.put<IMedidaArticulo>(`${this.resourceUrl}/${getMedidaArticuloIdentifier(medidaArticulo) as number}`, medidaArticulo, {
      observe: 'response',
    });
  }

  partialUpdate(medidaArticulo: IMedidaArticulo): Observable<EntityResponseType> {
    return this.http.patch<IMedidaArticulo>(
      `${this.resourceUrl}/${getMedidaArticuloIdentifier(medidaArticulo) as number}`,
      medidaArticulo,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMedidaArticulo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMedidaArticulo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMedidaArticuloToCollectionIfMissing(
    medidaArticuloCollection: IMedidaArticulo[],
    ...medidaArticulosToCheck: (IMedidaArticulo | null | undefined)[]
  ): IMedidaArticulo[] {
    const medidaArticulos: IMedidaArticulo[] = medidaArticulosToCheck.filter(isPresent);
    if (medidaArticulos.length > 0) {
      const medidaArticuloCollectionIdentifiers = medidaArticuloCollection.map(
        medidaArticuloItem => getMedidaArticuloIdentifier(medidaArticuloItem)!
      );
      const medidaArticulosToAdd = medidaArticulos.filter(medidaArticuloItem => {
        const medidaArticuloIdentifier = getMedidaArticuloIdentifier(medidaArticuloItem);
        if (medidaArticuloIdentifier == null || medidaArticuloCollectionIdentifiers.includes(medidaArticuloIdentifier)) {
          return false;
        }
        medidaArticuloCollectionIdentifiers.push(medidaArticuloIdentifier);
        return true;
      });
      return [...medidaArticulosToAdd, ...medidaArticuloCollection];
    }
    return medidaArticuloCollection;
  }
}

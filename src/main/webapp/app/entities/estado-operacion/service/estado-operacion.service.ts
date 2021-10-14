import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEstadoOperacion, getEstadoOperacionIdentifier } from '../estado-operacion.model';

export type EntityResponseType = HttpResponse<IEstadoOperacion>;
export type EntityArrayResponseType = HttpResponse<IEstadoOperacion[]>;

@Injectable({ providedIn: 'root' })
export class EstadoOperacionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/estado-operacions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(estadoOperacion: IEstadoOperacion): Observable<EntityResponseType> {
    return this.http.post<IEstadoOperacion>(this.resourceUrl, estadoOperacion, { observe: 'response' });
  }

  update(estadoOperacion: IEstadoOperacion): Observable<EntityResponseType> {
    return this.http.put<IEstadoOperacion>(
      `${this.resourceUrl}/${getEstadoOperacionIdentifier(estadoOperacion) as number}`,
      estadoOperacion,
      { observe: 'response' }
    );
  }

  partialUpdate(estadoOperacion: IEstadoOperacion): Observable<EntityResponseType> {
    return this.http.patch<IEstadoOperacion>(
      `${this.resourceUrl}/${getEstadoOperacionIdentifier(estadoOperacion) as number}`,
      estadoOperacion,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstadoOperacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstadoOperacion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEstadoOperacionToCollectionIfMissing(
    estadoOperacionCollection: IEstadoOperacion[],
    ...estadoOperacionsToCheck: (IEstadoOperacion | null | undefined)[]
  ): IEstadoOperacion[] {
    const estadoOperacions: IEstadoOperacion[] = estadoOperacionsToCheck.filter(isPresent);
    if (estadoOperacions.length > 0) {
      const estadoOperacionCollectionIdentifiers = estadoOperacionCollection.map(
        estadoOperacionItem => getEstadoOperacionIdentifier(estadoOperacionItem)!
      );
      const estadoOperacionsToAdd = estadoOperacions.filter(estadoOperacionItem => {
        const estadoOperacionIdentifier = getEstadoOperacionIdentifier(estadoOperacionItem);
        if (estadoOperacionIdentifier == null || estadoOperacionCollectionIdentifiers.includes(estadoOperacionIdentifier)) {
          return false;
        }
        estadoOperacionCollectionIdentifiers.push(estadoOperacionIdentifier);
        return true;
      });
      return [...estadoOperacionsToAdd, ...estadoOperacionCollection];
    }
    return estadoOperacionCollection;
  }
}

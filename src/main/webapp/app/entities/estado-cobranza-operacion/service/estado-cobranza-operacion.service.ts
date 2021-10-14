import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEstadoCobranzaOperacion, getEstadoCobranzaOperacionIdentifier } from '../estado-cobranza-operacion.model';

export type EntityResponseType = HttpResponse<IEstadoCobranzaOperacion>;
export type EntityArrayResponseType = HttpResponse<IEstadoCobranzaOperacion[]>;

@Injectable({ providedIn: 'root' })
export class EstadoCobranzaOperacionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/estado-cobranza-operacions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(estadoCobranzaOperacion: IEstadoCobranzaOperacion): Observable<EntityResponseType> {
    return this.http.post<IEstadoCobranzaOperacion>(this.resourceUrl, estadoCobranzaOperacion, { observe: 'response' });
  }

  update(estadoCobranzaOperacion: IEstadoCobranzaOperacion): Observable<EntityResponseType> {
    return this.http.put<IEstadoCobranzaOperacion>(
      `${this.resourceUrl}/${getEstadoCobranzaOperacionIdentifier(estadoCobranzaOperacion) as number}`,
      estadoCobranzaOperacion,
      { observe: 'response' }
    );
  }

  partialUpdate(estadoCobranzaOperacion: IEstadoCobranzaOperacion): Observable<EntityResponseType> {
    return this.http.patch<IEstadoCobranzaOperacion>(
      `${this.resourceUrl}/${getEstadoCobranzaOperacionIdentifier(estadoCobranzaOperacion) as number}`,
      estadoCobranzaOperacion,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstadoCobranzaOperacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstadoCobranzaOperacion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEstadoCobranzaOperacionToCollectionIfMissing(
    estadoCobranzaOperacionCollection: IEstadoCobranzaOperacion[],
    ...estadoCobranzaOperacionsToCheck: (IEstadoCobranzaOperacion | null | undefined)[]
  ): IEstadoCobranzaOperacion[] {
    const estadoCobranzaOperacions: IEstadoCobranzaOperacion[] = estadoCobranzaOperacionsToCheck.filter(isPresent);
    if (estadoCobranzaOperacions.length > 0) {
      const estadoCobranzaOperacionCollectionIdentifiers = estadoCobranzaOperacionCollection.map(
        estadoCobranzaOperacionItem => getEstadoCobranzaOperacionIdentifier(estadoCobranzaOperacionItem)!
      );
      const estadoCobranzaOperacionsToAdd = estadoCobranzaOperacions.filter(estadoCobranzaOperacionItem => {
        const estadoCobranzaOperacionIdentifier = getEstadoCobranzaOperacionIdentifier(estadoCobranzaOperacionItem);
        if (
          estadoCobranzaOperacionIdentifier == null ||
          estadoCobranzaOperacionCollectionIdentifiers.includes(estadoCobranzaOperacionIdentifier)
        ) {
          return false;
        }
        estadoCobranzaOperacionCollectionIdentifiers.push(estadoCobranzaOperacionIdentifier);
        return true;
      });
      return [...estadoCobranzaOperacionsToAdd, ...estadoCobranzaOperacionCollection];
    }
    return estadoCobranzaOperacionCollection;
  }
}

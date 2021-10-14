import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEstadoPersona, getEstadoPersonaIdentifier } from '../estado-persona.model';

export type EntityResponseType = HttpResponse<IEstadoPersona>;
export type EntityArrayResponseType = HttpResponse<IEstadoPersona[]>;

@Injectable({ providedIn: 'root' })
export class EstadoPersonaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/estado-personas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(estadoPersona: IEstadoPersona): Observable<EntityResponseType> {
    return this.http.post<IEstadoPersona>(this.resourceUrl, estadoPersona, { observe: 'response' });
  }

  update(estadoPersona: IEstadoPersona): Observable<EntityResponseType> {
    return this.http.put<IEstadoPersona>(`${this.resourceUrl}/${getEstadoPersonaIdentifier(estadoPersona) as number}`, estadoPersona, {
      observe: 'response',
    });
  }

  partialUpdate(estadoPersona: IEstadoPersona): Observable<EntityResponseType> {
    return this.http.patch<IEstadoPersona>(`${this.resourceUrl}/${getEstadoPersonaIdentifier(estadoPersona) as number}`, estadoPersona, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstadoPersona>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstadoPersona[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEstadoPersonaToCollectionIfMissing(
    estadoPersonaCollection: IEstadoPersona[],
    ...estadoPersonasToCheck: (IEstadoPersona | null | undefined)[]
  ): IEstadoPersona[] {
    const estadoPersonas: IEstadoPersona[] = estadoPersonasToCheck.filter(isPresent);
    if (estadoPersonas.length > 0) {
      const estadoPersonaCollectionIdentifiers = estadoPersonaCollection.map(
        estadoPersonaItem => getEstadoPersonaIdentifier(estadoPersonaItem)!
      );
      const estadoPersonasToAdd = estadoPersonas.filter(estadoPersonaItem => {
        const estadoPersonaIdentifier = getEstadoPersonaIdentifier(estadoPersonaItem);
        if (estadoPersonaIdentifier == null || estadoPersonaCollectionIdentifiers.includes(estadoPersonaIdentifier)) {
          return false;
        }
        estadoPersonaCollectionIdentifiers.push(estadoPersonaIdentifier);
        return true;
      });
      return [...estadoPersonasToAdd, ...estadoPersonaCollection];
    }
    return estadoPersonaCollection;
  }
}

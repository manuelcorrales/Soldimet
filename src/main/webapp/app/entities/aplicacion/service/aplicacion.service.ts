import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAplicacion, getAplicacionIdentifier } from '../aplicacion.model';

export type EntityResponseType = HttpResponse<IAplicacion>;
export type EntityArrayResponseType = HttpResponse<IAplicacion[]>;

@Injectable({ providedIn: 'root' })
export class AplicacionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/aplicacions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(aplicacion: IAplicacion): Observable<EntityResponseType> {
    return this.http.post<IAplicacion>(this.resourceUrl, aplicacion, { observe: 'response' });
  }

  update(aplicacion: IAplicacion): Observable<EntityResponseType> {
    return this.http.put<IAplicacion>(`${this.resourceUrl}/${getAplicacionIdentifier(aplicacion) as number}`, aplicacion, {
      observe: 'response',
    });
  }

  partialUpdate(aplicacion: IAplicacion): Observable<EntityResponseType> {
    return this.http.patch<IAplicacion>(`${this.resourceUrl}/${getAplicacionIdentifier(aplicacion) as number}`, aplicacion, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAplicacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAplicacion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAplicacionToCollectionIfMissing(
    aplicacionCollection: IAplicacion[],
    ...aplicacionsToCheck: (IAplicacion | null | undefined)[]
  ): IAplicacion[] {
    const aplicacions: IAplicacion[] = aplicacionsToCheck.filter(isPresent);
    if (aplicacions.length > 0) {
      const aplicacionCollectionIdentifiers = aplicacionCollection.map(aplicacionItem => getAplicacionIdentifier(aplicacionItem)!);
      const aplicacionsToAdd = aplicacions.filter(aplicacionItem => {
        const aplicacionIdentifier = getAplicacionIdentifier(aplicacionItem);
        if (aplicacionIdentifier == null || aplicacionCollectionIdentifiers.includes(aplicacionIdentifier)) {
          return false;
        }
        aplicacionCollectionIdentifiers.push(aplicacionIdentifier);
        return true;
      });
      return [...aplicacionsToAdd, ...aplicacionCollection];
    }
    return aplicacionCollection;
  }
}

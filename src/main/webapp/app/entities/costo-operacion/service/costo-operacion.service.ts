import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICostoOperacion, getCostoOperacionIdentifier } from '../costo-operacion.model';

export type EntityResponseType = HttpResponse<ICostoOperacion>;
export type EntityArrayResponseType = HttpResponse<ICostoOperacion[]>;

@Injectable({ providedIn: 'root' })
export class CostoOperacionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/costo-operacions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(costoOperacion: ICostoOperacion): Observable<EntityResponseType> {
    return this.http.post<ICostoOperacion>(this.resourceUrl, costoOperacion, { observe: 'response' });
  }

  update(costoOperacion: ICostoOperacion): Observable<EntityResponseType> {
    return this.http.put<ICostoOperacion>(`${this.resourceUrl}/${getCostoOperacionIdentifier(costoOperacion) as number}`, costoOperacion, {
      observe: 'response',
    });
  }

  partialUpdate(costoOperacion: ICostoOperacion): Observable<EntityResponseType> {
    return this.http.patch<ICostoOperacion>(
      `${this.resourceUrl}/${getCostoOperacionIdentifier(costoOperacion) as number}`,
      costoOperacion,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICostoOperacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICostoOperacion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCostoOperacionToCollectionIfMissing(
    costoOperacionCollection: ICostoOperacion[],
    ...costoOperacionsToCheck: (ICostoOperacion | null | undefined)[]
  ): ICostoOperacion[] {
    const costoOperacions: ICostoOperacion[] = costoOperacionsToCheck.filter(isPresent);
    if (costoOperacions.length > 0) {
      const costoOperacionCollectionIdentifiers = costoOperacionCollection.map(
        costoOperacionItem => getCostoOperacionIdentifier(costoOperacionItem)!
      );
      const costoOperacionsToAdd = costoOperacions.filter(costoOperacionItem => {
        const costoOperacionIdentifier = getCostoOperacionIdentifier(costoOperacionItem);
        if (costoOperacionIdentifier == null || costoOperacionCollectionIdentifiers.includes(costoOperacionIdentifier)) {
          return false;
        }
        costoOperacionCollectionIdentifiers.push(costoOperacionIdentifier);
        return true;
      });
      return [...costoOperacionsToAdd, ...costoOperacionCollection];
    }
    return costoOperacionCollection;
  }
}

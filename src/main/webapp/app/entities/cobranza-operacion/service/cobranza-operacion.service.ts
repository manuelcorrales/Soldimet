import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICobranzaOperacion, getCobranzaOperacionIdentifier } from '../cobranza-operacion.model';

export type EntityResponseType = HttpResponse<ICobranzaOperacion>;
export type EntityArrayResponseType = HttpResponse<ICobranzaOperacion[]>;

@Injectable({ providedIn: 'root' })
export class CobranzaOperacionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cobranza-operacions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cobranzaOperacion: ICobranzaOperacion): Observable<EntityResponseType> {
    return this.http.post<ICobranzaOperacion>(this.resourceUrl, cobranzaOperacion, { observe: 'response' });
  }

  update(cobranzaOperacion: ICobranzaOperacion): Observable<EntityResponseType> {
    return this.http.put<ICobranzaOperacion>(
      `${this.resourceUrl}/${getCobranzaOperacionIdentifier(cobranzaOperacion) as number}`,
      cobranzaOperacion,
      { observe: 'response' }
    );
  }

  partialUpdate(cobranzaOperacion: ICobranzaOperacion): Observable<EntityResponseType> {
    return this.http.patch<ICobranzaOperacion>(
      `${this.resourceUrl}/${getCobranzaOperacionIdentifier(cobranzaOperacion) as number}`,
      cobranzaOperacion,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICobranzaOperacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICobranzaOperacion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCobranzaOperacionToCollectionIfMissing(
    cobranzaOperacionCollection: ICobranzaOperacion[],
    ...cobranzaOperacionsToCheck: (ICobranzaOperacion | null | undefined)[]
  ): ICobranzaOperacion[] {
    const cobranzaOperacions: ICobranzaOperacion[] = cobranzaOperacionsToCheck.filter(isPresent);
    if (cobranzaOperacions.length > 0) {
      const cobranzaOperacionCollectionIdentifiers = cobranzaOperacionCollection.map(
        cobranzaOperacionItem => getCobranzaOperacionIdentifier(cobranzaOperacionItem)!
      );
      const cobranzaOperacionsToAdd = cobranzaOperacions.filter(cobranzaOperacionItem => {
        const cobranzaOperacionIdentifier = getCobranzaOperacionIdentifier(cobranzaOperacionItem);
        if (cobranzaOperacionIdentifier == null || cobranzaOperacionCollectionIdentifiers.includes(cobranzaOperacionIdentifier)) {
          return false;
        }
        cobranzaOperacionCollectionIdentifiers.push(cobranzaOperacionIdentifier);
        return true;
      });
      return [...cobranzaOperacionsToAdd, ...cobranzaOperacionCollection];
    }
    return cobranzaOperacionCollection;
  }
}

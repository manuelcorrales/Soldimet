import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICilindrada, getCilindradaIdentifier } from '../cilindrada.model';

export type EntityResponseType = HttpResponse<ICilindrada>;
export type EntityArrayResponseType = HttpResponse<ICilindrada[]>;

@Injectable({ providedIn: 'root' })
export class CilindradaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cilindradas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cilindrada: ICilindrada): Observable<EntityResponseType> {
    return this.http.post<ICilindrada>(this.resourceUrl, cilindrada, { observe: 'response' });
  }

  update(cilindrada: ICilindrada): Observable<EntityResponseType> {
    return this.http.put<ICilindrada>(`${this.resourceUrl}/${getCilindradaIdentifier(cilindrada) as number}`, cilindrada, {
      observe: 'response',
    });
  }

  partialUpdate(cilindrada: ICilindrada): Observable<EntityResponseType> {
    return this.http.patch<ICilindrada>(`${this.resourceUrl}/${getCilindradaIdentifier(cilindrada) as number}`, cilindrada, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICilindrada>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICilindrada[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCilindradaToCollectionIfMissing(
    cilindradaCollection: ICilindrada[],
    ...cilindradasToCheck: (ICilindrada | null | undefined)[]
  ): ICilindrada[] {
    const cilindradas: ICilindrada[] = cilindradasToCheck.filter(isPresent);
    if (cilindradas.length > 0) {
      const cilindradaCollectionIdentifiers = cilindradaCollection.map(cilindradaItem => getCilindradaIdentifier(cilindradaItem)!);
      const cilindradasToAdd = cilindradas.filter(cilindradaItem => {
        const cilindradaIdentifier = getCilindradaIdentifier(cilindradaItem);
        if (cilindradaIdentifier == null || cilindradaCollectionIdentifiers.includes(cilindradaIdentifier)) {
          return false;
        }
        cilindradaCollectionIdentifiers.push(cilindradaIdentifier);
        return true;
      });
      return [...cilindradasToAdd, ...cilindradaCollection];
    }
    return cilindradaCollection;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRubro, getRubroIdentifier } from '../rubro.model';

export type EntityResponseType = HttpResponse<IRubro>;
export type EntityArrayResponseType = HttpResponse<IRubro[]>;

@Injectable({ providedIn: 'root' })
export class RubroService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/rubros');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(rubro: IRubro): Observable<EntityResponseType> {
    return this.http.post<IRubro>(this.resourceUrl, rubro, { observe: 'response' });
  }

  update(rubro: IRubro): Observable<EntityResponseType> {
    return this.http.put<IRubro>(`${this.resourceUrl}/${getRubroIdentifier(rubro) as number}`, rubro, { observe: 'response' });
  }

  partialUpdate(rubro: IRubro): Observable<EntityResponseType> {
    return this.http.patch<IRubro>(`${this.resourceUrl}/${getRubroIdentifier(rubro) as number}`, rubro, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRubro>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRubro[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRubroToCollectionIfMissing(rubroCollection: IRubro[], ...rubrosToCheck: (IRubro | null | undefined)[]): IRubro[] {
    const rubros: IRubro[] = rubrosToCheck.filter(isPresent);
    if (rubros.length > 0) {
      const rubroCollectionIdentifiers = rubroCollection.map(rubroItem => getRubroIdentifier(rubroItem)!);
      const rubrosToAdd = rubros.filter(rubroItem => {
        const rubroIdentifier = getRubroIdentifier(rubroItem);
        if (rubroIdentifier == null || rubroCollectionIdentifiers.includes(rubroIdentifier)) {
          return false;
        }
        rubroCollectionIdentifiers.push(rubroIdentifier);
        return true;
      });
      return [...rubrosToAdd, ...rubroCollection];
    }
    return rubroCollection;
  }
}

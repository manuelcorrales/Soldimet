import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBanco, getBancoIdentifier } from '../banco.model';

export type EntityResponseType = HttpResponse<IBanco>;
export type EntityArrayResponseType = HttpResponse<IBanco[]>;

@Injectable({ providedIn: 'root' })
export class BancoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/bancos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(banco: IBanco): Observable<EntityResponseType> {
    return this.http.post<IBanco>(this.resourceUrl, banco, { observe: 'response' });
  }

  update(banco: IBanco): Observable<EntityResponseType> {
    return this.http.put<IBanco>(`${this.resourceUrl}/${getBancoIdentifier(banco) as number}`, banco, { observe: 'response' });
  }

  partialUpdate(banco: IBanco): Observable<EntityResponseType> {
    return this.http.patch<IBanco>(`${this.resourceUrl}/${getBancoIdentifier(banco) as number}`, banco, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBanco>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBanco[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addBancoToCollectionIfMissing(bancoCollection: IBanco[], ...bancosToCheck: (IBanco | null | undefined)[]): IBanco[] {
    const bancos: IBanco[] = bancosToCheck.filter(isPresent);
    if (bancos.length > 0) {
      const bancoCollectionIdentifiers = bancoCollection.map(bancoItem => getBancoIdentifier(bancoItem)!);
      const bancosToAdd = bancos.filter(bancoItem => {
        const bancoIdentifier = getBancoIdentifier(bancoItem);
        if (bancoIdentifier == null || bancoCollectionIdentifiers.includes(bancoIdentifier)) {
          return false;
        }
        bancoCollectionIdentifiers.push(bancoIdentifier);
        return true;
      });
      return [...bancosToAdd, ...bancoCollection];
    }
    return bancoCollection;
  }
}

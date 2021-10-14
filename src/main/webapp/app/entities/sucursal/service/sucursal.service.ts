import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISucursal, getSucursalIdentifier } from '../sucursal.model';

export type EntityResponseType = HttpResponse<ISucursal>;
export type EntityArrayResponseType = HttpResponse<ISucursal[]>;

@Injectable({ providedIn: 'root' })
export class SucursalService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/sucursals');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(sucursal: ISucursal): Observable<EntityResponseType> {
    return this.http.post<ISucursal>(this.resourceUrl, sucursal, { observe: 'response' });
  }

  update(sucursal: ISucursal): Observable<EntityResponseType> {
    return this.http.put<ISucursal>(`${this.resourceUrl}/${getSucursalIdentifier(sucursal) as number}`, sucursal, { observe: 'response' });
  }

  partialUpdate(sucursal: ISucursal): Observable<EntityResponseType> {
    return this.http.patch<ISucursal>(`${this.resourceUrl}/${getSucursalIdentifier(sucursal) as number}`, sucursal, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISucursal>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISucursal[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSucursalToCollectionIfMissing(sucursalCollection: ISucursal[], ...sucursalsToCheck: (ISucursal | null | undefined)[]): ISucursal[] {
    const sucursals: ISucursal[] = sucursalsToCheck.filter(isPresent);
    if (sucursals.length > 0) {
      const sucursalCollectionIdentifiers = sucursalCollection.map(sucursalItem => getSucursalIdentifier(sucursalItem)!);
      const sucursalsToAdd = sucursals.filter(sucursalItem => {
        const sucursalIdentifier = getSucursalIdentifier(sucursalItem);
        if (sucursalIdentifier == null || sucursalCollectionIdentifiers.includes(sucursalIdentifier)) {
          return false;
        }
        sucursalCollectionIdentifiers.push(sucursalIdentifier);
        return true;
      });
      return [...sucursalsToAdd, ...sucursalCollection];
    }
    return sucursalCollection;
  }
}

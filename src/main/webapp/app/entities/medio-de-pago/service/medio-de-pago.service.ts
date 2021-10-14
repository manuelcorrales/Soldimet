import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMedioDePago, getMedioDePagoIdentifier } from '../medio-de-pago.model';

export type EntityResponseType = HttpResponse<IMedioDePago>;
export type EntityArrayResponseType = HttpResponse<IMedioDePago[]>;

@Injectable({ providedIn: 'root' })
export class MedioDePagoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/medio-de-pagos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(medioDePago: IMedioDePago): Observable<EntityResponseType> {
    return this.http.post<IMedioDePago>(this.resourceUrl, medioDePago, { observe: 'response' });
  }

  update(medioDePago: IMedioDePago): Observable<EntityResponseType> {
    return this.http.put<IMedioDePago>(`${this.resourceUrl}/${getMedioDePagoIdentifier(medioDePago) as number}`, medioDePago, {
      observe: 'response',
    });
  }

  partialUpdate(medioDePago: IMedioDePago): Observable<EntityResponseType> {
    return this.http.patch<IMedioDePago>(`${this.resourceUrl}/${getMedioDePagoIdentifier(medioDePago) as number}`, medioDePago, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMedioDePago>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMedioDePago[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMedioDePagoToCollectionIfMissing(
    medioDePagoCollection: IMedioDePago[],
    ...medioDePagosToCheck: (IMedioDePago | null | undefined)[]
  ): IMedioDePago[] {
    const medioDePagos: IMedioDePago[] = medioDePagosToCheck.filter(isPresent);
    if (medioDePagos.length > 0) {
      const medioDePagoCollectionIdentifiers = medioDePagoCollection.map(medioDePagoItem => getMedioDePagoIdentifier(medioDePagoItem)!);
      const medioDePagosToAdd = medioDePagos.filter(medioDePagoItem => {
        const medioDePagoIdentifier = getMedioDePagoIdentifier(medioDePagoItem);
        if (medioDePagoIdentifier == null || medioDePagoCollectionIdentifiers.includes(medioDePagoIdentifier)) {
          return false;
        }
        medioDePagoCollectionIdentifiers.push(medioDePagoIdentifier);
        return true;
      });
      return [...medioDePagosToAdd, ...medioDePagoCollection];
    }
    return medioDePagoCollection;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMedioDePagoCheque, getMedioDePagoChequeIdentifier } from '../medio-de-pago-cheque.model';

export type EntityResponseType = HttpResponse<IMedioDePagoCheque>;
export type EntityArrayResponseType = HttpResponse<IMedioDePagoCheque[]>;

@Injectable({ providedIn: 'root' })
export class MedioDePagoChequeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/medio-de-pago-cheques');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(medioDePagoCheque: IMedioDePagoCheque): Observable<EntityResponseType> {
    return this.http.post<IMedioDePagoCheque>(this.resourceUrl, medioDePagoCheque, { observe: 'response' });
  }

  update(medioDePagoCheque: IMedioDePagoCheque): Observable<EntityResponseType> {
    return this.http.put<IMedioDePagoCheque>(
      `${this.resourceUrl}/${getMedioDePagoChequeIdentifier(medioDePagoCheque) as number}`,
      medioDePagoCheque,
      { observe: 'response' }
    );
  }

  partialUpdate(medioDePagoCheque: IMedioDePagoCheque): Observable<EntityResponseType> {
    return this.http.patch<IMedioDePagoCheque>(
      `${this.resourceUrl}/${getMedioDePagoChequeIdentifier(medioDePagoCheque) as number}`,
      medioDePagoCheque,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMedioDePagoCheque>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMedioDePagoCheque[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMedioDePagoChequeToCollectionIfMissing(
    medioDePagoChequeCollection: IMedioDePagoCheque[],
    ...medioDePagoChequesToCheck: (IMedioDePagoCheque | null | undefined)[]
  ): IMedioDePagoCheque[] {
    const medioDePagoCheques: IMedioDePagoCheque[] = medioDePagoChequesToCheck.filter(isPresent);
    if (medioDePagoCheques.length > 0) {
      const medioDePagoChequeCollectionIdentifiers = medioDePagoChequeCollection.map(
        medioDePagoChequeItem => getMedioDePagoChequeIdentifier(medioDePagoChequeItem)!
      );
      const medioDePagoChequesToAdd = medioDePagoCheques.filter(medioDePagoChequeItem => {
        const medioDePagoChequeIdentifier = getMedioDePagoChequeIdentifier(medioDePagoChequeItem);
        if (medioDePagoChequeIdentifier == null || medioDePagoChequeCollectionIdentifiers.includes(medioDePagoChequeIdentifier)) {
          return false;
        }
        medioDePagoChequeCollectionIdentifiers.push(medioDePagoChequeIdentifier);
        return true;
      });
      return [...medioDePagoChequesToAdd, ...medioDePagoChequeCollection];
    }
    return medioDePagoChequeCollection;
  }
}

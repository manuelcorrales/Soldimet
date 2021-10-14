import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPagoCheque, getPagoChequeIdentifier } from '../pago-cheque.model';

export type EntityResponseType = HttpResponse<IPagoCheque>;
export type EntityArrayResponseType = HttpResponse<IPagoCheque[]>;

@Injectable({ providedIn: 'root' })
export class PagoChequeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pago-cheques');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pagoCheque: IPagoCheque): Observable<EntityResponseType> {
    return this.http.post<IPagoCheque>(this.resourceUrl, pagoCheque, { observe: 'response' });
  }

  update(pagoCheque: IPagoCheque): Observable<EntityResponseType> {
    return this.http.put<IPagoCheque>(`${this.resourceUrl}/${getPagoChequeIdentifier(pagoCheque) as number}`, pagoCheque, {
      observe: 'response',
    });
  }

  partialUpdate(pagoCheque: IPagoCheque): Observable<EntityResponseType> {
    return this.http.patch<IPagoCheque>(`${this.resourceUrl}/${getPagoChequeIdentifier(pagoCheque) as number}`, pagoCheque, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPagoCheque>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPagoCheque[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPagoChequeToCollectionIfMissing(
    pagoChequeCollection: IPagoCheque[],
    ...pagoChequesToCheck: (IPagoCheque | null | undefined)[]
  ): IPagoCheque[] {
    const pagoCheques: IPagoCheque[] = pagoChequesToCheck.filter(isPresent);
    if (pagoCheques.length > 0) {
      const pagoChequeCollectionIdentifiers = pagoChequeCollection.map(pagoChequeItem => getPagoChequeIdentifier(pagoChequeItem)!);
      const pagoChequesToAdd = pagoCheques.filter(pagoChequeItem => {
        const pagoChequeIdentifier = getPagoChequeIdentifier(pagoChequeItem);
        if (pagoChequeIdentifier == null || pagoChequeCollectionIdentifiers.includes(pagoChequeIdentifier)) {
          return false;
        }
        pagoChequeCollectionIdentifiers.push(pagoChequeIdentifier);
        return true;
      });
      return [...pagoChequesToAdd, ...pagoChequeCollection];
    }
    return pagoChequeCollection;
  }
}

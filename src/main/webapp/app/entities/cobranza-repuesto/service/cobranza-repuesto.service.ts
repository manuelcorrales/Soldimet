import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICobranzaRepuesto, getCobranzaRepuestoIdentifier } from '../cobranza-repuesto.model';

export type EntityResponseType = HttpResponse<ICobranzaRepuesto>;
export type EntityArrayResponseType = HttpResponse<ICobranzaRepuesto[]>;

@Injectable({ providedIn: 'root' })
export class CobranzaRepuestoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cobranza-repuestos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cobranzaRepuesto: ICobranzaRepuesto): Observable<EntityResponseType> {
    return this.http.post<ICobranzaRepuesto>(this.resourceUrl, cobranzaRepuesto, { observe: 'response' });
  }

  update(cobranzaRepuesto: ICobranzaRepuesto): Observable<EntityResponseType> {
    return this.http.put<ICobranzaRepuesto>(
      `${this.resourceUrl}/${getCobranzaRepuestoIdentifier(cobranzaRepuesto) as number}`,
      cobranzaRepuesto,
      { observe: 'response' }
    );
  }

  partialUpdate(cobranzaRepuesto: ICobranzaRepuesto): Observable<EntityResponseType> {
    return this.http.patch<ICobranzaRepuesto>(
      `${this.resourceUrl}/${getCobranzaRepuestoIdentifier(cobranzaRepuesto) as number}`,
      cobranzaRepuesto,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICobranzaRepuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICobranzaRepuesto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCobranzaRepuestoToCollectionIfMissing(
    cobranzaRepuestoCollection: ICobranzaRepuesto[],
    ...cobranzaRepuestosToCheck: (ICobranzaRepuesto | null | undefined)[]
  ): ICobranzaRepuesto[] {
    const cobranzaRepuestos: ICobranzaRepuesto[] = cobranzaRepuestosToCheck.filter(isPresent);
    if (cobranzaRepuestos.length > 0) {
      const cobranzaRepuestoCollectionIdentifiers = cobranzaRepuestoCollection.map(
        cobranzaRepuestoItem => getCobranzaRepuestoIdentifier(cobranzaRepuestoItem)!
      );
      const cobranzaRepuestosToAdd = cobranzaRepuestos.filter(cobranzaRepuestoItem => {
        const cobranzaRepuestoIdentifier = getCobranzaRepuestoIdentifier(cobranzaRepuestoItem);
        if (cobranzaRepuestoIdentifier == null || cobranzaRepuestoCollectionIdentifiers.includes(cobranzaRepuestoIdentifier)) {
          return false;
        }
        cobranzaRepuestoCollectionIdentifiers.push(cobranzaRepuestoIdentifier);
        return true;
      });
      return [...cobranzaRepuestosToAdd, ...cobranzaRepuestoCollection];
    }
    return cobranzaRepuestoCollection;
  }
}

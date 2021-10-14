import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPagoEfectivo, getPagoEfectivoIdentifier } from '../pago-efectivo.model';

export type EntityResponseType = HttpResponse<IPagoEfectivo>;
export type EntityArrayResponseType = HttpResponse<IPagoEfectivo[]>;

@Injectable({ providedIn: 'root' })
export class PagoEfectivoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pago-efectivos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pagoEfectivo: IPagoEfectivo): Observable<EntityResponseType> {
    return this.http.post<IPagoEfectivo>(this.resourceUrl, pagoEfectivo, { observe: 'response' });
  }

  update(pagoEfectivo: IPagoEfectivo): Observable<EntityResponseType> {
    return this.http.put<IPagoEfectivo>(`${this.resourceUrl}/${getPagoEfectivoIdentifier(pagoEfectivo) as number}`, pagoEfectivo, {
      observe: 'response',
    });
  }

  partialUpdate(pagoEfectivo: IPagoEfectivo): Observable<EntityResponseType> {
    return this.http.patch<IPagoEfectivo>(`${this.resourceUrl}/${getPagoEfectivoIdentifier(pagoEfectivo) as number}`, pagoEfectivo, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPagoEfectivo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPagoEfectivo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPagoEfectivoToCollectionIfMissing(
    pagoEfectivoCollection: IPagoEfectivo[],
    ...pagoEfectivosToCheck: (IPagoEfectivo | null | undefined)[]
  ): IPagoEfectivo[] {
    const pagoEfectivos: IPagoEfectivo[] = pagoEfectivosToCheck.filter(isPresent);
    if (pagoEfectivos.length > 0) {
      const pagoEfectivoCollectionIdentifiers = pagoEfectivoCollection.map(
        pagoEfectivoItem => getPagoEfectivoIdentifier(pagoEfectivoItem)!
      );
      const pagoEfectivosToAdd = pagoEfectivos.filter(pagoEfectivoItem => {
        const pagoEfectivoIdentifier = getPagoEfectivoIdentifier(pagoEfectivoItem);
        if (pagoEfectivoIdentifier == null || pagoEfectivoCollectionIdentifiers.includes(pagoEfectivoIdentifier)) {
          return false;
        }
        pagoEfectivoCollectionIdentifiers.push(pagoEfectivoIdentifier);
        return true;
      });
      return [...pagoEfectivosToAdd, ...pagoEfectivoCollection];
    }
    return pagoEfectivoCollection;
  }
}

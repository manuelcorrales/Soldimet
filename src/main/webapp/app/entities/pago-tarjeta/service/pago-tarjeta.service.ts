import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPagoTarjeta, getPagoTarjetaIdentifier } from '../pago-tarjeta.model';

export type EntityResponseType = HttpResponse<IPagoTarjeta>;
export type EntityArrayResponseType = HttpResponse<IPagoTarjeta[]>;

@Injectable({ providedIn: 'root' })
export class PagoTarjetaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pago-tarjetas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pagoTarjeta: IPagoTarjeta): Observable<EntityResponseType> {
    return this.http.post<IPagoTarjeta>(this.resourceUrl, pagoTarjeta, { observe: 'response' });
  }

  update(pagoTarjeta: IPagoTarjeta): Observable<EntityResponseType> {
    return this.http.put<IPagoTarjeta>(`${this.resourceUrl}/${getPagoTarjetaIdentifier(pagoTarjeta) as number}`, pagoTarjeta, {
      observe: 'response',
    });
  }

  partialUpdate(pagoTarjeta: IPagoTarjeta): Observable<EntityResponseType> {
    return this.http.patch<IPagoTarjeta>(`${this.resourceUrl}/${getPagoTarjetaIdentifier(pagoTarjeta) as number}`, pagoTarjeta, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPagoTarjeta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPagoTarjeta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPagoTarjetaToCollectionIfMissing(
    pagoTarjetaCollection: IPagoTarjeta[],
    ...pagoTarjetasToCheck: (IPagoTarjeta | null | undefined)[]
  ): IPagoTarjeta[] {
    const pagoTarjetas: IPagoTarjeta[] = pagoTarjetasToCheck.filter(isPresent);
    if (pagoTarjetas.length > 0) {
      const pagoTarjetaCollectionIdentifiers = pagoTarjetaCollection.map(pagoTarjetaItem => getPagoTarjetaIdentifier(pagoTarjetaItem)!);
      const pagoTarjetasToAdd = pagoTarjetas.filter(pagoTarjetaItem => {
        const pagoTarjetaIdentifier = getPagoTarjetaIdentifier(pagoTarjetaItem);
        if (pagoTarjetaIdentifier == null || pagoTarjetaCollectionIdentifiers.includes(pagoTarjetaIdentifier)) {
          return false;
        }
        pagoTarjetaCollectionIdentifiers.push(pagoTarjetaIdentifier);
        return true;
      });
      return [...pagoTarjetasToAdd, ...pagoTarjetaCollection];
    }
    return pagoTarjetaCollection;
  }
}

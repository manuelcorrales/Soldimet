import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMedioDePagoTarjeta, getMedioDePagoTarjetaIdentifier } from '../medio-de-pago-tarjeta.model';

export type EntityResponseType = HttpResponse<IMedioDePagoTarjeta>;
export type EntityArrayResponseType = HttpResponse<IMedioDePagoTarjeta[]>;

@Injectable({ providedIn: 'root' })
export class MedioDePagoTarjetaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/medio-de-pago-tarjetas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(medioDePagoTarjeta: IMedioDePagoTarjeta): Observable<EntityResponseType> {
    return this.http.post<IMedioDePagoTarjeta>(this.resourceUrl, medioDePagoTarjeta, { observe: 'response' });
  }

  update(medioDePagoTarjeta: IMedioDePagoTarjeta): Observable<EntityResponseType> {
    return this.http.put<IMedioDePagoTarjeta>(
      `${this.resourceUrl}/${getMedioDePagoTarjetaIdentifier(medioDePagoTarjeta) as number}`,
      medioDePagoTarjeta,
      { observe: 'response' }
    );
  }

  partialUpdate(medioDePagoTarjeta: IMedioDePagoTarjeta): Observable<EntityResponseType> {
    return this.http.patch<IMedioDePagoTarjeta>(
      `${this.resourceUrl}/${getMedioDePagoTarjetaIdentifier(medioDePagoTarjeta) as number}`,
      medioDePagoTarjeta,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMedioDePagoTarjeta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMedioDePagoTarjeta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMedioDePagoTarjetaToCollectionIfMissing(
    medioDePagoTarjetaCollection: IMedioDePagoTarjeta[],
    ...medioDePagoTarjetasToCheck: (IMedioDePagoTarjeta | null | undefined)[]
  ): IMedioDePagoTarjeta[] {
    const medioDePagoTarjetas: IMedioDePagoTarjeta[] = medioDePagoTarjetasToCheck.filter(isPresent);
    if (medioDePagoTarjetas.length > 0) {
      const medioDePagoTarjetaCollectionIdentifiers = medioDePagoTarjetaCollection.map(
        medioDePagoTarjetaItem => getMedioDePagoTarjetaIdentifier(medioDePagoTarjetaItem)!
      );
      const medioDePagoTarjetasToAdd = medioDePagoTarjetas.filter(medioDePagoTarjetaItem => {
        const medioDePagoTarjetaIdentifier = getMedioDePagoTarjetaIdentifier(medioDePagoTarjetaItem);
        if (medioDePagoTarjetaIdentifier == null || medioDePagoTarjetaCollectionIdentifiers.includes(medioDePagoTarjetaIdentifier)) {
          return false;
        }
        medioDePagoTarjetaCollectionIdentifiers.push(medioDePagoTarjetaIdentifier);
        return true;
      });
      return [...medioDePagoTarjetasToAdd, ...medioDePagoTarjetaCollection];
    }
    return medioDePagoTarjetaCollection;
  }
}

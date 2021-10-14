import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoMovimiento, getTipoMovimientoIdentifier } from '../tipo-movimiento.model';

export type EntityResponseType = HttpResponse<ITipoMovimiento>;
export type EntityArrayResponseType = HttpResponse<ITipoMovimiento[]>;

@Injectable({ providedIn: 'root' })
export class TipoMovimientoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-movimientos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tipoMovimiento: ITipoMovimiento): Observable<EntityResponseType> {
    return this.http.post<ITipoMovimiento>(this.resourceUrl, tipoMovimiento, { observe: 'response' });
  }

  update(tipoMovimiento: ITipoMovimiento): Observable<EntityResponseType> {
    return this.http.put<ITipoMovimiento>(`${this.resourceUrl}/${getTipoMovimientoIdentifier(tipoMovimiento) as number}`, tipoMovimiento, {
      observe: 'response',
    });
  }

  partialUpdate(tipoMovimiento: ITipoMovimiento): Observable<EntityResponseType> {
    return this.http.patch<ITipoMovimiento>(
      `${this.resourceUrl}/${getTipoMovimientoIdentifier(tipoMovimiento) as number}`,
      tipoMovimiento,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoMovimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoMovimiento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTipoMovimientoToCollectionIfMissing(
    tipoMovimientoCollection: ITipoMovimiento[],
    ...tipoMovimientosToCheck: (ITipoMovimiento | null | undefined)[]
  ): ITipoMovimiento[] {
    const tipoMovimientos: ITipoMovimiento[] = tipoMovimientosToCheck.filter(isPresent);
    if (tipoMovimientos.length > 0) {
      const tipoMovimientoCollectionIdentifiers = tipoMovimientoCollection.map(
        tipoMovimientoItem => getTipoMovimientoIdentifier(tipoMovimientoItem)!
      );
      const tipoMovimientosToAdd = tipoMovimientos.filter(tipoMovimientoItem => {
        const tipoMovimientoIdentifier = getTipoMovimientoIdentifier(tipoMovimientoItem);
        if (tipoMovimientoIdentifier == null || tipoMovimientoCollectionIdentifiers.includes(tipoMovimientoIdentifier)) {
          return false;
        }
        tipoMovimientoCollectionIdentifiers.push(tipoMovimientoIdentifier);
        return true;
      });
      return [...tipoMovimientosToAdd, ...tipoMovimientoCollection];
    }
    return tipoMovimientoCollection;
  }
}

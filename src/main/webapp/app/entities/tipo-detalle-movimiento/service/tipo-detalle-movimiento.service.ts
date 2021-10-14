import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoDetalleMovimiento, getTipoDetalleMovimientoIdentifier } from '../tipo-detalle-movimiento.model';

export type EntityResponseType = HttpResponse<ITipoDetalleMovimiento>;
export type EntityArrayResponseType = HttpResponse<ITipoDetalleMovimiento[]>;

@Injectable({ providedIn: 'root' })
export class TipoDetalleMovimientoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-detalle-movimientos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tipoDetalleMovimiento: ITipoDetalleMovimiento): Observable<EntityResponseType> {
    return this.http.post<ITipoDetalleMovimiento>(this.resourceUrl, tipoDetalleMovimiento, { observe: 'response' });
  }

  update(tipoDetalleMovimiento: ITipoDetalleMovimiento): Observable<EntityResponseType> {
    return this.http.put<ITipoDetalleMovimiento>(
      `${this.resourceUrl}/${getTipoDetalleMovimientoIdentifier(tipoDetalleMovimiento) as number}`,
      tipoDetalleMovimiento,
      { observe: 'response' }
    );
  }

  partialUpdate(tipoDetalleMovimiento: ITipoDetalleMovimiento): Observable<EntityResponseType> {
    return this.http.patch<ITipoDetalleMovimiento>(
      `${this.resourceUrl}/${getTipoDetalleMovimientoIdentifier(tipoDetalleMovimiento) as number}`,
      tipoDetalleMovimiento,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoDetalleMovimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoDetalleMovimiento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTipoDetalleMovimientoToCollectionIfMissing(
    tipoDetalleMovimientoCollection: ITipoDetalleMovimiento[],
    ...tipoDetalleMovimientosToCheck: (ITipoDetalleMovimiento | null | undefined)[]
  ): ITipoDetalleMovimiento[] {
    const tipoDetalleMovimientos: ITipoDetalleMovimiento[] = tipoDetalleMovimientosToCheck.filter(isPresent);
    if (tipoDetalleMovimientos.length > 0) {
      const tipoDetalleMovimientoCollectionIdentifiers = tipoDetalleMovimientoCollection.map(
        tipoDetalleMovimientoItem => getTipoDetalleMovimientoIdentifier(tipoDetalleMovimientoItem)!
      );
      const tipoDetalleMovimientosToAdd = tipoDetalleMovimientos.filter(tipoDetalleMovimientoItem => {
        const tipoDetalleMovimientoIdentifier = getTipoDetalleMovimientoIdentifier(tipoDetalleMovimientoItem);
        if (
          tipoDetalleMovimientoIdentifier == null ||
          tipoDetalleMovimientoCollectionIdentifiers.includes(tipoDetalleMovimientoIdentifier)
        ) {
          return false;
        }
        tipoDetalleMovimientoCollectionIdentifiers.push(tipoDetalleMovimientoIdentifier);
        return true;
      });
      return [...tipoDetalleMovimientosToAdd, ...tipoDetalleMovimientoCollection];
    }
    return tipoDetalleMovimientoCollection;
  }
}

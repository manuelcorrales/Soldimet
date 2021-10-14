import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDetalleMovimiento, getDetalleMovimientoIdentifier } from '../detalle-movimiento.model';

export type EntityResponseType = HttpResponse<IDetalleMovimiento>;
export type EntityArrayResponseType = HttpResponse<IDetalleMovimiento[]>;

@Injectable({ providedIn: 'root' })
export class DetalleMovimientoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/detalle-movimientos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(detalleMovimiento: IDetalleMovimiento): Observable<EntityResponseType> {
    return this.http.post<IDetalleMovimiento>(this.resourceUrl, detalleMovimiento, { observe: 'response' });
  }

  update(detalleMovimiento: IDetalleMovimiento): Observable<EntityResponseType> {
    return this.http.put<IDetalleMovimiento>(
      `${this.resourceUrl}/${getDetalleMovimientoIdentifier(detalleMovimiento) as number}`,
      detalleMovimiento,
      { observe: 'response' }
    );
  }

  partialUpdate(detalleMovimiento: IDetalleMovimiento): Observable<EntityResponseType> {
    return this.http.patch<IDetalleMovimiento>(
      `${this.resourceUrl}/${getDetalleMovimientoIdentifier(detalleMovimiento) as number}`,
      detalleMovimiento,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDetalleMovimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDetalleMovimiento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDetalleMovimientoToCollectionIfMissing(
    detalleMovimientoCollection: IDetalleMovimiento[],
    ...detalleMovimientosToCheck: (IDetalleMovimiento | null | undefined)[]
  ): IDetalleMovimiento[] {
    const detalleMovimientos: IDetalleMovimiento[] = detalleMovimientosToCheck.filter(isPresent);
    if (detalleMovimientos.length > 0) {
      const detalleMovimientoCollectionIdentifiers = detalleMovimientoCollection.map(
        detalleMovimientoItem => getDetalleMovimientoIdentifier(detalleMovimientoItem)!
      );
      const detalleMovimientosToAdd = detalleMovimientos.filter(detalleMovimientoItem => {
        const detalleMovimientoIdentifier = getDetalleMovimientoIdentifier(detalleMovimientoItem);
        if (detalleMovimientoIdentifier == null || detalleMovimientoCollectionIdentifiers.includes(detalleMovimientoIdentifier)) {
          return false;
        }
        detalleMovimientoCollectionIdentifiers.push(detalleMovimientoIdentifier);
        return true;
      });
      return [...detalleMovimientosToAdd, ...detalleMovimientoCollection];
    }
    return detalleMovimientoCollection;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDetallMovimiento, getDetallMovimientoIdentifier } from '../detall-movimiento.model';

export type EntityResponseType = HttpResponse<IDetallMovimiento>;
export type EntityArrayResponseType = HttpResponse<IDetallMovimiento[]>;

@Injectable({ providedIn: 'root' })
export class DetallMovimientoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/detall-movimientos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(detallMovimiento: IDetallMovimiento): Observable<EntityResponseType> {
    return this.http.post<IDetallMovimiento>(this.resourceUrl, detallMovimiento, { observe: 'response' });
  }

  update(detallMovimiento: IDetallMovimiento): Observable<EntityResponseType> {
    return this.http.put<IDetallMovimiento>(
      `${this.resourceUrl}/${getDetallMovimientoIdentifier(detallMovimiento) as number}`,
      detallMovimiento,
      { observe: 'response' }
    );
  }

  partialUpdate(detallMovimiento: IDetallMovimiento): Observable<EntityResponseType> {
    return this.http.patch<IDetallMovimiento>(
      `${this.resourceUrl}/${getDetallMovimientoIdentifier(detallMovimiento) as number}`,
      detallMovimiento,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDetallMovimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDetallMovimiento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDetallMovimientoToCollectionIfMissing(
    detallMovimientoCollection: IDetallMovimiento[],
    ...detallMovimientosToCheck: (IDetallMovimiento | null | undefined)[]
  ): IDetallMovimiento[] {
    const detallMovimientos: IDetallMovimiento[] = detallMovimientosToCheck.filter(isPresent);
    if (detallMovimientos.length > 0) {
      const detallMovimientoCollectionIdentifiers = detallMovimientoCollection.map(
        detallMovimientoItem => getDetallMovimientoIdentifier(detallMovimientoItem)!
      );
      const detallMovimientosToAdd = detallMovimientos.filter(detallMovimientoItem => {
        const detallMovimientoIdentifier = getDetallMovimientoIdentifier(detallMovimientoItem);
        if (detallMovimientoIdentifier == null || detallMovimientoCollectionIdentifiers.includes(detallMovimientoIdentifier)) {
          return false;
        }
        detallMovimientoCollectionIdentifiers.push(detallMovimientoIdentifier);
        return true;
      });
      return [...detallMovimientosToAdd, ...detallMovimientoCollection];
    }
    return detallMovimientoCollection;
  }
}

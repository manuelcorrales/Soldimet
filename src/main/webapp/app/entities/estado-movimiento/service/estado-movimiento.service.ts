import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEstadoMovimiento, getEstadoMovimientoIdentifier } from '../estado-movimiento.model';

export type EntityResponseType = HttpResponse<IEstadoMovimiento>;
export type EntityArrayResponseType = HttpResponse<IEstadoMovimiento[]>;

@Injectable({ providedIn: 'root' })
export class EstadoMovimientoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/estado-movimientos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(estadoMovimiento: IEstadoMovimiento): Observable<EntityResponseType> {
    return this.http.post<IEstadoMovimiento>(this.resourceUrl, estadoMovimiento, { observe: 'response' });
  }

  update(estadoMovimiento: IEstadoMovimiento): Observable<EntityResponseType> {
    return this.http.put<IEstadoMovimiento>(
      `${this.resourceUrl}/${getEstadoMovimientoIdentifier(estadoMovimiento) as number}`,
      estadoMovimiento,
      { observe: 'response' }
    );
  }

  partialUpdate(estadoMovimiento: IEstadoMovimiento): Observable<EntityResponseType> {
    return this.http.patch<IEstadoMovimiento>(
      `${this.resourceUrl}/${getEstadoMovimientoIdentifier(estadoMovimiento) as number}`,
      estadoMovimiento,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstadoMovimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstadoMovimiento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEstadoMovimientoToCollectionIfMissing(
    estadoMovimientoCollection: IEstadoMovimiento[],
    ...estadoMovimientosToCheck: (IEstadoMovimiento | null | undefined)[]
  ): IEstadoMovimiento[] {
    const estadoMovimientos: IEstadoMovimiento[] = estadoMovimientosToCheck.filter(isPresent);
    if (estadoMovimientos.length > 0) {
      const estadoMovimientoCollectionIdentifiers = estadoMovimientoCollection.map(
        estadoMovimientoItem => getEstadoMovimientoIdentifier(estadoMovimientoItem)!
      );
      const estadoMovimientosToAdd = estadoMovimientos.filter(estadoMovimientoItem => {
        const estadoMovimientoIdentifier = getEstadoMovimientoIdentifier(estadoMovimientoItem);
        if (estadoMovimientoIdentifier == null || estadoMovimientoCollectionIdentifiers.includes(estadoMovimientoIdentifier)) {
          return false;
        }
        estadoMovimientoCollectionIdentifiers.push(estadoMovimientoIdentifier);
        return true;
      });
      return [...estadoMovimientosToAdd, ...estadoMovimientoCollection];
    }
    return estadoMovimientoCollection;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMovimientoPresupuesto, getMovimientoPresupuestoIdentifier } from '../movimiento-presupuesto.model';

export type EntityResponseType = HttpResponse<IMovimientoPresupuesto>;
export type EntityArrayResponseType = HttpResponse<IMovimientoPresupuesto[]>;

@Injectable({ providedIn: 'root' })
export class MovimientoPresupuestoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/movimiento-presupuestos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(movimientoPresupuesto: IMovimientoPresupuesto): Observable<EntityResponseType> {
    return this.http.post<IMovimientoPresupuesto>(this.resourceUrl, movimientoPresupuesto, { observe: 'response' });
  }

  update(movimientoPresupuesto: IMovimientoPresupuesto): Observable<EntityResponseType> {
    return this.http.put<IMovimientoPresupuesto>(
      `${this.resourceUrl}/${getMovimientoPresupuestoIdentifier(movimientoPresupuesto) as number}`,
      movimientoPresupuesto,
      { observe: 'response' }
    );
  }

  partialUpdate(movimientoPresupuesto: IMovimientoPresupuesto): Observable<EntityResponseType> {
    return this.http.patch<IMovimientoPresupuesto>(
      `${this.resourceUrl}/${getMovimientoPresupuestoIdentifier(movimientoPresupuesto) as number}`,
      movimientoPresupuesto,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMovimientoPresupuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMovimientoPresupuesto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMovimientoPresupuestoToCollectionIfMissing(
    movimientoPresupuestoCollection: IMovimientoPresupuesto[],
    ...movimientoPresupuestosToCheck: (IMovimientoPresupuesto | null | undefined)[]
  ): IMovimientoPresupuesto[] {
    const movimientoPresupuestos: IMovimientoPresupuesto[] = movimientoPresupuestosToCheck.filter(isPresent);
    if (movimientoPresupuestos.length > 0) {
      const movimientoPresupuestoCollectionIdentifiers = movimientoPresupuestoCollection.map(
        movimientoPresupuestoItem => getMovimientoPresupuestoIdentifier(movimientoPresupuestoItem)!
      );
      const movimientoPresupuestosToAdd = movimientoPresupuestos.filter(movimientoPresupuestoItem => {
        const movimientoPresupuestoIdentifier = getMovimientoPresupuestoIdentifier(movimientoPresupuestoItem);
        if (
          movimientoPresupuestoIdentifier == null ||
          movimientoPresupuestoCollectionIdentifiers.includes(movimientoPresupuestoIdentifier)
        ) {
          return false;
        }
        movimientoPresupuestoCollectionIdentifiers.push(movimientoPresupuestoIdentifier);
        return true;
      });
      return [...movimientoPresupuestosToAdd, ...movimientoPresupuestoCollection];
    }
    return movimientoPresupuestoCollection;
  }
}

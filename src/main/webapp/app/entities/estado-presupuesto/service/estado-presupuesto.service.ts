import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEstadoPresupuesto, getEstadoPresupuestoIdentifier } from '../estado-presupuesto.model';

export type EntityResponseType = HttpResponse<IEstadoPresupuesto>;
export type EntityArrayResponseType = HttpResponse<IEstadoPresupuesto[]>;

@Injectable({ providedIn: 'root' })
export class EstadoPresupuestoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/estado-presupuestos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(estadoPresupuesto: IEstadoPresupuesto): Observable<EntityResponseType> {
    return this.http.post<IEstadoPresupuesto>(this.resourceUrl, estadoPresupuesto, { observe: 'response' });
  }

  update(estadoPresupuesto: IEstadoPresupuesto): Observable<EntityResponseType> {
    return this.http.put<IEstadoPresupuesto>(
      `${this.resourceUrl}/${getEstadoPresupuestoIdentifier(estadoPresupuesto) as number}`,
      estadoPresupuesto,
      { observe: 'response' }
    );
  }

  partialUpdate(estadoPresupuesto: IEstadoPresupuesto): Observable<EntityResponseType> {
    return this.http.patch<IEstadoPresupuesto>(
      `${this.resourceUrl}/${getEstadoPresupuestoIdentifier(estadoPresupuesto) as number}`,
      estadoPresupuesto,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstadoPresupuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstadoPresupuesto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEstadoPresupuestoToCollectionIfMissing(
    estadoPresupuestoCollection: IEstadoPresupuesto[],
    ...estadoPresupuestosToCheck: (IEstadoPresupuesto | null | undefined)[]
  ): IEstadoPresupuesto[] {
    const estadoPresupuestos: IEstadoPresupuesto[] = estadoPresupuestosToCheck.filter(isPresent);
    if (estadoPresupuestos.length > 0) {
      const estadoPresupuestoCollectionIdentifiers = estadoPresupuestoCollection.map(
        estadoPresupuestoItem => getEstadoPresupuestoIdentifier(estadoPresupuestoItem)!
      );
      const estadoPresupuestosToAdd = estadoPresupuestos.filter(estadoPresupuestoItem => {
        const estadoPresupuestoIdentifier = getEstadoPresupuestoIdentifier(estadoPresupuestoItem);
        if (estadoPresupuestoIdentifier == null || estadoPresupuestoCollectionIdentifiers.includes(estadoPresupuestoIdentifier)) {
          return false;
        }
        estadoPresupuestoCollectionIdentifiers.push(estadoPresupuestoIdentifier);
        return true;
      });
      return [...estadoPresupuestosToAdd, ...estadoPresupuestoCollection];
    }
    return estadoPresupuestoCollection;
  }
}

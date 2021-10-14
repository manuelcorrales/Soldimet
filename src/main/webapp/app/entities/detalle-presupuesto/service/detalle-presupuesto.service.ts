import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDetallePresupuesto, getDetallePresupuestoIdentifier } from '../detalle-presupuesto.model';

export type EntityResponseType = HttpResponse<IDetallePresupuesto>;
export type EntityArrayResponseType = HttpResponse<IDetallePresupuesto[]>;

@Injectable({ providedIn: 'root' })
export class DetallePresupuestoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/detalle-presupuestos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(detallePresupuesto: IDetallePresupuesto): Observable<EntityResponseType> {
    return this.http.post<IDetallePresupuesto>(this.resourceUrl, detallePresupuesto, { observe: 'response' });
  }

  update(detallePresupuesto: IDetallePresupuesto): Observable<EntityResponseType> {
    return this.http.put<IDetallePresupuesto>(
      `${this.resourceUrl}/${getDetallePresupuestoIdentifier(detallePresupuesto) as number}`,
      detallePresupuesto,
      { observe: 'response' }
    );
  }

  partialUpdate(detallePresupuesto: IDetallePresupuesto): Observable<EntityResponseType> {
    return this.http.patch<IDetallePresupuesto>(
      `${this.resourceUrl}/${getDetallePresupuestoIdentifier(detallePresupuesto) as number}`,
      detallePresupuesto,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDetallePresupuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDetallePresupuesto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDetallePresupuestoToCollectionIfMissing(
    detallePresupuestoCollection: IDetallePresupuesto[],
    ...detallePresupuestosToCheck: (IDetallePresupuesto | null | undefined)[]
  ): IDetallePresupuesto[] {
    const detallePresupuestos: IDetallePresupuesto[] = detallePresupuestosToCheck.filter(isPresent);
    if (detallePresupuestos.length > 0) {
      const detallePresupuestoCollectionIdentifiers = detallePresupuestoCollection.map(
        detallePresupuestoItem => getDetallePresupuestoIdentifier(detallePresupuestoItem)!
      );
      const detallePresupuestosToAdd = detallePresupuestos.filter(detallePresupuestoItem => {
        const detallePresupuestoIdentifier = getDetallePresupuestoIdentifier(detallePresupuestoItem);
        if (detallePresupuestoIdentifier == null || detallePresupuestoCollectionIdentifiers.includes(detallePresupuestoIdentifier)) {
          return false;
        }
        detallePresupuestoCollectionIdentifiers.push(detallePresupuestoIdentifier);
        return true;
      });
      return [...detallePresupuestosToAdd, ...detallePresupuestoCollection];
    }
    return detallePresupuestoCollection;
  }
}

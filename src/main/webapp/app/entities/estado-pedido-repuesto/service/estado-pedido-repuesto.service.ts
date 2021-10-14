import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEstadoPedidoRepuesto, getEstadoPedidoRepuestoIdentifier } from '../estado-pedido-repuesto.model';

export type EntityResponseType = HttpResponse<IEstadoPedidoRepuesto>;
export type EntityArrayResponseType = HttpResponse<IEstadoPedidoRepuesto[]>;

@Injectable({ providedIn: 'root' })
export class EstadoPedidoRepuestoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/estado-pedido-repuestos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(estadoPedidoRepuesto: IEstadoPedidoRepuesto): Observable<EntityResponseType> {
    return this.http.post<IEstadoPedidoRepuesto>(this.resourceUrl, estadoPedidoRepuesto, { observe: 'response' });
  }

  update(estadoPedidoRepuesto: IEstadoPedidoRepuesto): Observable<EntityResponseType> {
    return this.http.put<IEstadoPedidoRepuesto>(
      `${this.resourceUrl}/${getEstadoPedidoRepuestoIdentifier(estadoPedidoRepuesto) as number}`,
      estadoPedidoRepuesto,
      { observe: 'response' }
    );
  }

  partialUpdate(estadoPedidoRepuesto: IEstadoPedidoRepuesto): Observable<EntityResponseType> {
    return this.http.patch<IEstadoPedidoRepuesto>(
      `${this.resourceUrl}/${getEstadoPedidoRepuestoIdentifier(estadoPedidoRepuesto) as number}`,
      estadoPedidoRepuesto,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstadoPedidoRepuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstadoPedidoRepuesto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEstadoPedidoRepuestoToCollectionIfMissing(
    estadoPedidoRepuestoCollection: IEstadoPedidoRepuesto[],
    ...estadoPedidoRepuestosToCheck: (IEstadoPedidoRepuesto | null | undefined)[]
  ): IEstadoPedidoRepuesto[] {
    const estadoPedidoRepuestos: IEstadoPedidoRepuesto[] = estadoPedidoRepuestosToCheck.filter(isPresent);
    if (estadoPedidoRepuestos.length > 0) {
      const estadoPedidoRepuestoCollectionIdentifiers = estadoPedidoRepuestoCollection.map(
        estadoPedidoRepuestoItem => getEstadoPedidoRepuestoIdentifier(estadoPedidoRepuestoItem)!
      );
      const estadoPedidoRepuestosToAdd = estadoPedidoRepuestos.filter(estadoPedidoRepuestoItem => {
        const estadoPedidoRepuestoIdentifier = getEstadoPedidoRepuestoIdentifier(estadoPedidoRepuestoItem);
        if (estadoPedidoRepuestoIdentifier == null || estadoPedidoRepuestoCollectionIdentifiers.includes(estadoPedidoRepuestoIdentifier)) {
          return false;
        }
        estadoPedidoRepuestoCollectionIdentifiers.push(estadoPedidoRepuestoIdentifier);
        return true;
      });
      return [...estadoPedidoRepuestosToAdd, ...estadoPedidoRepuestoCollection];
    }
    return estadoPedidoRepuestoCollection;
  }
}

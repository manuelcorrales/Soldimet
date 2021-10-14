import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEstadoDetallePedido, getEstadoDetallePedidoIdentifier } from '../estado-detalle-pedido.model';

export type EntityResponseType = HttpResponse<IEstadoDetallePedido>;
export type EntityArrayResponseType = HttpResponse<IEstadoDetallePedido[]>;

@Injectable({ providedIn: 'root' })
export class EstadoDetallePedidoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/estado-detalle-pedidos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(estadoDetallePedido: IEstadoDetallePedido): Observable<EntityResponseType> {
    return this.http.post<IEstadoDetallePedido>(this.resourceUrl, estadoDetallePedido, { observe: 'response' });
  }

  update(estadoDetallePedido: IEstadoDetallePedido): Observable<EntityResponseType> {
    return this.http.put<IEstadoDetallePedido>(
      `${this.resourceUrl}/${getEstadoDetallePedidoIdentifier(estadoDetallePedido) as number}`,
      estadoDetallePedido,
      { observe: 'response' }
    );
  }

  partialUpdate(estadoDetallePedido: IEstadoDetallePedido): Observable<EntityResponseType> {
    return this.http.patch<IEstadoDetallePedido>(
      `${this.resourceUrl}/${getEstadoDetallePedidoIdentifier(estadoDetallePedido) as number}`,
      estadoDetallePedido,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstadoDetallePedido>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstadoDetallePedido[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEstadoDetallePedidoToCollectionIfMissing(
    estadoDetallePedidoCollection: IEstadoDetallePedido[],
    ...estadoDetallePedidosToCheck: (IEstadoDetallePedido | null | undefined)[]
  ): IEstadoDetallePedido[] {
    const estadoDetallePedidos: IEstadoDetallePedido[] = estadoDetallePedidosToCheck.filter(isPresent);
    if (estadoDetallePedidos.length > 0) {
      const estadoDetallePedidoCollectionIdentifiers = estadoDetallePedidoCollection.map(
        estadoDetallePedidoItem => getEstadoDetallePedidoIdentifier(estadoDetallePedidoItem)!
      );
      const estadoDetallePedidosToAdd = estadoDetallePedidos.filter(estadoDetallePedidoItem => {
        const estadoDetallePedidoIdentifier = getEstadoDetallePedidoIdentifier(estadoDetallePedidoItem);
        if (estadoDetallePedidoIdentifier == null || estadoDetallePedidoCollectionIdentifiers.includes(estadoDetallePedidoIdentifier)) {
          return false;
        }
        estadoDetallePedidoCollectionIdentifiers.push(estadoDetallePedidoIdentifier);
        return true;
      });
      return [...estadoDetallePedidosToAdd, ...estadoDetallePedidoCollection];
    }
    return estadoDetallePedidoCollection;
  }
}

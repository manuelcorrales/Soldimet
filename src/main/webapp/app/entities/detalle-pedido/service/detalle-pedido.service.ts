import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDetallePedido, getDetallePedidoIdentifier } from '../detalle-pedido.model';

export type EntityResponseType = HttpResponse<IDetallePedido>;
export type EntityArrayResponseType = HttpResponse<IDetallePedido[]>;

@Injectable({ providedIn: 'root' })
export class DetallePedidoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/detalle-pedidos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(detallePedido: IDetallePedido): Observable<EntityResponseType> {
    return this.http.post<IDetallePedido>(this.resourceUrl, detallePedido, { observe: 'response' });
  }

  update(detallePedido: IDetallePedido): Observable<EntityResponseType> {
    return this.http.put<IDetallePedido>(`${this.resourceUrl}/${getDetallePedidoIdentifier(detallePedido) as number}`, detallePedido, {
      observe: 'response',
    });
  }

  partialUpdate(detallePedido: IDetallePedido): Observable<EntityResponseType> {
    return this.http.patch<IDetallePedido>(`${this.resourceUrl}/${getDetallePedidoIdentifier(detallePedido) as number}`, detallePedido, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDetallePedido>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDetallePedido[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDetallePedidoToCollectionIfMissing(
    detallePedidoCollection: IDetallePedido[],
    ...detallePedidosToCheck: (IDetallePedido | null | undefined)[]
  ): IDetallePedido[] {
    const detallePedidos: IDetallePedido[] = detallePedidosToCheck.filter(isPresent);
    if (detallePedidos.length > 0) {
      const detallePedidoCollectionIdentifiers = detallePedidoCollection.map(
        detallePedidoItem => getDetallePedidoIdentifier(detallePedidoItem)!
      );
      const detallePedidosToAdd = detallePedidos.filter(detallePedidoItem => {
        const detallePedidoIdentifier = getDetallePedidoIdentifier(detallePedidoItem);
        if (detallePedidoIdentifier == null || detallePedidoCollectionIdentifiers.includes(detallePedidoIdentifier)) {
          return false;
        }
        detallePedidoCollectionIdentifiers.push(detallePedidoIdentifier);
        return true;
      });
      return [...detallePedidosToAdd, ...detallePedidoCollection];
    }
    return detallePedidoCollection;
  }
}
